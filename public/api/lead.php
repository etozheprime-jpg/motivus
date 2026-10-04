<?php
/**
 * MOTIVUS – užklausų priėmimas.
 *
 * Priima formos duomenis (multipart/form-data), išsiunčia juos el. paštu
 * su pridėtomis nuotraukomis ir papildomai įrašo į CSV žurnalą.
 *
 * Veikia bet kuriame PHP hostinge (Hostinger, cPanel ir pan.) – nereikia
 * jokių papildomų bibliotekų ar išorinių paslaugų.
 *
 * NUSTATYMAI – pakeiskite tik šias eilutes:
 */
$TO         = 'info@motivus.lt';          // kam siųsti užklausas
$FROM       = 'noreply@motivus.lt';       // turi būti šio domeno adresas
$SITE       = 'motivus.lt';
$LOG_DIR    = __DIR__ . '/../../motivus-leads';  // už public_html ribų
$MAX_PHOTOS = 8;
$MAX_BYTES  = 10 * 1024 * 1024;           // vienai nuotraukai

// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

function fail($code, $msg) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Netinkamas užklausos metodas.');
}

/** Paprasta apsauga nuo šlamšto: ne daugiau kaip 5 užklausos per 10 min. iš to paties IP. */
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$throttle = sys_get_temp_dir() . '/motivus_' . md5($ip);
$hits = is_file($throttle) ? array_filter(
    array_map('intval', explode(',', (string) file_get_contents($throttle))),
    fn($t) => $t > time() - 600
) : [];
if (count($hits) >= 5) {
    fail(429, 'Per daug užklausų. Pabandykite po kelių minučių arba skambinkite.');
}
$hits[] = time();
@file_put_contents($throttle, implode(',', $hits));

/** Laukai. Pavadinimai sutampa su src/lib/submitLead.ts. */
$fields = [
    'makeModel'    => 'Markė ir modelis',
    'year'         => 'Metai',
    'fuel'         => 'Kuro tipas',
    'comment'      => 'Komentaras',
    'desiredPrice' => 'Norima kaina',
    'city'         => 'Miestas',
    'phone'        => 'Telefono nr.',
];
$required = ['makeModel', 'comment', 'city', 'phone'];

$data = [];
foreach ($fields as $key => $label) {
    $v = trim((string) ($_POST[$key] ?? ''));
    if (mb_strlen($v) > 2000) {
        $v = mb_substr($v, 0, 2000);
    }
    // Neleidžiame į antraštes patekti naujų eilučių.
    $data[$key] = str_replace(["\r", "\n"], ' ', $v);
}
$data['comment'] = trim((string) ($_POST['comment'] ?? ''));

foreach ($required as $key) {
    if ($data[$key] === '') {
        fail(422, 'Neužpildyti privalomi laukai.');
    }
}
if (!preg_match('/^[0-9+()\s-]{6,20}$/', $data['phone'])) {
    fail(422, 'Netinkamas telefono numeris.');
}

/** Nuotraukos. Priimame tik realius paveikslėlius. */
$allowed = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp'];
if (defined('IMAGETYPE_AVIF')) {
    $allowed[IMAGETYPE_AVIF] = 'avif';
}
$photos = [];
for ($i = 1; $i <= $MAX_PHOTOS; $i++) {
    $f = $_FILES["photo_$i"] ?? null;
    if (!$f || ($f['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        continue;
    }
    if ($f['size'] > $MAX_BYTES || !is_uploaded_file($f['tmp_name'])) {
        continue;
    }
    $info = @getimagesize($f['tmp_name']);
    $type = $info[2] ?? null;
    if ($type === null || !isset($allowed[$type])) {
        continue;
    }
    $photos[] = [
        'name' => 'nuotrauka-' . (count($photos) + 1) . '.' . $allowed[$type],
        'mime' => image_type_to_mime_type($type),
        'body' => (string) file_get_contents($f['tmp_name']),
    ];
}

/** CSV žurnalas – atsarginė kopija, jei laiškas kada nors nepasiektų. */
if (!is_dir($LOG_DIR)) {
    @mkdir($LOG_DIR, 0750, true);
}
if (is_dir($LOG_DIR) && is_writable($LOG_DIR)) {
    $file = $LOG_DIR . '/leads-' . date('Y-m') . '.csv';
    $new = !is_file($file);
    if ($fh = @fopen($file, 'a')) {
        if ($new) {
            fputcsv($fh, array_merge(['Data'], array_values($fields), ['Nuotraukos', 'IP']));
        }
        fputcsv($fh, array_merge([date('Y-m-d H:i:s')], array_values($data), [count($photos), $ip]));
        fclose($fh);
    }
}

/** Laiškas. */
$lines = ["Nauja užklausa iš $SITE", str_repeat('-', 40), ''];
foreach ($fields as $key => $label) {
    $lines[] = $label . ': ' . ($data[$key] !== '' ? $data[$key] : '—');
}
$lines[] = '';
$lines[] = 'Nuotraukų: ' . count($photos);
$lines[] = 'Gauta: ' . date('Y-m-d H:i:s');
$text = implode("\n", $lines);

$boundary = '=_' . bin2hex(random_bytes(12));
$headers = implode("\r\n", [
    'From: MOTIVUS <' . $FROM . '>',
    'Reply-To: ' . $FROM,
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
]);

$body  = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $text . "\r\n";

foreach ($photos as $p) {
    $body .= "--$boundary\r\n";
    $body .= 'Content-Type: ' . $p['mime'] . '; name="' . $p['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= 'Content-Disposition: attachment; filename="' . $p['name'] . "\"\r\n\r\n";
    $body .= chunk_split(base64_encode($p['body'])) . "\r\n";
}
$body .= "--$boundary--";

$subject = '=?UTF-8?B?' . base64_encode('Užklausa: ' . $data['makeModel'] . ' — ' . $data['phone']) . '?=';
$sent = @mail($TO, $subject, $body, $headers);

if (!$sent) {
    // Duomenys jau įrašyti į CSV, todėl užklausa neprarasta –
    // bet naudotojui pranešame sąžiningai.
    fail(500, 'Užklausos išsiųsti nepavyko. Paskambinkite +370 632 22228.');
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);

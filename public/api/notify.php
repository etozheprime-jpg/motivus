<?php
/**
 * MOTIVUS – užklausos pranešimai.
 *
 * Kai atkeliauja užklausa, ją gauna visi įjungti kanalai:
 *   1) laiškas su mygtukais „Skambinti“, WhatsApp, Viber, SMS, Telegram;
 *   2) Telegram žinutė su tais pačiais mygtukais ir nuotraukomis;
 *   3) webhook (pvz. Go High Level), jei nurodytas adresas.
 *
 * Kiekvienas kanalas izoliuotas: vieno nesėkmė netrukdo kitiems, o lead.php
 * šį failą įkelia try/catch bloke – klaida čia niekada nesustabdo užklausos.
 *
 * Slaptus raktus (Telegram tokeną ir pan.) laikykite ne šiame faile, o
 * ../../motivus-config.php (už public_html ribų) – žr. config.example.php.
 */

/** Telefonas -> tik skaitmenys tarptautiniu formatu (Lietuva pagal nutylėjimą). */
function mv_phone($raw)
{
    $d = preg_replace('/\D+/', '', (string) $raw);
    if (strpos($d, '00') === 0) {
        $d = substr($d, 2);
    }
    if (strpos($d, '370') === 0) {
        return $d;
    }
    if (strlen($d) === 9 && $d[0] === '8') {      // 8 6xx xxxxx
        return '370' . substr($d, 1);
    }
    if (strlen($d) === 8 && $d[0] === '6') {      // 6xx xxxxx
        return '370' . $d;
    }
    return $d;
}

/** Nuorodos, kuriomis galima susisiekti su klientu. */
function mv_links($digits, $makeModel)
{
    $hello = 'Laba diena! Čia MOTIVUS. Gavome Jūsų užklausą dėl ' . $makeModel
        . '. Pasiūlymą paruošime greitai – ar patogu pasikalbėti?';
    return [
        'tel'   => 'tel:+' . $digits,
        'wa'    => 'https://wa.me/' . $digits . '?text=' . rawurlencode($hello),
        'viber' => 'viber://chat?number=%2B' . $digits,
        'sms'   => 'sms:+' . $digits,
        'tg'    => 'https://t.me/+' . $digits,
    ];
}

function mv_e($s)
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Laiško HTML (lentelės ir inline stiliai – taip rodo visi pašto klientai). */
function mv_email_html($cfg, $data, $fields, $links, $photoCount)
{
    $btn = function ($href, $label, $primary) {
        $style = $primary
            ? 'background:#aeff3f;color:#0a0b0d;border:2px solid #aeff3f;'
            : 'background:#ffffff;color:#0a0b0d;border:2px solid #0a0b0d;';
        return '<a href="' . mv_e($href) . '" style="display:inline-block;margin:0 8px 8px 0;padding:11px 18px;'
            . 'border-radius:99px;font:700 14px Arial,Helvetica,sans-serif;text-decoration:none;' . $style . '">'
            . mv_e($label) . '</a>';
    };

    $rows = '';
    foreach ($fields as $key => $label) {
        $val = $data[$key] !== '' ? $data[$key] : '—';
        $rows .= '<tr><td style="padding:9px 0;border-bottom:1px solid #e4e4df;width:38%;font:700 11px Arial,sans-serif;'
            . 'letter-spacing:.08em;text-transform:uppercase;color:#6b6f73;vertical-align:top">' . mv_e($label) . '</td>'
            . '<td style="padding:9px 0;border-bottom:1px solid #e4e4df;font:400 15px/1.45 Arial,sans-serif;color:#0a0b0d">'
            . nl2br(mv_e($val)) . '</td></tr>';
    }

    return '<!doctype html><html><body style="margin:0;background:#f1f1ee;padding:24px 12px">'
        . '<table role="presentation" align="center" width="100%" style="max-width:600px;border-collapse:collapse;background:#ffffff;border-radius:14px;overflow:hidden">'
        . '<tr><td style="background:#0e0f12;padding:20px 26px">'
        . '<span style="font:900 20px Arial,sans-serif;color:#aeff3f;letter-spacing:-.01em">MOTIVUS</span>'
        . '<span style="font:700 13px Arial,sans-serif;color:#a9aeb4;margin-left:12px">Nauja užklausa</span></td></tr>'
        . '<tr><td style="padding:22px 26px 6px">'
        . '<table role="presentation" width="100%" style="border-collapse:collapse">' . $rows . '</table></td></tr>'
        . '<tr><td style="padding:18px 26px 4px">'
        . '<div style="font:700 11px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6b6f73;margin-bottom:10px">Susisiekti su klientu</div>'
        . $btn($links['tel'], 'Skambinti', true)
        . $btn($links['wa'], 'WhatsApp', false)
        . $btn($links['viber'], 'Viber', false)
        . $btn($links['sms'], 'SMS', false)
        . $btn($links['tg'], 'Telegram', false)
        . '</td></tr>'
        . '<tr><td style="padding:10px 26px 24px;font:400 12px Arial,sans-serif;color:#6b6f73">'
        . 'Nuotraukų: ' . (int) $photoCount . ' &nbsp;·&nbsp; Gauta: ' . mv_e(date('Y-m-d H:i:s'))
        . ' &nbsp;·&nbsp; ' . mv_e($cfg['site']) . '</td></tr>'
        . '</table></body></html>';
}

/** Paprasto teksto variantas tiems, kurie HTML nerodo. */
function mv_email_text($cfg, $data, $fields, $links, $photoCount)
{
    $lines = ['Nauja užklausa iš ' . $cfg['site'], str_repeat('-', 40), ''];
    foreach ($fields as $key => $label) {
        $lines[] = $label . ': ' . ($data[$key] !== '' ? $data[$key] : '—');
    }
    $lines[] = '';
    $lines[] = 'Skambinti: ' . $links['tel'];
    $lines[] = 'WhatsApp: ' . $links['wa'];
    $lines[] = 'Viber: ' . $links['viber'];
    $lines[] = '';
    $lines[] = 'Nuotraukų: ' . (int) $photoCount;
    $lines[] = 'Gauta: ' . date('Y-m-d H:i:s');
    return implode("\n", $lines);
}

/** Laiškas: multipart/mixed ( multipart/alternative ( text, html ), priedai ). */
function mv_send_email($cfg, $data, $photos, $fields, $links)
{
    $text = mv_email_text($cfg, $data, $fields, $links, count($photos));
    $html = mv_email_html($cfg, $data, $fields, $links, count($photos));

    $outer = '=_o' . bin2hex(random_bytes(10));
    $inner = '=_i' . bin2hex(random_bytes(10));

    $headers = implode("\r\n", [
        'From: MOTIVUS <' . $cfg['from'] . '>',
        'Reply-To: ' . $cfg['from'],
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $outer . '"',
    ]);

    $body  = "--$outer\r\n";
    $body .= 'Content-Type: multipart/alternative; boundary="' . $inner . "\"\r\n\r\n";
    $body .= "--$inner\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($text)) . "\r\n";
    $body .= "--$inner\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($html)) . "\r\n";
    $body .= "--$inner--\r\n";

    foreach ($photos as $p) {
        $body .= "--$outer\r\n";
        $body .= 'Content-Type: ' . $p['mime'] . '; name="' . $p['name'] . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= 'Content-Disposition: attachment; filename="' . $p['name'] . "\"\r\n\r\n";
        $body .= chunk_split(base64_encode($p['body'])) . "\r\n";
    }
    $body .= "--$outer--";

    $subject = '=?UTF-8?B?' . base64_encode('Užklausa: ' . $data['makeModel'] . ' — ' . $data['phone']) . '?=';
    return (bool) @mail($cfg['to'], $subject, $body, $headers);
}

/** Vienas Telegram Bot API iškvietimas. */
function mv_tg($token, $method, array $post)
{
    if (!function_exists('curl_init')) {
        return false;
    }
    $ch = curl_init('https://api.telegram.org/bot' . $token . '/' . $method);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $post,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 12,
        CURLOPT_CONNECTTIMEOUT => 5,
    ]);
    $res  = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($res === false || $code !== 200) {
        @error_log('[MOTIVUS] Telegram ' . $method . ' HTTP ' . $code);
        return false;
    }
    $j = json_decode($res, true);
    return is_array($j) && !empty($j['ok']);
}

/** Nuotraukos į Telegram: viena arba albumu; jei „photo“ nepriima – kaip dokumentai. */
function mv_tg_photos($token, $chat, $photos, $asDocument)
{
    $photos = array_slice($photos, 0, 10);
    if (!$photos) {
        return true;
    }
    $tmp  = [];
    $post = ['chat_id' => $chat];
    $media = [];
    foreach ($photos as $i => $p) {
        $path = tempnam(sys_get_temp_dir(), 'mv');
        file_put_contents($path, $p['body']);
        $tmp[] = $path;
        $key = 'f' . $i;
        $post[$key] = new CURLFile($path, $p['mime'], $p['name']);
        $media[] = ['type' => $asDocument ? 'document' : 'photo', 'media' => 'attach://' . $key];
    }

    if (count($photos) === 1) {
        $field = $asDocument ? 'document' : 'photo';
        $post[$field] = $post['f0'];
        unset($post['f0']);
        $ok = mv_tg($token, $asDocument ? 'sendDocument' : 'sendPhoto', $post);
    } else {
        $post['media'] = json_encode($media);
        $ok = mv_tg($token, 'sendMediaGroup', $post);
    }
    foreach ($tmp as $t) {
        @unlink($t);
    }
    return $ok;
}

function mv_send_telegram($cfg, $data, $photos, $fields, $links)
{
    $token = trim((string) $cfg['tg_token']);
    $chats = array_filter(array_map('trim', explode(',', (string) $cfg['tg_chat'])));
    if ($token === '' || !$chats) {
        return false;
    }

    $lines = ['<b>Nauja užklausa – ' . mv_e($cfg['site']) . '</b>', ''];
    foreach ($fields as $key => $label) {
        $lines[] = '<b>' . mv_e($label) . ':</b> ' . mv_e($data[$key] !== '' ? $data[$key] : '—');
    }
    $lines[] = '';
    $lines[] = 'Nuotraukų: ' . count($photos);

    $keyboard = json_encode(['inline_keyboard' => [[
        ['text' => 'WhatsApp', 'url' => $links['wa']],
        ['text' => 'Telegram', 'url' => $links['tg']],
    ]]]);

    $anyOk = false;
    foreach ($chats as $chat) {
        $ok = mv_tg($token, 'sendMessage', [
            'chat_id'                  => $chat,
            'text'                     => implode("\n", $lines),
            'parse_mode'               => 'HTML',
            'disable_web_page_preview' => 'true',
            'reply_markup'             => $keyboard,
        ]);
        if ($ok) {
            $anyOk = true;
            if ($photos && !mv_tg_photos($token, $chat, $photos, false)) {
                mv_tg_photos($token, $chat, $photos, true);   // atsarginis variantas
            }
        }
    }
    return $anyOk;
}

/** Webhook (Go High Level ir pan.): JSON be failų – nuotraukos eina laišku ir Telegram. */
function mv_send_webhook($cfg, $data, $photos, $digits)
{
    $url = trim((string) $cfg['webhook_url']);
    if ($url === '' || !function_exists('curl_init')) {
        return false;
    }
    $payload = array_merge($data, [
        'phoneE164'   => '+' . $digits,
        'photoCount'  => count($photos),
        'source'      => $cfg['site'],
        'submittedAt' => date('c'),
    ]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
    ]);
    curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $code >= 200 && $code < 300;
}

/**
 * Pagrindinė funkcija. Grąžina, kurie kanalai suveikė.
 * @return array{email:bool,telegram:bool,webhook:bool}
 */
function motivus_notify($cfg, $data, $photos, $fields)
{
    $digits = mv_phone($data['phone']);
    $links  = mv_links($digits, $data['makeModel']);
    $out    = ['email' => false, 'telegram' => false, 'webhook' => false];

    try { $out['email'] = mv_send_email($cfg, $data, $photos, $fields, $links); }
    catch (Throwable $e) { @error_log('[MOTIVUS] email: ' . $e->getMessage()); }

    try { $out['telegram'] = mv_send_telegram($cfg, $data, $photos, $fields, $links); }
    catch (Throwable $e) { @error_log('[MOTIVUS] telegram: ' . $e->getMessage()); }

    try { $out['webhook'] = mv_send_webhook($cfg, $data, $photos, $digits); }
    catch (Throwable $e) { @error_log('[MOTIVUS] webhook: ' . $e->getMessage()); }

    return $out;
}

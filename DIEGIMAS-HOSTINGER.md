# MOTIVUS – naujos svetainės įkėlimas į Hostinger

Šis dokumentas skirtas domeno ir hostingo savininkui. Visa, ko reikia, yra
faile **`motivus-hostinger.zip`**. Trukmė – apie 20–30 minučių.

Svetainė yra statinė (HTML/CSS/JS) + vienas PHP failas užklausų priėmimui.
WordPress nebereikalingas.

---

## 0. Prieš pradedant – atsarginė kopija

> Šis žingsnis **privalomas**. Įkeliant naują svetainę senasis WordPress bus
> ištrintas, ir be kopijos jo nebeatkursite.

1. hPanel → **Files** → **Backups** → *Create new backup* (failų ir duomenų bazės).
2. Papildomai: hPanel → **File Manager** → pažymėkite `public_html` →
   *Download* → išsaugokite ZIP savo kompiuteryje.

---

## 1. Rekomenduojama: pirma išbandykite subdomene

Jei nenorite iškart keisti veikiančios svetainės:

1. hPanel → **Domains** → **Subdomains** → sukurkite `naujas.motivus.lt`.
2. Įkelkite failus į jo katalogą (2 žingsnis, tik vietoje `public_html`
   naudokite subdomeno katalogą).
3. Patikrinkite viską. Kai būsite patenkinti – pakartokite į `public_html`.

> Svarbu: svetainė veikia tik katalogo **šaknyje** (domeno arba subdomeno).
> Į paprastą aplanką, pvz. `motivus.lt/naujas/`, ji neveiks.

---

## 2. Failų įkėlimas

1. hPanel → **Files** → **File Manager** → atidarykite `public_html`.
2. Pažymėkite **visus** esamus failus ir aplankus → *Delete*.
   (Jei norite, prieš tai perkelkite juos į aplanką `senas-wp` – vėliau ištrinsite.)
3. *Upload* → pasirinkite **`motivus-hostinger.zip`**.
4. Dešiniu pelės klavišu ant įkelto ZIP → **Extract** → į tą patį `public_html`.
5. Ištrinkite patį ZIP failą.

Patikrinkite, kad `public_html` šaknyje matote: `index.html`, `.htaccess`,
`assets/`, `api/`, `images/`, `hero.mp4`, `privatumo-politika/`,
`slapuku-politika/`, `paslaugu-teikimo-salygos/`, `404.html`, `robots.txt`,
`sitemap.xml`.

> Jei `.htaccess` nematote – File Manager meniu įjunkite *Show hidden files*.
> Šis failas būtinas: be jo neveiks peradresavimai ir 404 puslapis.

---

## 3. PHP versija

hPanel → **Advanced** → **PHP Configuration** → turi būti **PHP 8.0 arba naujesnė**.

---

## 4. Užklausų forma – el. pašto adresai

Forma siunčia užklausas el. paštu. Faile **`api/lead.php`** (File Manager →
*Edit*) yra dvi eilutės viršuje:

```php
$TO   = 'info@motivus.lt';      // kam ateina užklausos
$FROM = 'noreply@motivus.lt';   // nuo ko siunčiama
```

- `$TO` – pakeiskite, jei užklausas norite gauti kitu adresu.
- `$FROM` – **turi būti realiai egzistuojanti šio domeno pašto dėžutė**,
  kitaip laiškai pateks į šlamštą arba visai nebus pristatyti.
  Sukurkite ją: hPanel → **Emails** → *Create email account* → `noreply`.
  Arba įrašykite jau egzistuojantį adresą, pvz. `info@motivus.lt`.

Užklausos papildomai įrašomos į CSV failą aplanke `motivus-leads/`
(vienu lygiu aukščiau už `public_html`, iš interneto nepasiekiamas) –
tai atsarginė kopija, jei laiškas kada nors nepasiektų.

---

## 5. Patikrinimas

Atidarykite naršyklėje ir patikrinkite kiekvieną punktą:

- [ ] `https://motivus.lt` – atsidaro, vaizdo įrašas groja
- [ ] `http://motivus.lt` – automatiškai permeta į `https://`
- [ ] `https://www.motivus.lt` – permeta į `https://motivus.lt`
- [ ] `https://motivus.lt/privatumo-politika/` – atsidaro
- [ ] `https://motivus.lt/slapuku-politika/` – atsidaro
- [ ] `https://motivus.lt/paslaugu-teikimo-salygos/` – atsidaro
- [ ] `https://motivus.lt/duk/` – permeta į pagrindinį puslapį (senas adresas)
- [ ] `https://motivus.lt/neegzistuoja` – rodo MOTIVUS 404 puslapį
- [ ] **Slapukų juosta** pasirodo pirmą kartą apsilankius; paspaudus „Tik
      būtinieji“ arba „Sutinku su visais“ ji dingsta ir daugiau nerodoma
- [ ] Poraštėje „Slapukų nustatymai“ atidaro juostą iš naujo
- [ ] **Forma**: užpildykite testinę užklausą ir patikrinkite, ar laiškas
      atėjo į `$TO` dėžutę (patikrinkite ir šlamšto aplanką)
- [ ] Forma su 1–2 nuotraukomis – nuotraukos turi ateiti laiške kaip priedai

---

## 6. SSL

Jei sertifikatas jau veikė senajai svetainei, jis veikia ir toliau – nieko
daryti nereikia. Jei adreso juostoje rodoma „Not secure“:

hPanel → **Security** → **SSL** → pasirinkite `motivus.lt` → *Install SSL*
(nemokamas Let's Encrypt). Aktyvuojasi per kelias minutes.

---

## 7. Po paleidimo

1. **Google Search Console** (https://search.google.com/search-console):
   pateikite `https://motivus.lt/sitemap.xml`.
2. Patikrinkite DUK mikroduomenis: https://search.google.com/test/rich-results
3. Greičio patikra: https://pagespeed.web.dev

---

## 8. Ką daryti su senuoju WordPress

Kai nauja svetainė veikia bent savaitę ir užklausos ateina:

- hPanel → **Databases** → senąją WordPress duomenų bazę galima ištrinti.
- Atsarginę kopiją (0 žingsnis) pasilikite bent kelis mėnesius.

---

## Pastabos

- Puslapio turinį galima redaguoti tik per projekto kodą (`src/lib/content.ts`,
  `src/lib/legal.ts`) ir perkompiliuoti. Administracinės skilties, kaip
  WordPress, nėra – tai statinė svetainė, todėl ji greita ir saugi.
- Kiekvieną kartą atnaujinus svetainę reikia įkelti naują `dist` turinį
  tuo pačiu būdu (2 žingsnis).

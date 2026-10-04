# MOTIVUS — perdavimas užsakovui

Dokumentas skirtas tam, kas perims svetainę: ką reikia padaryti prieš paleidžiant
ir kaip viską prižiūrėti.

---

## 1. Kas yra paruošta

| Dalis | Būsena |
|---|---|
| Vienas puslapis (hero, privalumai, procesas, geografija, atsiliepimai, DUK, kontaktai) | ✅ |
| Užklausos forma modaliniame lange, 7 laukai + nuotraukos | ✅ frontend veikia |
| Vaizdo įrašo fonas (H.264, 720×1280, 8,5 MB) + pirmo kadro nuotrauka | ✅ |
| Telefonas, WhatsApp, Viber, Telegram | ✅ |
| Mobilioji ir planšetės versijos | ✅ |
| Title, meta description, Open Graph, favicon, robots.txt, sitemap.xml | ✅ |
| Struktūriniai duomenys: AutomotiveBusiness + LocalBusiness + FAQPage | ✅ |
| 404 puslapis | ✅ |
| Peržiūros adreso apsauga nuo indeksavimo | ✅ |

---

## 2. Ką BŪTINA padaryti prieš paleidžiant

### 2.1. Prijungti užklausų gavimą ⚠️ svarbiausia

Dabar forma veikia **demo režimu** — ji atlieka visą patikrą, parodo sėkmės
pranešimą, bet **užklausa niekur neišsiunčiama**.

Sukurkite `.env` failą projekto šaknyje:

```
VITE_LEAD_ENDPOINT=https://jusu-endpointas
VITE_LEAD_METHOD=POST
```

Tinka bet kas, kas priima `multipart/form-data`: savas backend, Make / Zapier
webhook, Google Apps Script į Sheets, CRM. Laukai: `source`, `submittedAt`,
`makeModel`, `year`, `fuel`, `comment`, `desiredPrice`, `city`, `phone`,
`photo_1`…`photo_8`.

Po pakeitimo — perkompiliuoti (`npm run build`).

### 2.2. Teisiniai puslapiai

Trys teisiniai puslapiai **sukurti** ir veikia:

- `/privatumo-politika/`
- `/slapuku-politika/`
- `/paslaugu-teikimo-salygos/`

Tekstai perkelti iš senosios motivus.lt svetainės nekeičiant turinio prasmės.
Juos redaguoti galima vienoje vietoje — `src/lib/legal.ts` (be kodo žinių).

**Prieš publikavimą būtina patikrinti su užsakovu:**

1. Skyriuje „Taikytina teisė ir ginčų sprendimas“ senojoje svetainėje sakinys
   nutrūksta ties žodžiais „pagal mūs“. Čia jis užbaigtas neutraliai
   („...Lietuvos Respublikos teismuose teisės aktų nustatyta tvarka“) — formuluotę
   turi patvirtinti įmonė arba teisininkas.
2. Privatumo politikoje senojoje svetainėje įvardyta konkreti užklausų platforma.
   Kadangi naujoje svetainėje formos integracija dar nenustatyta, tekste palikta
   bendresnė formuluotė. Prijungus realų `VITE_LEAD_ENDPOINT`, platformą reikia
   įvardyti tiksliai.
3. Privatumo ir slapukų politikose minima slapukų juosta („cookie banner“).
   Naujoje svetainėje slapukų juostos kol kas **nėra** — ją reikia arba įdiegti,
   arba atitinkamai pakoreguoti tekstą.

Puslapiai jau įrašyti į `public/sitemap.xml` ir turi savo `canonical`,
Open Graph bei `schema.org` (WebPage + BreadcrumbList) žymas.

### 2.3. Slapukų sutikimas

Jei bus pridėta Google Analytics / Meta Pixel, pagal GDPR reikės slapukų
sutikimo juostos. Dabar svetainė **nenaudoja jokių analitikos ar sekimo
slapukų**, todėl juostos nereikia.

### 2.4. Socialinių tinklų nuorodos

`src/lib/content.ts` → `BUSINESS.social` — dabar ten bendri Facebook ir
Instagram adresai. Įrašykite tikrus.

### 2.5. Telegram

`MESSENGERS` nuoroda sudaryta iš telefono numerio. Jei įmonė turi `@vardą`,
pakeiskite į `https://t.me/vardas` — tokia nuoroda patikimesnė.

---

## 3. Domenas ir SSL

Svetainė yra statiniai failai (`dist/`) — veikia bet kur.

### Variantas A — GitHub Pages (dabar naudojamas)

1. Repozitorijoje: **Settings → Pages → Custom domain** → `motivus.lt`.
2. Domeno valdyme (ten, kur pirktas domenas) nurodyti:

   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  etozheprime-jpg.github.io.
   ```

3. Palaukti, kol DNS pasikeis (nuo 10 min iki kelių valandų).
4. Settings → Pages → pažymėti **Enforce HTTPS**.

**SSL nereikia pirkti.** GitHub pats išduoda Let's Encrypt sertifikatą ir
automatiškai jį atnaujina. Mygtukas „Enforce HTTPS“ tampa aktyvus, kai
sertifikatas išduotas.

### Variantas B — įprastas hostingas (cPanel, Hostinger ir pan.)

1. `npm run build`
2. Viską iš `dist/` įkelti į `public_html/`
3. SSL — hostingo valdymo skydelyje įjungti nemokamą Let's Encrypt
   („SSL/TLS“ → „Let's Encrypt“), tada įjungti nukreipimą iš HTTP į HTTPS.

Jei renkatės šį variantą, `vite.config.ts` pakeiskite `base: "./"` į
`base: "/"` ir perkompiliuokite.

### Variantas C — Netlify / Vercel / Cloudflare Pages

Prijungiama repozitorija, build komanda `npm run build`, katalogas `dist`.
SSL — automatinis.

---

## 4. Po paleidimo

1. **Google Search Console** — pridėti `motivus.lt`, pateikti
   `https://motivus.lt/sitemap.xml`.
2. **Google Business Profile** — įsitikinti, kad adresas, telefonas ir darbo
   laikas sutampa su svetaine (tai tiesiogiai veikia vietinę paiešką).
3. Patikrinti struktūrinius duomenis:
   <https://search.google.com/test/rich-results>
4. Patikrinti greitį: <https://pagespeed.web.dev/>

---

## 5. Kaip prižiūrėti

Beveik visas turinys — viename faile `src/lib/content.ts`:
kontaktai, meniu, privalumai, proceso žingsniai, miestai, atsiliepimai, DUK.

> Keičiant DUK klausimus, tuos pačius pakeitimus reikia padaryti ir
> `index.html` esančiame `FAQPage` JSON-LD bloke — kitaip struktūriniai
> duomenys nebesutaps su matomu tekstu.

```bash
npm install     # vieną kartą
npm run dev     # peržiūra http://localhost:5173
npm run build   # produkcijai -> dist/
```

---

## 6. Žinomi apribojimai

- **Vaizdo įrašas vertikalus (9:16).** Plačiame ekrane jis apkarpomas. Jei
  atsiras horizontali versija — pakeiskite `public/hero.mp4` (būtinai H.264).
- Įrašas sveria 8,5 MB. Taupymo režimu ar lėtu ryšiu jis neatsisiunčiamas —
  rodomas pirmas kadras, o paleisti galima mygtuku.
- Nuotraukų vietos `public/images/` kol kas tuščios (rodomi brėžinio stiliaus
  pakaitalai) — žr. `public/images/README.md`.

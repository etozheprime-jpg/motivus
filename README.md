# MOTIVUS — automobilių supirkimas

Visiškai perdarytas motivus.lt frontend'as. Vienas puslapis, kurio vienintelis
tikslas — užklausa automobilio įvertinimui.

**Stack:** React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion · Lucide

**Firminis stilius:** Montserrat (antraštės) + Nunito (tekstas ir smulkios žymos) —
abu apvalūs, be „rašomosios mašinėlės“ monospace. Akcento spalva `#AEFF3F` paimta
tiesiai iš MOTIVUS logotipo.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Struktūra

```
src/
  components/      Sekcijos (Hero, Valuation, Process, …)
  lib/
    content.ts     VISAS tekstas, kontaktai, atsiliepimai, DUK — redaguoti čia
    formData.ts    Metai, kuro tipai, miestų sąrašas
    submitLead.ts  Vienintelis užklausų išsiuntimo taškas
    useReveal.ts   Scroll animacijos (vienas IntersectionObserver)
public/
  hero.mp4         Pirmo ekrano fono vaizdo įrašas
  images/          Nuotraukų vietos (žr. images/README.md)
  robots.txt  sitemap.xml  favicon.svg
```

## Pirmo ekrano vaizdo įrašas

Fonas — `public/hero.mp4`: **H.264 + AAC, 720×1280, 30 fps, ~8,5 MB**. Kartojasi be
galo, paleidžiamas automatiškai **be garso** (kitaip naršyklės autoplay blokuoja),
o garsą lankytojas įjungia mygtuku kairiajame apatiniame kampe.

> **Svarbu.** Pradinis atsiųstas failas buvo užkoduotas **VP9 kodeku MP4 konteineryje**
> (`hero-originalas-vp9.mp4`, paliktas projekto šaknyje). Tokio įrašo **Safari –
> nei iPhone, nei iPad, nei Mac – apskritai negroja**, todėl jis buvo perkoduotas į
> H.264. Jei kada keisite vaizdo įrašą, būtinai įkelkite H.264 versiją:
>
> ```
> ffmpeg -i naujas.mp4 -vf scale=-2:1280 -c:v libx264 -crf 24 -preset slow \
>        -profile:v high -pix_fmt yuv420p -movflags +faststart \
>        -c:a aac -b:a 96k public/hero.mp4
> ```
>
> Patikrinti kodeką: `ffprobe -v error -select_streams v -show_entries stream=codec_name hero.mp4`
> — turi rodyti `h264`, ne `vp9`.

## Užklausų pajungimas

Forma veikia iš karto. Be `VITE_LEAD_ENDPOINT` ji veikia **demo režimu**:
imituoja siuntimą, parodo loading ir success būsenas, o duomenis atspausdina
į konsolę (tik dev).

Realiam siuntimui nukopijuokite `.env.example` į `.env`:

```bash
VITE_LEAD_ENDPOINT=https://jusu-endpointas
VITE_LEAD_METHOD=POST
```

Duomenys siunčiami kaip `multipart/form-data`, todėl nuotraukos keliauja kartu —
atskiro upload API nereikia. Laukai: `source`, `submittedAt`, `makeModel`, `year`,
`fuel`, `comment`, `desiredPrice`, `city`, `phone`, `photo_1…photo_8`.

Tinka tiesiogiai: savas backend, Make / Zapier webhook, Google Apps Script
(Sheets), CRM endpoint'as, Telegram bot'o tarpinis servisas. Jei reikia kitokio
formato (JSON, atskiri žingsniai), keisti tereikia `src/lib/submitLead.ts`.

## Ką dar reikia padaryti prieš paleidžiant

- Įkelti realias nuotraukas į `public/images/` (žr. ten esantį README).
- Pakeisti Facebook / Instagram nuorodas `src/lib/content.ts` → `BUSINESS.social`.
- Sukurti teisinių dokumentų puslapius (nuorodos footer'yje jau paruoštos).
- Nustatyti `VITE_LEAD_ENDPOINT`.

## Pirmas ekranas

Hero užima lygiai vieną ekraną (patikrinta ties 1024 / 1280 / 1440): vaizdo įrašas
fone, antraštė centre, o ekrano apačioje — „Pildyti užklausą“ ir „Skambinti dabar“,
po jais WhatsApp / Viber / Telegram ir rodyklė į tolesnes sekcijas.

Užklausos forma pirmame ekrane nerodoma — ji atsidaro modaliniame lange paspaudus
bet kurį „Pildyti užklausą“ / „Gauti pasiūlymą“ mygtuką. Mobiliajame langas
pakyla iš apačios kaip programėlės lakštas.

## Sekcijos

Pagrindinis → Kodėl MOTIVUS → Kaip veikia → Automobilis nevažiuoja →
Geografija → Atsiliepimai → DUK → SEO tekstas → Kvietimas → Kontaktai.

Meniu rodo penkis punktus ta pačia tvarka (forma meniu neminima).

## Kontaktų kanalai

Telefonas, WhatsApp, Viber ir Telegram yra `src/lib/content.ts` → `BUSINESS` ir
`MESSENGERS`. Numeris vienoje vietoje (`MSG_NUMBER`).

> Telegram nuoroda sudaryta iš telefono numerio. Jei įmonė turi `@vardą`,
> pakeiskite į `https://t.me/vardas` — tokia nuoroda patikimesnė.

## Užklausos forma

Modalinis langas, septyni laukai (be žingsnių):

1. Markė ir modelis
2. Metai
3. Kuro tipas
4. Komentaras — privalomas, čia klientas aprašo būklę, defektus, TA ir ridą
5. Norima kaina — su pastaba, kad ji gali skirtis nuo MOTIVUS pasiūlytos
6. Miestas
7. Telefono numeris

Prie komentaro yra neprivalomas nuotraukų priedas (iki 8 vnt., po 10 MB).

Langas užsidaro Esc klavišu, paspaudus šalia arba kryžiuką; fokusas lieka viduje,
puslapio slinkimas užrakinamas. Esc, kai atidarytas miesto pasiūlymų sąrašas,
uždaro tik tą sąrašą.

## SEO

`index.html` turi title, meta description, Open Graph, canonical, favicon ir
JSON-LD: `AutomotiveBusiness` + `LocalBusiness` (adresas, darbo laikas,
telefonas) bei `FAQPage`. DUK schema ir matomas DUK turinys sutampa — keičiant
klausimus `src/lib/content.ts`, atnaujinkite ir `index.html` JSON-LD.

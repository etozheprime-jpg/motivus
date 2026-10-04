/**
 * Teisiniai dokumentai.
 * Tekstai perimti iš esamos motivus.lt svetainės (atnaujinta 2025-09-13)
 * ir perkelti nekeičiant turinio prasmės.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "contact"; lines: string[] };

export type LegalSection = { title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

const COMPANY = [
  "MB Vairas ir pedalai",
  "Įmonės kodas: 305636667",
  "Adresas: Kareivių g. 18-3, LT-09117 Vilnius",
  "El. paštas: info@motivus.lt",
  "Tel.: +370 632 22228",
];

export const PRIVACY: LegalDoc = {
  slug: "privatumo-politika",
  title: "Privatumo politika",
  updated: "2025 m. rugsėjo 13 d.",
  description:
    "Kaip MB Vairas ir pedalai (MOTIVUS) renka, naudoja ir saugo asmens duomenis pagal BDAR (GDPR).",
  intro:
    "Ši privatumo politika paaiškina, kaip MB Vairas ir pedalai (toliau – „Mes“) renka, naudoja ir saugo asmens duomenis, kai lankotės mūsų svetainėje ar naudojatės mūsų paslaugomis. Mums svarbu užtikrinti Jūsų asmens duomenų apsaugą ir skaidrumą, todėl tvarkome duomenis pagal ES Bendrąjį duomenų apsaugos reglamentą (GDPR).",
  sections: [
    {
      title: "Kokius duomenis renkame",
      blocks: [
        {
          type: "p",
          text: "Naudodami mūsų užklausos formą / anketą, galite pateikti šiuos asmens duomenis:",
        },
        {
          type: "ul",
          items: [
            "Vardas ir pavardė",
            "Miestas",
            "Telefono numeris",
            "Automobilio duomenys (markė, modelis, metai, pageidaujama kaina)",
            "Automobilio nuotraukos",
          ],
        },
        {
          type: "p",
          text: "Papildomai galime rinkti techninius duomenis apie Jūsų apsilankymą svetainėje (IP adresą, naršyklės tipą, slapukus).",
        },
      ],
    },
    {
      title: "Duomenų naudojimo tikslai",
      blocks: [
        { type: "p", text: "Jūsų pateiktus duomenis naudojame tik šiais tikslais:" },
        {
          type: "ul",
          items: [
            "Individualiam pasiūlymui dėl automobilio supirkimo pateikti.",
            "Susisiekti dėl užklausos ir sudaryti sandorį.",
            "Užtikrinti, kad galėtume suteikti paslaugas visoje Lietuvoje.",
            "Svetainės tobulinimui ir reklamos optimizavimui (Google Ads, Facebook Ads).",
          ],
        },
        { type: "p", text: "Mes niekada neparduodame Jūsų duomenų trečiosioms šalims." },
      ],
    },
    {
      title: "Teisinis pagrindas",
      blocks: [
        { type: "p", text: "Asmens duomenis tvarkome šiais pagrindais:" },
        {
          type: "ul",
          items: [
            "Jūsų sutikimu (kai pildote formą).",
            "Sutarties vykdymui (siekiant įvertinti ir supirkti automobilį).",
            "Mūsų teisėto intereso pagrindu (pvz., svetainės tobulinimas, reklamos analizė).",
          ],
        },
      ],
    },
    {
      title: "Duomenų saugojimo laikotarpis",
      blocks: [
        {
          type: "ul",
          items: [
            "Užklausų duomenys saugomi iki 24 mėnesių nuo pateikimo.",
            "Jei su Jumis sudaroma sutartis – duomenys saugomi pagal teisės aktų reikalavimus (pvz., apskaitos dokumentams – 10 metų).",
            "Pasibaigus laikotarpiui, duomenys yra saugiai ištrinami.",
          ],
        },
      ],
    },
    {
      title: "Duomenų perdavimas",
      blocks: [
        {
          type: "ul",
          items: [
            "Jūsų duomenys gali būti tvarkomi naudojantis išorine užklausų valdymo platforma, kuri užtikrina duomenų apsaugą pagal EU-US Data Privacy Framework.",
            "Reklamos tikslais naudojame Google Ireland Ltd. ir Meta Platforms Ireland Ltd. paslaugas. Šios bendrovės gali gauti prieigą prie slapukų ir IP adresų reklamos personalizavimui.",
          ],
        },
      ],
    },
    {
      title: "Jūsų teisės",
      blocks: [
        { type: "p", text: "Pagal GDPR Jūs turite teisę:" },
        {
          type: "ul",
          items: [
            "Gauti informaciją, kokius duomenis apie Jus tvarkome.",
            "Prašyti ištaisyti netikslius duomenis.",
            "Prašyti ištrinti duomenis („teisė būti pamirštam“).",
            "Apriboti duomenų tvarkymą.",
            "Prieštarauti duomenų tvarkymui reklamos tikslais.",
            "Pateikti skundą Valstybinei duomenų apsaugos inspekcijai.",
          ],
        },
        { type: "p", text: "Prašymus galite pateikti el. paštu: info@motivus.lt" },
      ],
    },
    {
      title: "Slapukai (Cookies)",
      blocks: [
        { type: "p", text: "Svetainėje naudojami slapukai, kad galėtume:" },
        {
          type: "ul",
          items: [
            "Užtikrinti tinkamą svetainės veikimą.",
            "Analizuoti srautą (Google Analytics arba panašios priemonės).",
            "Personalizuoti reklamą (Google Ads, Facebook Ads).",
          ],
        },
        {
          type: "p",
          text: "Neprivalomi slapukai (analitiniai ir reklaminiai) įjungiami tik Jums aiškiai sutikus slapukų juostoje. Savo pasirinkimą galite bet kada pakeisti paspaudę „Slapukų nustatymai“ svetainės poraštėje arba išvalę duomenis naršyklės nustatymuose.",
        },
      ],
    },
    {
      title: "Kontaktai",
      blocks: [
        { type: "p", text: "Duomenų valdytojas:" },
        { type: "contact", lines: COMPANY },
      ],
    },
  ],
};

export const COOKIES: LegalDoc = {
  slug: "slapuku-politika",
  title: "Slapukų politika",
  updated: "2025 m. rugsėjo 13 d.",
  description:
    "Kokius slapukus naudoja motivus.lt, kam jie reikalingi ir kaip galite valdyti savo pasirinkimus.",
  intro:
    "Ši Slapukų politika paaiškina, kaip MB Vairas ir pedalai (toliau – „Mes“) naudoja slapukus ir panašias technologijas mūsų svetainėje motivus.lt.",
  sections: [
    {
      title: "Kas yra slapukai?",
      blocks: [
        {
          type: "p",
          text: "Slapukai (angl. cookies) – tai maži tekstiniai failai, kurie išsaugomi Jūsų įrenginyje naršant mūsų svetainėje. Jie padeda užtikrinti tinkamą svetainės veikimą, pagerina vartotojo patirtį ir suteikia galimybę analizuoti lankytojų elgseną.",
        },
      ],
    },
    {
      title: "Kokius slapukus naudojame?",
      blocks: [
        { type: "p", text: "Naudojame šių tipų slapukus:" },
        {
          type: "ul",
          items: [
            "Būtinieji slapukai – reikalingi svetainės veikimui (pvz., prisijungimui, formų pateikimui). Be jų svetainė tinkamai neveiks.",
            "Analitiniai slapukai – padeda suprasti, kaip lankytojai naudojasi svetaine, kad galėtume ją tobulinti (pvz., „Google Analytics“).",
            "Reklaminiai slapukai – naudojami personalizuotai reklamai rodyti „Google Ads“ ir „Meta (Facebook) Ads“ platformose. Jie leidžia rodyti skelbimus, atitinkančius Jūsų interesus.",
            "Funkciniai slapukai – leidžia išsaugoti Jūsų pasirinkimus (pvz., kalbą, slapukų nustatymus).",
          ],
        },
      ],
    },
    {
      title: "Kaip naudojame slapukus?",
      blocks: [
        { type: "p", text: "Slapukus naudojame tam, kad:" },
        {
          type: "ul",
          items: [
            "Užtikrintume sklandų svetainės veikimą.",
            "Analizuotume lankytojų srautą ir naudotojų elgseną.",
            "Personalizuotume reklamą Google ir Meta (Facebook/Instagram) tinkluose.",
            "Pagerintume Jūsų patirtį naudojantis svetaine.",
          ],
        },
      ],
    },
    {
      title: "Kaip galite valdyti slapukus?",
      blocks: [
        { type: "p", text: "Jūs turite teisę priimti arba atmesti slapukus:" },
        {
          type: "ul",
          items: [
            "Kai pirmą kartą apsilankote svetainėje, parodysime slapukų juostą, kur galėsite pasirinkti, kokius slapukus leidžiate naudoti.",
            "Savo pasirinkimus galite bet kada pakeisti paspaudę „Slapukų nustatymai“ svetainės poraštėje arba savo naršyklės nustatymuose.",
            "Galite ištrinti jau įrašytus slapukus savo naršyklėje.",
          ],
        },
      ],
    },
    {
      title: "Trečiosios šalys",
      blocks: [
        { type: "p", text: "Slapukus gali naudoti ir mūsų partneriai:" },
        {
          type: "ul",
          items: [
            "Google Ireland Ltd. (Google Analytics, Google Ads).",
            "Meta Platforms Ireland Ltd. (Facebook, Instagram reklamos).",
          ],
        },
        {
          type: "p",
          text: "Šių įrankių slapukai gali rinkti informaciją apie Jūsų naršymą tiek mūsų, tiek kitose svetainėse.",
        },
      ],
    },
    {
      title: "Kontaktai",
      blocks: [
        { type: "p", text: "Jeigu turite klausimų dėl šios slapukų politikos, kreipkitės:" },
        { type: "contact", lines: COMPANY },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "paslaugu-teikimo-salygos",
  title: "Paslaugų teikimo sąlygos",
  updated: "2025 m. rugsėjo 13 d.",
  description:
    "Sąlygos, reglamentuojančios naudojimąsi motivus.lt svetaine ir MOTIVUS automobilių supirkimo paslaugomis.",
  intro:
    "Šios paslaugų teikimo sąlygos (toliau – „Sąlygos“) reglamentuoja, kaip naudotis svetaine motivus.lt ir mūsų siūlomomis paslaugomis. Naudodamiesi šia svetaine, Jūs sutinkate laikytis šių Sąlygų.",
  sections: [
    {
      title: "Bendrosios nuostatos",
      blocks: [
        {
          type: "ul",
          items: [
            "Svetainės valdytojas: MB Vairas ir pedalai (įmonės kodas 305636667, Kareivių g. 18-3, LT-09117 Vilnius, el. paštas: info@motivus.lt, tel. +370 632 22228).",
            "Naudodamiesi svetaine, Jūs patvirtinate, kad susipažinote su šiomis Sąlygomis ir įsipareigojate jų laikytis.",
            "Jei nesutinkate su Sąlygomis, prašome nesinaudoti svetaine ar mūsų paslaugomis.",
          ],
        },
      ],
    },
    {
      title: "Paslaugos",
      blocks: [
        {
          type: "ul",
          items: [
            "Teikiame automobilių supirkimo paslaugas visoje Lietuvoje.",
            "Klientai gali pateikti užklausą per svetainėje pateiktą formą ar kitais komunikacijos kanalais.",
            "Pasiūlymas dėl automobilio supirkimo yra individualus ir priklauso nuo konkrečios transporto priemonės būklės, rinkos kainos bei kitų aplinkybių.",
          ],
        },
      ],
    },
    {
      title: "Kliento pareigos",
      blocks: [
        {
          type: "ul",
          items: [
            "Klientas privalo pateikti teisingus ir tikslius duomenis apie automobilį (markę, modelį, metus, būklę, kainos lūkesčius ir pan.).",
            "Klientas privalo užtikrinti, kad parduodamas automobilis priklauso jam teisėtai arba jis turi teisę juo disponuoti.",
            "Klientas atsako už bet kokią žalą, atsiradusią dėl neteisingos ar klaidinančios informacijos pateikimo.",
          ],
        },
      ],
    },
    {
      title: "Atsakomybės apribojimas",
      blocks: [
        {
          type: "ul",
          items: [
            "Mes stengiamės užtikrinti, kad svetainė veiktų sklandžiai, tačiau negarantuojame, jog joje nebus klaidų ar trikdžių.",
            "Užklausos pateikimas nereiškia, kad sandoris bus sudarytas. Galutinė supirkimo kaina nustatoma tik po abipusio susitarimo.",
            "Mes neatsakome už nuostolius, patirtus dėl techninių trikdžių, interneto ryšio sutrikimų ar trečiųjų šalių veiksmų.",
          ],
        },
      ],
    },
    {
      title: "Duomenų apsauga",
      blocks: [
        {
          type: "p",
          text: "Tvarkydami klientų asmens duomenis, vadovaujamės mūsų Privatumo politika ir Slapukų politika. Pildydami užklausą Jūs sutinkate, kad Jūsų duomenys būtų tvarkomi pasiūlymo pateikimo tikslais.",
        },
      ],
    },
    {
      title: "Intelektinė nuosavybė",
      blocks: [
        {
          type: "p",
          text: "Visas svetainėje esantis turinys (tekstai, logotipai, dizainas, nuotraukos, kodas) yra MB Vairas ir pedalai nuosavybė arba naudojamas teisėtai. Draudžiama kopijuoti, platinti ar naudoti svetainės turinį be išankstinio rašytinio sutikimo.",
        },
      ],
    },
    {
      title: "Taikytina teisė ir ginčų sprendimas",
      blocks: [
        {
          // PASTABA: senojoje svetainėje šis sakinys nutrūksta ties „pagal mūs“.
          // Čia užbaigtas neutraliai – prieš publikavimą patvirtinti su užsakovu.
          type: "p",
          text: "Šios Sąlygos yra aiškinamos ir taikomos pagal Lietuvos Respublikos teisę. Visi ginčai, kylantys dėl šių Sąlygų ar mūsų teikiamų paslaugų, sprendžiami derybų būdu. Nepavykus susitarti – Lietuvos Respublikos teismuose teisės aktų nustatyta tvarka.",
        },
      ],
    },
    {
      title: "Kontaktai",
      blocks: [
        { type: "p", text: "Dėl šių Sąlygų galite kreiptis:" },
        { type: "contact", lines: COMPANY },
      ],
    },
  ],
};

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  [PRIVACY.slug]: PRIVACY,
  [COOKIES.slug]: COOKIES,
  [TERMS.slug]: TERMS,
};

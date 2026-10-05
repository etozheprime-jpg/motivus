/**
 * Visas tekstinis turinys vienoje vietoje — lengva redaguoti be kodo.
 * Faktai perimti iš esamos MOTIVUS svetainės; formuluotės perrašytos.
 */

export const BUSINESS = {
  name: "MOTIVUS",
  legal: "MB Vairas ir pedalai",
  phone: "+370 632 22228",
  phoneHref: "tel:+37063222228",
  email: "info@motivus.lt",
  address: "Varnės g. 2, Vilnius",
  /**
   * Navigacijos nuorodos. Naudojamas adreso tekstas, o ne koordinatės –
   * žemėlapis pats randa tikslią vietą ir nereikia spėlioti taško.
   */
  maps: {
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Varnės g. 2, Vilnius, Lietuva")}`,
    waze: `https://waze.com/ul?q=${encodeURIComponent("Varnės g. 2, Vilnius, Lietuva")}&navigate=yes`,
  },
  hours: [
    { days: "I–V", time: "08:00–20:00" },
    { days: "VI–VII", time: "09:00–19:00" },
  ],
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61581500312310",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/motivus_automobiliu_supirkimas/",
    },
  ],
};

/**
 * Žinutės. Numeris be „+“ ir be tarpų – to reikalauja wa.me ir Viber.
 * Telegram: jei įmonė turi @vardą, pakeiskite į https://t.me/vardas.
 */
const MSG_NUMBER = "37063222228";

export const MESSENGERS = [
  { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/${MSG_NUMBER}` },
  { id: "viber", label: "Viber", href: `viber://chat?number=%2B${MSG_NUMBER}` },
  { id: "telegram", label: "Telegram", href: `https://t.me/+${MSG_NUMBER}` },
] as const;

/** Tvarka sutampa su sekcijų tvarka puslapyje – meniu eina paeiliui. */
export const NAV = [
  { label: "Pagrindinis", href: "#pagrindinis", short: "Pagrindinis" },
  { label: "Kodėl MOTIVUS?", href: "#kodel-motivus", short: "Kodėl MOTIVUS?" },
  {
    label: "Kaip veikia supirkimo paslauga?",
    href: "#kaip-veikia",
    short: "Kaip veikia",
  },
  { label: "DUK", href: "#duk", short: "DUK" },
  { label: "Kontaktai", href: "#kontaktai", short: "Kontaktai" },
];

export const ADVANTAGES = [
  {
    index: "01",
    title: "Geresnė kaina",
    text: "Mokame daugiau nei dauguma supirkėjų. Pasiūlymą pateikiame sąžiningai — be paslėptų mokesčių ir be sumos tikslinimo paskutinę minutę.",
  },
  {
    index: "02",
    title: "Greitis",
    text: "Automobilio duomenis įvertiname vos per kelias minutes, o visą sandorį stengiamės užbaigti dar tą pačią dieną.",
  },
  {
    index: "03",
    title: "Patogumas",
    text: "Atvykstame į jums patogią vietą bet kuriame Lietuvos mieste. Jums nereikia nei gaišti laiko, nei kur nors važiuoti.",
  },
  {
    index: "04",
    title: "Be rūpesčių",
    text: "Dokumentus, sutartį ir automobilio išgabenimą sutvarkome patys. Jūs tik pasirašote ir gaunate pinigus.",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Pateikiate informaciją",
    text: "Markė, modelis, metai, rida ir būklė — užpildymas užima kelias minutes.",
  },
  {
    n: "02",
    title: "Įvertiname automobilį",
    text: "Patikriname duomenis ir rinkos kainą. Jei reikia, paskambiname ir patiksliname detales.",
  },
  {
    n: "03",
    title: "Pateikiame pasiūlymą",
    text: "Gaunate konkrečią sumą be paslėptų mokesčių. Sprendimas — visada jūsų.",
  },
  {
    n: "04",
    title: "Sutvarkome dokumentus",
    text: "Paruošiame sutartį ir atliekame visus formalumus už jus.",
  },
  {
    n: "05",
    title: "Parduodate automobilį",
    text: "Atsiskaitome, o automobilį išsivežame patys — net jei jis nevažiuoja.",
  },
];

export const CITIES = [
  { name: "Vilnius", x: 136.9, y: 95 },
  { name: "Kaunas", x: 93.3, y: 83.3 },
  { name: "Klaipėda", x: 6, y: 38.9 },
  { name: "Šiauliai", x: 74.9, y: 26.1 },
  { name: "Panevėžys", x: 107.8, y: 37.2 },
];

export const LT_PATH =
  "M 3.2 18.3 L 20.6 1.7 L 42.7 0 L 64.8 3.9 L 96.5 3.9 L 124.9 0 L 147.1 13.9 L 169.2 27.8 L 185 38.9 L 177.1 61.1 L 166 72.2 L 156.5 83.3 L 143.9 116.7 L 128.1 125 L 121.8 136.1 L 105.9 138.9 L 93.3 138.9 L 80.6 136.1 L 64.8 119.4 L 58.5 113.9 L 52.2 111.1 L 36.4 110 L 17.4 115 L 0 111.1 L 1.6 61.1 L 0 38.9 Z";

export const REVIEWS = [
  {
    name: "Tadas",
    city: "Ukmergė",
    text: "Užklausą pateikiau internetu ir pasiūlymą gavau netrukus. Viskas vyko skaidriai, o pinigus pervedė iškart po sutarties pasirašymo. Rekomenduoju tiems, kas nori parduoti automobilį greitai.",
  },
  {
    name: "Rūta",
    city: "Šiauliai",
    text: "Ieškojau, kur greitai parduoti automobilį už gerą kainą. Pasiūlymą gavau per kelias minutes, pinigai sąskaitoje buvo tą pačią dieną. Likau labai patenkinta.",
  },
  {
    name: "Jurgita",
    city: "Vilnius",
    text: "Turėjau daužtą automobilį po avarijos. Nustebino, kad viskas taip paprasta — atvyko patys, išsivežė, o pinigus gavau dar tą pačią dieną.",
  },
];

export const FAQ = [
  {
    q: "Ar superkate automobilius be techninės apžiūros (TA)?",
    a: "Taip. Superkame automobilius be galiojančios techninės apžiūros — net jei automobilis neatitinka reikalavimų ir nebegali dalyvauti eisme. Pasiūlymą pateiksime, o dokumentus sutvarkysime už jus.",
  },
  {
    q: "Kiek laiko užtrunka visas pardavimo procesas?",
    a: "Užklausą užpildysite per kelias minutes, pasiūlymą pateikiame greitai, o visą sandorį stengiamės užbaigti tą pačią dieną — įskaitant atsiskaitymą.",
  },
  {
    q: "Ar superkate daužtus ir nevažiuojančius automobilius?",
    a: "Taip, tai viena iš mūsų specializacijų. Superkame automobilius po avarijos, o jei transporto priemonė nevažiuoja — atvykstame patys ir pasirūpiname išgabenimu.",
  },
  {
    q: "Kiek kainuoja automobilių supirkimo paslauga?",
    a: "Paslauga jums nemokama. Nėra paslėptų mokesčių ar papildomų išlaidų — gaunate visą sutartą sumą.",
  },
  {
    q: "Ar superkate automobilius visoje Lietuvoje?",
    a: "Dirbame visoje Lietuvoje — Vilniuje, Kaune, Klaipėdoje, Šiauliuose, Panevėžyje ir mažesniuose miestuose. Atvykstame į jūsų nurodytą vietą.",
  },
  {
    q: "Kokių markių automobilius superkate?",
    a: "Superkame visų markių automobilius — nuo naujesnių iki senų, tvarkingų ir su defektais. Markė ar būklė nėra kliūtis gauti pasiūlymą.",
  },
];

export const LEGAL = [
  { label: "Privatumo politika", href: "/privatumo-politika/" },
  { label: "Slapukų politika", href: "/slapuku-politika/" },
  { label: "Paslaugų teikimo sąlygos", href: "/paslaugu-teikimo-salygos/" },
];

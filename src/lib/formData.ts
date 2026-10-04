export const FUELS = ["Benzinas", "Benzinas + dujos", "Dyzelinas", "Hibridas", "Elektra", "Kita"];

export const CITY_OPTIONS = [
  "Vilnius","Kaunas","Klaipėda","Šiauliai","Panevėžys","Alytus","Marijampolė","Mažeikiai",
  "Jonava","Utena","Kėdainiai","Telšiai","Tauragė","Ukmergė","Visaginas","Plungė","Kretinga",
  "Palanga","Šilutė","Radviliškis","Druskininkai","Rokiškis","Biržai","Elektrėnai","Kitas miestas",
];

const now = new Date().getFullYear();
export const YEARS = Array.from({ length: now - 1979 }, (_, i) => String(now - i));

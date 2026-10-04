/**
 * Vienas taškas, per kurį užklausa išeina iš svetainės.
 *
 * Pajungimas (pasirinkite vieną ir užpildykite .env):
 *   VITE_LEAD_ENDPOINT=https://...     – savas backend / webhook / Zapier / Make / Google Sheets
 *   VITE_LEAD_METHOD=POST              – numatyta POST
 *
 * Duomenys siunčiami kaip multipart/form-data, todėl nuotraukos
 * perduodamos tame pačiame užklausos kūne — nereikia atskiro upload API.
 * Jei endpoint'as nenustatytas, užklausa logginama į konsolę ir
 * grąžinamas sėkmės atsakymas (demo režimas) — mygtukas niekada nėra dekoratyvus.
 */

export type LeadPayload = {
  makeModel: string;
  year: string;
  fuel: string;
  comment: string;
  desiredPrice: string;
  city: string;
  phone: string;
  photos: File[];
};

export type LeadResult = { ok: true; demo: boolean } | { ok: false; error: string };

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

export async function submitLead(lead: LeadPayload): Promise<LeadResult> {
  const fd = new FormData();
  fd.append("source", "motivus.lt");
  fd.append("submittedAt", new Date().toISOString());
  fd.append("makeModel", lead.makeModel);
  fd.append("year", lead.year);
  fd.append("fuel", lead.fuel);
  fd.append("comment", lead.comment);
  fd.append("desiredPrice", lead.desiredPrice);
  fd.append("city", lead.city);
  fd.append("phone", lead.phone);
  lead.photos.forEach((f, i) => fd.append(`photo_${i + 1}`, f, f.name));

  if (!ENDPOINT) {
    // Demo režimas: imituojamas tinklo vėlinimas, kad būtų matomos visos būsenos.
    await new Promise((r) => setTimeout(r, 1100));
    if (import.meta.env.DEV) console.info("[MOTIVUS] Užklausa (demo režimas):", lead);
    return { ok: true, demo: true };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: (import.meta.env.VITE_LEAD_METHOD as string) || "POST",
      body: fd,
    });
    if (!res.ok) return { ok: false, error: `Serveris atsakė ${res.status}` };
    return { ok: true, demo: false };
  } catch {
    return { ok: false, error: "Nepavyko išsiųsti. Patikrinkite interneto ryšį." };
  }
}

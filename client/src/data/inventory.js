// Mock pharmacy inventory: which medicines are stocked where, at what price/stock.
// In production this is served by GET /api/v1/inventory
import { medicines } from "./medicines";
import { pharmacies } from "./pharmacies";

// Deterministic pseudo-random generator so mock data is stable across reloads
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function computeStatus(stock, threshold) {
  if (stock <= 0) return "out-of-stock";
  if (stock <= threshold) return "low-stock";
  return "available";
}

const basePrices = {
  "med-001": 150,
  "med-002": 620,
  "med-003": 210,
  "med-004": 180,
  "med-005": 890,
  "med-006": 540,
  "med-007": 730,
  "med-008": 410,
  "med-009": 1450,
  "med-010": 320,
  "med-011": 195,
  "med-012": 980,
  "med-013": 260,
  "med-014": 1150,
  "med-015": 240,
  "med-016": 860,
};

let idCounter = 1;
export const inventory = [];

pharmacies.forEach((pharmacy, pIdx) => {
  medicines.forEach((med, mIdx) => {
    const seed = pIdx * 97 + mIdx * 13 + 7;
    const r = seededRandom(seed);
    // ~78% of medicines are stocked at each pharmacy
    if (r < 0.22) return;

    const stockSeed = seededRandom(seed * 2.1);
    let stock = Math.floor(stockSeed * 120);
    if (stockSeed < 0.08) stock = 0;
    else if (stockSeed < 0.2) stock = Math.floor(stockSeed * 20) + 1;

    const threshold = 10;
    const priceVariance = 0.85 + seededRandom(seed * 3.3) * 0.3;
    const price = Math.round(basePrices[med.id] * priceVariance);

    const expirySeed = seededRandom(seed * 4.4);
    const daysToExpiry = Math.floor(expirySeed * 400) - 20; // some already expired
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysToExpiry);

    inventory.push({
      id: `inv-${String(idCounter++).padStart(4, "0")}`,
      pharmacyId: pharmacy.id,
      medicineId: med.id,
      stock,
      threshold,
      price,
      status: computeStatus(stock, threshold),
      expiryDate: expiryDate.toISOString().split("T")[0],
      updatedAt: new Date().toISOString(),
    });
  });
});

export const getInventoryForMedicine = (medicineId) =>
  inventory.filter((i) => i.medicineId === medicineId);

export const getInventoryForPharmacy = (pharmacyId) =>
  inventory.filter((i) => i.pharmacyId === pharmacyId);

export const getInventoryItem = (pharmacyId, medicineId) =>
  inventory.find((i) => i.pharmacyId === pharmacyId && i.medicineId === medicineId);

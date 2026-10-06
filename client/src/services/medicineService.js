// Medicine service — mock implementation.
// LATER: swap internals for apiClient.get("/medicines", params) etc.
import { mockDelay } from "./apiClient";
import { medicines, categories, getMedicineById } from "../data/medicines";
import { inventory, getInventoryForMedicine } from "../data/inventory";
import { getPharmacyById } from "../data/pharmacies";

// Builds a "listing" view: one row per medicine+pharmacy combination that's in stock
function buildListings() {
  return inventory.map((inv) => {
    const medicine = getMedicineById(inv.medicineId);
    const pharmacy = getPharmacyById(inv.pharmacyId);
    return { ...medicine, inventory: inv, pharmacy };
  });
}

export const medicineService = {
  async getCategories() {
    await mockDelay(null, 150);
    return categories;
  },

  async searchListings({
    query = "",
    category = "",
    availability = "",
    minPrice,
    maxPrice,
    maxDistance,
    pharmacyId = "",
    sortBy = "distance",
  } = {}) {
    await mockDelay(null, 500);
    let results = buildListings();

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (r) => r.name.toLowerCase().includes(q) || r.genericName.toLowerCase().includes(q)
      );
    }
    if (category) results = results.filter((r) => r.category === category);
    if (availability) results = results.filter((r) => r.inventory.status === availability);
    if (minPrice !== undefined) results = results.filter((r) => r.inventory.price >= minPrice);
    if (maxPrice !== undefined) results = results.filter((r) => r.inventory.price <= maxPrice);
    if (maxDistance !== undefined) results = results.filter((r) => r.pharmacy.distance <= maxDistance);
    if (pharmacyId) results = results.filter((r) => r.pharmacy.id === pharmacyId);

    const sorters = {
      distance: (a, b) => a.pharmacy.distance - b.pharmacy.distance,
      "price-asc": (a, b) => a.inventory.price - b.inventory.price,
      "price-desc": (a, b) => b.inventory.price - a.inventory.price,
      availability: (a, b) => {
        const rank = { available: 0, "low-stock": 1, "out-of-stock": 2 };
        return rank[a.inventory.status] - rank[b.inventory.status];
      },
    };
    results = [...results].sort(sorters[sortBy] || sorters.distance);

    return results;
  },

  async getMedicineById(id) {
    await mockDelay(null, 350);
    const medicine = getMedicineById(id);
    if (!medicine) throw new Error("Medicine not found.");
    const listings = getInventoryForMedicine(id).map((inv) => ({
      inventory: inv,
      pharmacy: getPharmacyById(inv.pharmacyId),
    }));
    return { ...medicine, listings };
  },

  async getAllMedicines() {
    await mockDelay(null, 300);
    return medicines;
  },

  async createMedicine(payload) {
    await mockDelay(null, 500);
    const newMedicine = { id: `med-${Date.now()}`, ...payload };
    medicines.push(newMedicine);
    return newMedicine;
  },

  async updateMedicine(id, payload) {
    await mockDelay(null, 500);
    const idx = medicines.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error("Medicine not found.");
    medicines[idx] = { ...medicines[idx], ...payload };
    return medicines[idx];
  },
};

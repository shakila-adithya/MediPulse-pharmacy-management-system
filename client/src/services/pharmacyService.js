// Pharmacy service — mock implementation.
// LATER: swap internals for apiClient calls to /api/v1/pharmacies
import { mockDelay } from "./apiClient";
import { pharmacies, getPharmacyById } from "../data/pharmacies";
import { getInventoryForPharmacy } from "../data/inventory";
import { getMedicineById } from "../data/medicines";

export const pharmacyService = {
  async searchPharmacies({ query = "", city = "", openNow = false, sortBy = "distance" } = {}) {
    await mockDelay(null, 450);
    let results = [...pharmacies];
    if (query) {
      const q = query.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
    }
    if (city) results = results.filter((p) => p.city === city);
    if (openNow) results = results.filter((p) => p.isOpenNow);

    const sorters = {
      distance: (a, b) => a.distance - b.distance,
      rating: (a, b) => b.rating - a.rating,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    results.sort(sorters[sortBy] || sorters.distance);
    return results;
  },

  async getPharmacyById(id) {
    await mockDelay(null, 350);
    const pharmacy = getPharmacyById(id);
    if (!pharmacy) throw new Error("Pharmacy not found.");
    const inventory = getInventoryForPharmacy(id).map((inv) => ({
      inventory: inv,
      medicine: getMedicineById(inv.medicineId),
    }));
    return { ...pharmacy, inventory };
  },

  async getCities() {
    await mockDelay(null, 100);
    return [...new Set(pharmacies.map((p) => p.city))];
  },

  async createPharmacy(payload) {
    await mockDelay(null, 500);
    const newPharmacy = {
      id: `phm-${Date.now()}`,
      distance: 0,
      rating: 0,
      reviewCount: 0,
      availableMedicinesCount: 0,
      status: "active",
      isOpenNow: true,
      ...payload,
    };
    pharmacies.push(newPharmacy);
    return newPharmacy;
  },

  async updatePharmacy(id, payload) {
    await mockDelay(null, 500);
    const idx = pharmacies.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Pharmacy not found.");
    pharmacies[idx] = { ...pharmacies[idx], ...payload };
    return pharmacies[idx];
  },

  async setPharmacyStatus(id, status) {
    await mockDelay(null, 400);
    const idx = pharmacies.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Pharmacy not found.");
    pharmacies[idx].status = status;
    return pharmacies[idx];
  },
};

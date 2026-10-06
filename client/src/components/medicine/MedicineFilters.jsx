import { SlidersHorizontal, X } from "lucide-react";
import Select from "../common/Select";
import Button from "../common/Button";

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
];

const PRICE_RANGES = [
  { value: "0-200", label: "Rs. 0 – 200" },
  { value: "200-500", label: "Rs. 200 – 500" },
  { value: "500-1000", label: "Rs. 500 – 1,000" },
  { value: "1000-999999", label: "Rs. 1,000+" },
];

const DISTANCE_OPTIONS = [
  { value: "2", label: "Within 2 km" },
  { value: "5", label: "Within 5 km" },
  { value: "10", label: "Within 10 km" },
  { value: "50", label: "Within 50 km" },
];

export default function MedicineFilters({ filters, onChange, categories, pharmacies, onReset, isOpen, onToggle }) {
  const handle = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 lg:hidden"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </span>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} lg:block px-5 pb-5 lg:pt-5 space-y-4`}>
        <div className="hidden lg:flex items-center justify-between mb-1">
          <span className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </span>
          {activeCount > 0 && (
            <button onClick={onReset} className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        <Select
          label="Category"
          placeholder="All categories"
          value={filters.category}
          onChange={handle("category")}
          options={categories.map((c) => ({ value: c, label: c }))}
        />
        <Select
          label="Availability"
          placeholder="All availability"
          value={filters.availability}
          onChange={handle("availability")}
          options={AVAILABILITY_OPTIONS}
        />
        <Select
          label="Price Range"
          placeholder="Any price"
          value={filters.priceRange}
          onChange={handle("priceRange")}
          options={PRICE_RANGES}
        />
        <Select
          label="Distance"
          placeholder="Any distance"
          value={filters.distance}
          onChange={handle("distance")}
          options={DISTANCE_OPTIONS}
        />
        <Select
          label="Pharmacy"
          placeholder="All pharmacies"
          value={filters.pharmacyId}
          onChange={handle("pharmacyId")}
          options={pharmacies.map((p) => ({ value: p.id, label: p.name }))}
        />

        <div className="lg:hidden pt-2">
          <Button variant="outline" fullWidth onClick={onReset}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

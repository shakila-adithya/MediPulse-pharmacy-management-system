import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Select from "../../components/common/Select";
import MedicineCard from "../../components/medicine/MedicineCard";
import MedicineFilters from "../../components/medicine/MedicineFilters";
import SkeletonCard from "../../components/common/SkeletonCard";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";
import { medicineService, pharmacyService } from "../../services";

const SORT_OPTIONS = [
  { value: "distance", label: "Distance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "availability", label: "Availability" },
];

const PAGE_SIZE = 9;

export default function MedicineSearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({ category: searchParams.get("category") || "", availability: "", priceRange: "", distance: "", pharmacyId: "" });
  const [sortBy, setSortBy] = useState("distance");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    medicineService.getCategories().then(setCategories);
    pharmacyService.searchPharmacies().then(setPharmacies);
  }, []);

  const runSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const [minPrice, maxPrice] = filters.priceRange ? filters.priceRange.split("-").map(Number) : [undefined, undefined];
      const data = await medicineService.searchListings({
        query,
        category: filters.category,
        availability: filters.availability,
        minPrice,
        maxPrice,
        maxDistance: filters.distance ? Number(filters.distance) : undefined,
        pharmacyId: filters.pharmacyId,
        sortBy,
      });
      setResults(data);
      setPage(1);
    } finally {
      setIsLoading(false);
    }
  }, [query, filters, sortBy]);

  useEffect(() => {
    const timerId = window.setTimeout(runSearch, 0);
    return () => window.clearTimeout(timerId);
  }, [runSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return results.slice(start, start + PAGE_SIZE);
  }, [results, page]);

  const totalPages = Math.ceil(results.length / PAGE_SIZE) || 1;

  const handleReset = () => setFilters({ category: "", availability: "", priceRange: "", distance: "", pharmacyId: "" });

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-page py-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Find Medicine</h1>
          <p className="text-slate-500 text-sm mb-5">Search across all partner pharmacies for real-time availability.</p>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={runSearch}
            placeholder="Search medicine by name or generic name..."
            size="lg"
          />
        </div>
      </div>

      <div className="container-page py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div>
            <MedicineFilters
              filters={filters}
              onChange={setFilters}
              categories={categories}
              pharmacies={pharmacies}
              onReset={handleReset}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen((v) => !v)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                {isLoading ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
              </p>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={SORT_OPTIONS}
                className="w-52"
              />
            </div>

            {isLoading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <EmptyState
                title="No medicines found."
                description="Try changing your search or filters."
                action={
                  <button onClick={handleReset} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                    Clear all filters
                  </button>
                }
              />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((listing) => (
                    <MedicineCard
                      key={`${listing.id}-${listing.pharmacy.id}`}
                      listing={listing}
                    />
                  ))}
                </div>
                <div className="mt-8">
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

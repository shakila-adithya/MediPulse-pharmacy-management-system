import { useState, useEffect, useCallback } from "react";
import SearchBar from "../../components/common/SearchBar";
import Select from "../../components/common/Select";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import EmptyState from "../../components/common/EmptyState";
import { pharmacyService } from "../../services";

const SORT_OPTIONS = [
  { value: "distance", label: "Distance" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name (A-Z)" },
];

export default function PharmacyListingPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [cities, setCities] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pharmacyService.getCities().then(setCities);
  }, []);

  const runSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await pharmacyService.searchPharmacies({ query, city, openNow, sortBy });
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  }, [query, city, openNow, sortBy]);

  useEffect(() => {
    const timerId = window.setTimeout(runSearch, 0);
    return () => window.clearTimeout(timerId);
  }, [runSearch]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-page py-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Pharmacies Near You</h1>
          <p className="text-slate-500 text-sm mb-5">Browse partner pharmacies and check what they have in stock.</p>
          <SearchBar value={query} onChange={setQuery} onSubmit={runSearch} placeholder="Search pharmacies by name or city..." size="lg" />
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="All cities"
            options={cities.map((c) => ({ value: c, label: c }))}
            className="sm:w-48"
          />
          <label className="flex items-center gap-2 text-sm text-slate-600 font-medium select-none px-1">
            <input
              type="checkbox"
              checked={openNow}
              onChange={(e) => setOpenNow(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            Open Now
          </label>
          <div className="sm:ml-auto">
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} options={SORT_OPTIONS} className="sm:w-52" />
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-5">
          {isLoading ? "Searching..." : `${results.length} pharmac${results.length !== 1 ? "ies" : "y"} found`}
        </p>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <EmptyState title="No pharmacies found." description="Try changing your search or filters." />
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {results.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

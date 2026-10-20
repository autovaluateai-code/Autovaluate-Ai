import React, { useState, useMemo } from 'react';
import {
  MASTER_CATALOG,
  INDIAN_CITIES,
  calculateIndianCityRealPrice
} from '../data/massiveVehiclesData';
import {
  VehicleCategory,
  IndianVehicleModel,
  formatInr,
  formatInrLakhs
} from '../types/valuation';
import {
  Search,
  MapPin,
  Car,
  Bike,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Check
} from 'lucide-react';

interface AdvanceVehicleExplorerProps {
  onSelectModelForValuation: (
    type: VehicleCategory,
    brandName: string,
    modelName: string,
    cityId: string
  ) => void;
  selectedCityId: string;
  onSelectCityId: (id: string) => void;
}

export const AdvanceVehicleExplorer: React.FC<AdvanceVehicleExplorerProps> = ({
  onSelectModelForValuation,
  selectedCityId,
  onSelectCityId,
}) => {
  const [activeTab, setActiveTab] = useState<VehicleCategory>('car');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  const activeBrands = activeTab === 'car' ? MASTER_CATALOG.carBrands : MASTER_CATALOG.bikeBrands;
  const currentCity = useMemo(() => {
    return INDIAN_CITIES.find(c => c.id === selectedCityId) || INDIAN_CITIES[0];
  }, [selectedCityId]);

  // Flatten all models
  const allModels = useMemo(() => {
    const list: (IndianVehicleModel & { brandOrigin: string })[] = [];
    activeBrands.forEach(brand => {
      brand.popularModels.forEach(m => {
        list.push({
          ...m,
          brandOrigin: brand.origin
        });
      });
    });
    return list;
  }, [activeBrands]);

  // Available body types
  const availableBodyTypes = useMemo(() => {
    const set = new Set<string>();
    allModels.forEach(m => set.add(m.bodyType));
    return Array.from(set);
  }, [allModels]);

  // Filtered models
  const filteredModels = useMemo(() => {
    return allModels.filter(m => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBrand = m.brand.toLowerCase().includes(q);
        const matchModel = m.name.toLowerCase().includes(q);
        const matchBody = m.bodyType.toLowerCase().includes(q);
        if (!matchBrand && !matchModel && !matchBody) return false;
      }

      // Body Type
      if (selectedBodyType !== 'all' && m.bodyType !== selectedBodyType) {
        return false;
      }

      // Budget
      if (selectedBudget !== 'all') {
        const minP = m.exShowroomRange[0];
        if (selectedBudget === 'under-5l' && minP > 500000) return false;
        if (selectedBudget === '5l-10l' && (minP < 500000 || minP > 1000000)) return false;
        if (selectedBudget === '10l-20l' && (minP < 1000000 || minP > 2000000)) return false;
        if (selectedBudget === '20l-50l' && (minP < 2000000 || minP > 5000000)) return false;
        if (selectedBudget === '50l-plus' && minP < 5000000) return false;
      }

      return true;
    });
  }, [allModels, searchQuery, selectedBodyType, selectedBudget]);

  return (
    <section id="vehicle-catalog" className="py-16 md:py-20 bg-[#0a0e16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Massive Automotive & Motorcycle Database
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Explore 70+ Car Brands (500+ Cars) & 20+ Bike Brands (200+ Bikes)
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Search real ex-showroom prices and calculated fair resale values across all Indian cities with localized RTO taxation.
            </p>
          </div>

          {/* City Selection Dropdown in Header */}
          <div className="flex items-center gap-2 p-2 bg-slate-900/90 rounded-xl border border-slate-700/80">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Select City & RTO</span>
              <select
                value={selectedCityId}
                onChange={(e) => onSelectCityId(e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer pr-4"
              >
                {INDIAN_CITIES.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-950 text-white">
                    {c.name} ({c.rtoCode} - {c.stateCode})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Advance Control Bar: Category Switcher + Live Instant Search Bar */}
        <div className="bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => {
                  setActiveTab('car');
                  setSelectedBodyType('all');
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'car'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>All 70+ Car Brands ({MASTER_CATALOG.totalCarsCount}+ Variants)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('bike');
                  setSelectedBodyType('all');
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'bike'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>All 20+ Bike Brands ({MASTER_CATALOG.totalBikesCount}+ Variants)</span>
              </button>
            </div>

            {/* Total Results Counter */}
            <div className="text-xs font-mono text-slate-400 tabular-nums self-end sm:self-auto">
              Showing <span className="text-white font-bold">{filteredModels.length}</span> models in <span className="text-emerald-400 font-semibold">{currentCity.name}</span>
            </div>

          </div>

          {/* Search Input & Quick Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'car' ? "Search e.g. Thar, Creta, Swift, Fortuner, Nexon, BMW..." : "Search e.g. Classic 350, Ninja, MT-15, Apache, Splendor, Duke..."}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Body Type Filter (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedBodyType}
                onChange={(e) => setSelectedBodyType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="all">All Body Types ({availableBodyTypes.length})</option>
                {availableBodyTypes.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Budget Filter (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="all">All Budget Slabs</option>
                <option value="under-5l">Under ₹5 Lakh</option>
                <option value="5l-10l">₹5 Lakh – ₹10 Lakh</option>
                <option value="10l-20l">₹10 Lakh – ₹20 Lakh</option>
                <option value="20l-50l">₹20 Lakh – ₹50 Lakh</option>
                <option value="50l-plus">₹50 Lakh – ₹1 Cr+</option>
              </select>
            </div>

          </div>

        </div>

        {/* Models Grid */}
        {filteredModels.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Vehicles Matched Your Search</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search keywords or resetting the body type / budget filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBodyType('all');
                setSelectedBudget('all');
              }}
              className="px-4 py-2 text-xs font-semibold bg-white text-slate-950 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredModels.slice(0, 32).map((model) => {
              // Calculate 3-year fair resale price for default variant in selected city
              const sampleVariant = model.variants[0];
              const sampleValuation = calculateIndianCityRealPrice(
                model.type,
                model.brand,
                model.name,
                sampleVariant.name,
                sampleVariant.exShowroomPrice,
                2023,
                model.type === 'car' ? 24000 : 8500,
                sampleVariant.fuel,
                sampleVariant.transmission,
                selectedCityId,
                'very_good',
                '1st Owner',
                true,
                []
              );

              return (
                <div
                  key={model.id}
                  className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Brand Origin & Body Type */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="font-semibold text-slate-300">{model.brand}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono">
                        {model.bodyType}
                      </span>
                    </div>

                    {/* Model Name */}
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {model.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 truncate mb-3">
                      {model.variants.length} Indian Variants Available
                    </div>

                    {/* Ex-Showroom vs Fair Resale Price in City */}
                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800/80 mb-3 space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between items-center text-slate-400 text-[11px]">
                        <span>Ex-Showroom New:</span>
                        <span className="text-white font-medium">
                          {formatInrLakhs(model.exShowroomRange[0])} – {formatInrLakhs(model.exShowroomRange[1])}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-800/80">
                        <span className="text-emerald-400 font-semibold font-sans text-[11px]">Fair Resale (2023):</span>
                        <span className="text-emerald-400 font-bold tabular-nums">
                          {formatInrLakhs(sampleValuation.privatePartyRealPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Valuation Trigger */}
                  <button
                    onClick={() => onSelectModelForValuation(model.type, model.brand, model.name, selectedCityId)}
                    className="w-full mt-2 py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-white hover:text-slate-950 text-slate-200 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Identify Real Resale Price</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {filteredModels.length > 32 && (
          <div className="text-center mt-8 pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">
              Displaying 32 of {filteredModels.length} models. Use the search bar above to look up any specific car or bike!
            </span>
          </div>
        )}

      </div>
    </section>
  );
};

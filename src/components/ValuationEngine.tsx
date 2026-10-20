import React, { useState, useMemo, useEffect } from 'react';
import {
  MASTER_CATALOG,
  INDIAN_CITIES,
  calculateIndianCityRealPrice,
  INDIAN_OPTIONS
} from '../data/massiveVehiclesData';
import {
  VehicleCategory,
  ConditionLevel,
  OwnerSerial,
  FuelType,
  TransmissionType,
  ValuationResultIndia,
  formatInr,
  formatInrLakhs
} from '../types/valuation';
import {
  Check,
  FileText,
  ChevronRight,
  MapPin,
  Gauge,
  Car,
  Bike,
  Upload,
  Search,
  Sparkles
} from 'lucide-react';

interface ValuationEngineProps {
  activeCategory: VehicleCategory;
  onSelectCategory: (cat: VehicleCategory) => void;
  onOpenReportModal: (result: ValuationResultIndia) => void;
  onOpenUploadModal: () => void;
  selectedCityId: string;
  onSelectCityId: (id: string) => void;
  presetModel?: { brand: string; model: string } | null;
}

export const ValuationEngine: React.FC<ValuationEngineProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenReportModal,
  onOpenUploadModal,
  selectedCityId,
  onSelectCityId,
  presetModel,
}) => {
  const availableBrands = activeCategory === 'car' ? MASTER_CATALOG.carBrands : MASTER_CATALOG.bikeBrands;

  // Selected State
  const [selectedBrandName, setSelectedBrandName] = useState<string>(availableBrands[0].name);
  const [selectedModelName, setSelectedModelName] = useState<string>(
    availableBrands[0].popularModels[0]?.name || ''
  );
  const [selectedVariantName, setSelectedVariantName] = useState<string>(
    availableBrands[0].popularModels[0]?.variants[0]?.name || ''
  );

  // If preset model passed from Explorer, apply it
  useEffect(() => {
    if (presetModel) {
      setSelectedBrandName(presetModel.brand);
      setSelectedModelName(presetModel.model);
      const brandObj = availableBrands.find(b => b.name === presetModel.brand);
      const modelObj = brandObj?.popularModels.find(m => m.name === presetModel.model);
      if (modelObj && modelObj.variants.length > 0) {
        setSelectedVariantName(modelObj.variants[0].name);
      }
    }
  }, [presetModel, availableBrands]);

  const [year, setYear] = useState<number>(2023);
  const [odometerKm, setOdometerKm] = useState<number>(activeCategory === 'car' ? 24000 : 8500);
  const [condition, setCondition] = useState<ConditionLevel>('very_good');
  const [ownerSerial, setOwnerSerial] = useState<OwnerSerial>('1st Owner');
  const [insuranceValid, setInsuranceValid] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['opt_sunroof', 'opt_ppf_coating']);

  // Handle category switch
  const handleCategorySwitch = (cat: VehicleCategory) => {
    onSelectCategory(cat);
    const brands = cat === 'car' ? MASTER_CATALOG.carBrands : MASTER_CATALOG.bikeBrands;
    setSelectedBrandName(brands[0].name);
    setSelectedModelName(brands[0].popularModels[0]?.name || '');
    setSelectedVariantName(brands[0].popularModels[0]?.variants[0]?.name || '');
    setOdometerKm(cat === 'car' ? 24000 : 8500);
  };

  // Find active brand & model
  const activeBrandObj = useMemo(() => {
    return availableBrands.find(b => b.name === selectedBrandName) || availableBrands[0];
  }, [availableBrands, selectedBrandName]);

  const activeModelObj = useMemo(() => {
    return activeBrandObj.popularModels.find(m => m.name === selectedModelName) || activeBrandObj.popularModels[0];
  }, [activeBrandObj, selectedModelName]);

  const activeVariantObj = useMemo(() => {
    return activeModelObj?.variants.find(v => v.name === selectedVariantName) || activeModelObj?.variants[0];
  }, [activeModelObj, selectedVariantName]);

  const exShowroomPrice = activeVariantObj?.exShowroomPrice || (activeCategory === 'car' ? 1200000 : 200000);
  const fuelType = activeVariantObj?.fuel || 'Petrol';
  const transmissionType = activeVariantObj?.transmission || 'Manual';

  const currentCity = useMemo(() => {
    return INDIAN_CITIES.find(c => c.id === selectedCityId) || INDIAN_CITIES[0];
  }, [selectedCityId]);

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Fair Price Calculation
  const valuation: ValuationResultIndia = useMemo(() => {
    return calculateIndianCityRealPrice(
      activeCategory,
      selectedBrandName,
      selectedModelName,
      selectedVariantName,
      exShowroomPrice,
      year,
      odometerKm,
      fuelType,
      transmissionType,
      selectedCityId,
      condition,
      ownerSerial,
      insuranceValid,
      selectedOptions
    );
  }, [
    activeCategory,
    selectedBrandName,
    selectedModelName,
    selectedVariantName,
    exShowroomPrice,
    year,
    odometerKm,
    fuelType,
    transmissionType,
    selectedCityId,
    condition,
    ownerSerial,
    insuranceValid,
    selectedOptions
  ]);

  const relevantOptions = useMemo(() => {
    return INDIAN_OPTIONS.filter(o => !o.vehicleType || o.vehicleType === 'both' || o.vehicleType === activeCategory);
  }, [activeCategory]);

  return (
    <section id="valuation-engine" className="py-16 md:py-24 bg-[#0e131d] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Fair Resale Price Calculator
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Instant Indian Fair Price Appraisal Engine
            </h2>
          </div>
          
          {/* Category Switcher & Upload Quick Trigger */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => handleCategorySwitch('car')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'car'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Cars ({MASTER_CATALOG.carBrands.length} Brands)</span>
              </button>
              <button
                onClick={() => handleCategorySwitch('bike')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'bike'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Bikes ({MASTER_CATALOG.bikeBrands.length} Brands)</span>
              </button>
            </div>

            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-md transition-colors cursor-pointer shadow"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload My Vehicle</span>
            </button>
          </div>
        </div>

        {/* Brand, Model, Variant & City Cascading Selector */}
        <div className="mb-8 p-5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-300 uppercase tracking-wide">
              Select from all {availableBrands.length} Indian Brands & 50+ Cities
            </span>
            <span className="font-mono text-emerald-400 font-bold tabular-nums">
              Ex-Showroom: {formatInr(exShowroomPrice)} ({formatInrLakhs(exShowroomPrice)})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* City Selection */}
            <div>
              <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>RTO City ({INDIAN_CITIES.length} Available)</span>
              </label>
              <select
                value={selectedCityId}
                onChange={(e) => onSelectCityId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                {INDIAN_CITIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.rtoCode} - {c.stateCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Selection */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Brand / Manufacturer ({availableBrands.length} Brands)
              </label>
              <select
                value={selectedBrandName}
                onChange={(e) => {
                  setSelectedBrandName(e.target.value);
                  const brand = availableBrands.find(b => b.name === e.target.value);
                  if (brand && brand.popularModels.length > 0) {
                    setSelectedModelName(brand.popularModels[0].name);
                    setSelectedVariantName(brand.popularModels[0].variants[0]?.name || '');
                  }
                }}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                {availableBrands.map(b => (
                  <option key={b.id} value={b.name}>{b.name} ({b.origin})</option>
                ))}
              </select>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Model ({activeBrandObj.popularModels.length} Models)
              </label>
              <select
                value={selectedModelName}
                onChange={(e) => {
                  setSelectedModelName(e.target.value);
                  const model = activeBrandObj.popularModels.find(m => m.name === e.target.value);
                  if (model && model.variants.length > 0) {
                    setSelectedVariantName(model.variants[0].name);
                  }
                }}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                {activeBrandObj.popularModels.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Variant Selection */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Variant / Trim ({activeModelObj?.variants.length || 0} Trims)
              </label>
              <select
                value={selectedVariantName}
                onChange={(e) => setSelectedVariantName(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                {activeModelObj?.variants.map((v, i) => (
                  <option key={i} value={v.name}>{v.name} ({formatInrLakhs(v.exShowroomPrice)})</option>
                ))}
              </select>
            </div>

          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">{activeVariantObj?.engineSpecs}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">{fuelType}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">{transmissionType}</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-mono">
              RTO City: {currentCity.name} ({currentCity.rtoCode})
            </div>
          </div>
        </div>

        {/* 2-Column Valuation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/70 p-6 rounded-xl border border-slate-800">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold text-slate-200">Vehicle Specification</span>
                <span className="font-mono text-emerald-400 font-bold">{formatInrLakhs(exShowroomPrice)} Ex-Showroom</span>
              </div>
              <div className="text-base font-bold text-white">
                {year} {selectedBrandName} {selectedModelName}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 truncate">
                {selectedVariantName}
              </div>
            </div>

            {/* Purchase Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Registration Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer font-mono"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ownership</label>
                <select
                  value={ownerSerial}
                  onChange={(e) => setOwnerSerial(e.target.value as OwnerSerial)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
                >
                  <option value="1st Owner">1st Owner</option>
                  <option value="2nd Owner">2nd Owner</option>
                  <option value="3rd Owner">3rd Owner</option>
                  <option value="4th+ Owner">4th+ Owner</option>
                </select>
              </div>
            </div>

            {/* Odometer KM Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-slate-400" />
                  <span>Odometer (KM)</span>
                </span>
                <span className="font-mono font-semibold text-white text-sm tabular-nums">
                  {odometerKm.toLocaleString()} KM
                </span>
              </div>
              <input
                type="range"
                min={activeCategory === 'car' ? 2000 : 1000}
                max={activeCategory === 'car' ? 160000 : 50000}
                step={activeCategory === 'car' ? 1000 : 500}
                value={odometerKm}
                onChange={(e) => setOdometerKm(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>Low Run</span>
                <span>Average Usage</span>
                <span>High Run</span>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Condition Rating</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionLevel)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="excellent">Excellent (Mint / Showroom condition)</option>
                <option value="very_good">Very Good (Clean, minor daily wear)</option>
                <option value="good">Good (Normal city traffic wear)</option>
                <option value="fair">Fair (Requires mechanical attention)</option>
              </select>
            </div>

            {/* Insurance Checkbox */}
            <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <input
                type="checkbox"
                id="valuation-insurance-check-v2"
                checked={insuranceValid}
                onChange={(e) => setInsuranceValid(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
              <label htmlFor="valuation-insurance-check-v2" className="text-xs text-slate-300 cursor-pointer">
                <span className="font-semibold block text-white">Comprehensive Insurance is Active</span>
                <span className="text-[11px] text-slate-400">Policy active for next 6+ months in {currentCity.name}</span>
              </label>
            </div>

          </div>

          {/* Right Column: Multi-Channel Real Indian Prices (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3 Real Price Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: Real Private Party Price (Focal) */}
              <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-700 shadow-md">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Fair Resale Price</span>
                  <span className="font-mono text-emerald-400 text-[11px]">{currentCity.name}</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">Real Private Party Resale</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums my-2">
                  {formatInr(valuation.privatePartyRealPrice)}
                </div>
                <div className="text-xs text-emerald-400 font-mono font-bold">
                  {formatInrLakhs(valuation.privatePartyRealPrice)}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug mt-1.5">
                  Direct transfer between buyer and seller in {currentCity.name}.
                </div>
              </div>

              {/* Card 2: Showroom Listing */}
              <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Spinny / Cars24 / True Value</div>
                <div className="text-sm font-semibold text-slate-200">Dealer Lot Benchmark</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-200 tracking-tight tabular-nums my-2">
                  {formatInr(valuation.showroomDealerPrice)}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {formatInrLakhs(valuation.showroomDealerPrice)}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug mt-1.5">
                  Retail listing sticker with reconditioning and warranty margin.
                </div>
              </div>

              {/* Card 3: Instant Cash Buyback */}
              <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Instant Bank Transfer</div>
                <div className="text-sm font-semibold text-slate-200">Instant Cash Offer</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight tabular-nums my-2">
                  {formatInr(valuation.instantCashBuyback)}
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  {formatInrLakhs(valuation.instantCashBuyback)}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug mt-1.5">
                  Immediate liquidation buyout amount deposited directly into your bank account.
                </div>
              </div>

            </div>

            {/* Indian Resale Price Ledger */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
              <div className="font-semibold text-slate-200 mb-3 flex items-center justify-between">
                <span>Fair Price Mathematical Ledger ({currentCity.name})</span>
                <span className="font-mono text-slate-400 tabular-nums">
                  Ex-Showroom: {formatInr(exShowroomPrice)}
                </span>
              </div>
              
              <div className="space-y-2 font-mono tabular-nums text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Ex-Showroom Starting Base</span>
                  <span>{formatInr(exShowroomPrice)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Age Depreciation Loss ({2026 - year} Years)</span>
                  <span className="text-amber-400">-{formatInr(valuation.depreciationLoss)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Odometer Variance ({odometerKm.toLocaleString()} KM)</span>
                  <span className={valuation.mileageAdjustment >= 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {valuation.mileageAdjustment >= 0 ? `+${formatInr(valuation.mileageAdjustment)}` : `-${formatInr(Math.abs(valuation.mileageAdjustment))}`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Ownership Serial ({ownerSerial})</span>
                  <span className={valuation.ownerAdjustment >= 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {valuation.ownerAdjustment >= 0 ? `+${formatInr(valuation.ownerAdjustment)}` : `-${formatInr(Math.abs(valuation.ownerAdjustment))}`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">City & RTO Tax Factor ({currentCity.name} - {currentCity.rtoCode})</span>
                  <span className={valuation.rtoAdjustment >= 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {valuation.rtoAdjustment >= 0 ? `+${formatInr(valuation.rtoAdjustment)}` : `-${formatInr(Math.abs(valuation.rtoAdjustment))}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-white">
                  <span>Final Fair Resale Price in {currentCity.name}</span>
                  <span className="text-emerald-400 font-mono">
                    {formatInr(valuation.privatePartyRealPrice)} ({formatInrLakhs(valuation.privatePartyRealPrice)})
                  </span>
                </div>
              </div>
            </div>

            {/* Official Report & Upload CTA */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-300" />
                <div>
                  <div className="text-xs font-bold text-white">Official Indian RTO Valuation Certificate</div>
                  <div className="text-[11px] text-slate-400">Generate a stamped forensic document in INR, signed by Academy faculty for loan, insurance, or campus sale.</div>
                </div>
              </div>
              <button
                onClick={() => onOpenReportModal(valuation)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shadow cursor-pointer flex items-center gap-1.5"
              >
                <span>View Certificate</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

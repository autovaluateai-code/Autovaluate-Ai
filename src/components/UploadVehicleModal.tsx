import React, { useState } from 'react';
import {
  X,
  Upload,
  FileCheck,
  Car,
  Bike,
  MapPin
} from 'lucide-react';
import {
  MASTER_CATALOG,
  INDIAN_CITIES,
  calculateIndianCityRealPrice
} from '../data/massiveVehiclesData';
import {
  VehicleCategory,
  ConditionLevel,
  OwnerSerial,
  FuelType,
  TransmissionType,
  UploadedVehicle
} from '../types/valuation';

interface UploadVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleUploaded: (vehicle: UploadedVehicle) => void;
  defaultCityId?: string;
}

export const UploadVehicleModal: React.FC<UploadVehicleModalProps> = ({
  isOpen,
  onClose,
  onVehicleUploaded,
  defaultCityId = 'delhi-ncr',
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<VehicleCategory>('car');
  const availableBrands = category === 'car' ? MASTER_CATALOG.carBrands : MASTER_CATALOG.bikeBrands;

  const [selectedBrand, setSelectedBrand] = useState<string>(availableBrands[0].name);
  const [selectedModel, setSelectedModel] = useState<string>(availableBrands[0].popularModels[0]?.name || '');
  const [selectedVariant, setSelectedVariant] = useState<string>(
    availableBrands[0].popularModels[0]?.variants[0]?.name || ''
  );

  const [customBrandMode, setCustomBrandMode] = useState<boolean>(false);
  const [customBrand, setCustomBrand] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [customVariant, setCustomVariant] = useState<string>('');
  const [customExShowroom, setCustomExShowroom] = useState<number>(category === 'car' ? 1200000 : 200000);

  const [regNumber, setRegNumber] = useState<string>('DL 08 CA 9821');
  const [year, setYear] = useState<number>(2023);
  const [selectedCityId, setSelectedCityId] = useState<string>(defaultCityId);
  const [odometerKm, setOdometerKm] = useState<number>(24000);
  const [fuel, setFuel] = useState<FuelType>('Petrol');
  const [transmission, setTransmission] = useState<TransmissionType>('Manual');
  const [condition, setCondition] = useState<ConditionLevel>('very_good');
  const [ownerSerial, setOwnerSerial] = useState<OwnerSerial>('1st Owner');
  const [insuranceValid, setInsuranceValid] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('Single hand driven, regular company service records, scratchless bumpers.');

  // Image upload state
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // When category changes
  const handleCategoryChange = (cat: VehicleCategory) => {
    setCategory(cat);
    const brands = cat === 'car' ? MASTER_CATALOG.carBrands : MASTER_CATALOG.bikeBrands;
    setSelectedBrand(brands[0].name);
    setSelectedModel(brands[0].popularModels[0]?.name || '');
    setSelectedVariant(brands[0].popularModels[0]?.variants[0]?.name || '');
    setCustomExShowroom(cat === 'car' ? 1200000 : 200000);
    setOdometerKm(cat === 'car' ? 24000 : 8500);
  };

  // When brand changes
  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const brandObj = availableBrands.find(b => b.name === brandName);
    if (brandObj && brandObj.popularModels.length > 0) {
      setSelectedModel(brandObj.popularModels[0].name);
      setSelectedVariant(brandObj.popularModels[0].variants[0]?.name || '');
      setFuel(brandObj.popularModels[0].variants[0]?.fuel || 'Petrol');
      setTransmission(brandObj.popularModels[0].variants[0]?.transmission || 'Manual');
    }
  };

  // When model changes
  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    const brandObj = availableBrands.find(b => b.name === selectedBrand);
    const modelObj = brandObj?.popularModels.find(m => m.name === modelName);
    if (modelObj && modelObj.variants.length > 0) {
      setSelectedVariant(modelObj.variants[0].name);
      setFuel(modelObj.variants[0].fuel || 'Petrol');
      setTransmission(modelObj.variants[0].transmission || 'Manual');
    }
  };

  // Image file handler
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Submit & Calculate
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const activeBrand = customBrandMode ? customBrand : selectedBrand;
      const activeModel = customBrandMode ? customModel : selectedModel;
      const activeVariant = customBrandMode ? customVariant : selectedVariant;

      // Find ex-showroom price
      let exShowroom = customExShowroom;
      if (!customBrandMode) {
        const brandObj = availableBrands.find(b => b.name === selectedBrand);
        const modelObj = brandObj?.popularModels.find(m => m.name === selectedModel);
        const variantObj = modelObj?.variants.find(v => v.name === selectedVariant);
        if (variantObj) {
          exShowroom = variantObj.exShowroomPrice;
        }
      }

      const cityObj = INDIAN_CITIES.find(c => c.id === selectedCityId) || INDIAN_CITIES[0];

      const valuationResult = calculateIndianCityRealPrice(
        category,
        activeBrand,
        activeModel,
        activeVariant,
        exShowroom,
        year,
        odometerKm,
        fuel,
        transmission,
        selectedCityId,
        condition,
        ownerSerial,
        insuranceValid,
        ['opt_ppf_coating']
      );

      const newUploadedVehicle: UploadedVehicle = {
        id: `upload-${Date.now()}`,
        title: `${year} ${activeBrand} ${activeModel}`,
        type: category,
        brand: activeBrand,
        model: activeModel,
        variant: activeVariant,
        year,
        registrationNumber: regNumber.toUpperCase(),
        rtoState: cityObj.stateName,
        rtoCity: cityObj.name,
        odometerKm,
        fuel,
        transmission,
        ownerSerial,
        condition,
        insuranceValidity: insuranceValid ? 'Comprehensive Insurance Active' : 'Third Party / Expired',
        images: images.length > 0 ? images : ['/src/assets/images/hero_automotive_luxury_1792487597695.jpg'],
        notes,
        valuation: valuationResult,
        uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      };

      onVehicleUploaded(newUploadedVehicle);
      setIsProcessing(false);
      onClose();
    }, 700);
  };

  const currentBrandObj = availableBrands.find(b => b.name === selectedBrand);
  const currentModelObj = currentBrandObj?.popularModels.find(m => m.name === selectedModel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e131d] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">All 70+ Car & 20+ Bike Brands</span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Upload Your {category === 'car' ? 'Car' : 'Bike'} for Instant Appraisal</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleUploadSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Category Toggle: Car vs Bike */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
              1. Vehicle Classification
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => handleCategoryChange('car')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  category === 'car'
                    ? 'bg-white text-slate-950 border-white shadow-sm'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Car ({MASTER_CATALOG.carBrands.length} Brands)</span>
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange('bike')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  category === 'bike'
                    ? 'bg-white text-slate-950 border-white shadow-sm'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Bike ({MASTER_CATALOG.bikeBrands.length} Brands)</span>
              </button>
            </div>
          </div>

          {/* Photo Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
              2. Vehicle Photos (Front, Sides, Odometer & Engine)
            </label>
            <div className="border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl p-5 text-center bg-slate-950/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFile}
                className="hidden"
                id="vehicle-photo-upload"
              />
              <label
                htmlFor="vehicle-photo-upload"
                className="flex flex-col items-center justify-center cursor-pointer space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-white">
                  Click to choose photos from device or take camera shot
                </div>
                <div className="text-[11px] text-slate-400">
                  Instant live preview for valuation audit
                </div>
              </label>
            </div>

            {/* Uploaded Thumbnails Preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((imgSrc, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-700 group">
                    <img src={imgSrc} alt={`Vehicle upload ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-0.5 bg-black/80 rounded-full text-white hover:text-red-400 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Company, Model & Variant Selection */}
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                3. Choose from {availableBrands.length} Brands & Models
              </span>
              <button
                type="button"
                onClick={() => setCustomBrandMode(!customBrandMode)}
                className="text-xs text-blue-400 hover:underline cursor-pointer"
              >
                {customBrandMode ? 'Select from Brand List' : '+ Custom / Import Model'}
              </button>
            </div>

            {!customBrandMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Company / Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
                  >
                    {availableBrands.map(b => (
                      <option key={b.id} value={b.name}>{b.name} ({b.origin})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Model Name</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
                  >
                    {currentBrandObj?.popularModels.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Variant / Trim</label>
                  <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
                  >
                    {currentModelObj?.variants.map((v, i) => (
                      <option key={i} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Genesis"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GV80"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Variant</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luxury 3.5T AWD"
                    value={customVariant}
                    onChange={(e) => setCustomVariant(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Ex-Showroom (₹)</label>
                  <input
                    type="number"
                    step={10000}
                    value={customExShowroom}
                    onChange={(e) => setCustomExShowroom(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Registration, City, Odometer & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Registration Plate (RC)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DL 01 AB 1234"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono uppercase focus:outline-none focus:border-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                City & RTO
              </label>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                {INDIAN_CITIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.rtoCode})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Year of Registration
              </label>
              <input
                type="number"
                min={2010}
                max={2026}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Odometer (KM)
              </label>
              <input
                type="number"
                min={500}
                max={300000}
                step={500}
                value={odometerKm}
                onChange={(e) => setOdometerKm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 font-mono"
              />
            </div>
          </div>

          {/* Drivetrain & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Fuel Type</label>
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value as FuelType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG (Bi-Fuel)</option>
                <option value="Electric">Electric (EV)</option>
                <option value="Hybrid">Strong Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic (AT/CVT)">Automatic (AT/CVT)</option>
                <option value="AMT">AMT</option>
                <option value="DCT">DCT / DSG</option>
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

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionLevel)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="excellent">Excellent</option>
                <option value="very_good">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-md transition-colors shadow-md cursor-pointer flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Computing Fair Resale Value...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>Upload & Generate Certificate</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

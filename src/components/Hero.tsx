import React from 'react';
import carHeroImage from '../assets/images/hero_automotive_luxury_1792487597695.jpg';
import bikeHeroImage from '../assets/images/academy_sportbike_studio_1792487899383.jpg';
import { VehicleCategory } from '../types/valuation';
import { Car, Bike, Upload, Search, MapPin } from 'lucide-react';
import { INDIAN_CITIES } from '../data/massiveVehiclesData';

interface HeroProps {
  activeCategory: VehicleCategory;
  onSelectCategory: (category: VehicleCategory) => void;
  onExploreEngine: () => void;
  onOpenUploadModal: () => void;
  selectedCityId: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  activeCategory, 
  onSelectCategory, 
  onExploreEngine, 
  onOpenUploadModal,
  selectedCityId,
}) => {
  const currentCity = INDIAN_CITIES.find(c => c.id === selectedCityId) || INDIAN_CITIES[0];

  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Eyebrow without pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-4 tracking-wide uppercase">
          <span>AutoValuate India</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>70+ Car Brands (500+ Cars)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>20+ Bike Brands (200+ Bikes)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>50+ Cities in India</span>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          
          {/* Left Column: Narrative & Category Switcher */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-5"
              style={{ textWrap: 'balance' }}
            >
              Identify the Real Fair Market Price of Cars & Bikes Across India
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-6">
              Complete catalog across all 70+ car manufacturers (500+ cars) and 20+ two-wheeler brands (200+ bikes). Select your Indian city, enter odometer reading, or upload your vehicle photos and RC for instant certified valuation reports with fair prices.
            </p>

            {/* Category Selector Tabs */}
            <div className="flex items-center gap-2 mb-8 p-1.5 bg-slate-900/90 rounded-lg border border-slate-800 w-fit">
              <button
                onClick={() => onSelectCategory('car')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'car'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>All 70+ Car Brands (500+ Cars)</span>
              </button>
              <button
                onClick={() => onSelectCategory('bike')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'bike'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>All 20+ Bike Brands (200+ Bikes)</span>
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenUploadModal}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-md cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload My Car / Bike for Real Price</span>
              </button>
              <button
                onClick={onExploreEngine}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Instant Resale Calculator in {currentCity.name}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                src={activeCategory === 'car' ? carHeroImage : bikeHeroImage}
                alt={activeCategory === 'car' ? 'Indian automotive lab vehicle appraisal' : 'Indian motorcycle technical workshop'}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-800">
                <span className="font-semibold text-white">
                  {activeCategory === 'car' ? '2023 Mahindra Thar LX 4x4' : '2024 Royal Enfield Continental GT 650'}
                </span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  {activeCategory === 'car' ? '₹14.20 Lakh Fair Price' : '₹2.85 Lakh Fair Price'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Metric Full-Width Proof Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800/80">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              70+ Car Brands
            </div>
            <div className="text-xs text-slate-400 mt-1">
              500+ Indian & imported models
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-400 tabular-nums">
              20+ Bike Brands
            </div>
            <div className="text-xs text-slate-400 mt-1">
              200+ motorcycles & scooters
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              50+ Indian Cities
            </div>
            <div className="text-xs text-slate-400 mt-1">
              RTO tax and city demand adjustments
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              Photo & RC Upload
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Instant valuation certificate generator
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

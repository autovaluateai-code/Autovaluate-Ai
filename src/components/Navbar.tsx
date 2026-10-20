import React from 'react';
import { Upload, MapPin } from 'lucide-react';
import { INDIAN_CITIES } from '../data/massiveVehiclesData';

interface NavbarProps {
  onStartValuation: () => void;
  onSelectCategory: (category: 'car' | 'bike') => void;
  onOpenUploadModal: () => void;
  onGoToGarage: () => void;
  onGoToCatalog: () => void;
  selectedCityId: string;
  onSelectCityId: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartValuation,
  onSelectCategory,
  onOpenUploadModal,
  onGoToGarage,
  onGoToCatalog,
  selectedCityId,
  onSelectCityId,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <a 
            href="#" 
            className="text-lg font-bold tracking-tight text-white hover:text-slate-200 transition-colors whitespace-nowrap shrink-0"
          >
            AutoValuate India
          </a>

          {/* Quick City Switcher in Navbar */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-xs">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <select
              value={selectedCityId}
              onChange={(e) => onSelectCityId(e.target.value)}
              className="bg-transparent text-slate-200 text-[11px] font-medium focus:outline-none cursor-pointer pr-1"
            >
              {INDIAN_CITIES.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-950 text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <a href="#valuation-engine" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Valuation Engine
          </a>
          <button 
            onClick={onGoToCatalog} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-left bg-transparent border-0 cursor-pointer text-slate-300 text-sm font-medium"
          >
            All 70+ Brands
          </button>
          <a href="#capstone-studio" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Streamlit ML Studio</span>
          </a>
          <button 
            onClick={onGoToGarage}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-left bg-transparent border-0 cursor-pointer text-slate-300 text-sm font-medium"
          >
            My Garage
          </button>
          <a href="#google-indexing" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Google Indexing
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenUploadModal}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload My Car / Bike</span>
          </button>
        </div>
      </div>
    </header>
  );
};

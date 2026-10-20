import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#080b11] border-t border-slate-800 text-xs text-slate-400 no-print">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <span className="text-base font-bold text-white tracking-tight">AutoValuate Academy</span>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Automotive & Motorcycle Technical Valuation Laboratory. Dedicated to educating students and community members on identifying fair, real-world market values.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a href="#valuation-engine" className="hover:text-white transition-colors">Valuation Engine</a>
            <a href="#google-indexing" className="hover:text-white transition-colors">Google Schema</a>
            <a href="#student-lab" className="hover:text-white transition-colors">Campus Workshop</a>
            <a href="#market-intelligence" className="hover:text-white transition-colors">Methodology</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} AutoValuate Academy of Automotive Science. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Schema.org Microdata Verified</span>
            <span aria-hidden="true">·</span>
            <span>Non-Commercial Educational Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

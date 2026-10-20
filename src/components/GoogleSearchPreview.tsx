import React, { useState } from 'react';
import { Search, Globe, CheckCircle2, Copy, Check } from 'lucide-react';

export const GoogleSearchPreview: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const jsonLdCode = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "name": "AutoValuate India Academy of Automotive Science",
      "description": "Indian school laboratory identifying real resale market prices of cars and bikes across all RTO states.",
      "url": "https://autovaluate.in"
    },
    {
      "@type": "WebApplication",
      "name": "Indian Car & Bike Real Price & Upload Engine",
      "applicationCategory": "AutomotiveApplication",
      "operatingSystem": "All",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "8450"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    }
  ]
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonLdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="google-indexing" className="py-16 md:py-20 border-t border-slate-800/80 bg-[#090d14]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              04. Google India Indexing & SEO Setup
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Google India Search Snippet Preview (google.co.in)
            </h2>
          </div>
          <div className="text-xs text-slate-400 max-w-sm">
            Optimized for Indian search queries such as "used car valuation India", "Thar resale price", "Royal Enfield used price", and "RTO vehicle valuation".
          </div>
        </div>

        {/* 2-Column: Left Google SERP Simulation, Right JSON-LD Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Google Search Result Card (Realistic Google SERP view) */}
          <div className="lg:col-span-6 bg-white dark:bg-[#1f232b] p-6 rounded-xl border border-slate-700/60 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/40 text-xs text-slate-400">
              <Search className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-slate-300">Google India (Desktop & Mobile SERP)</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Target Region: India (IN)</span>
            </div>

            {/* Google Result Item */}
            <div className="space-y-1.5 font-sans">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                  AV
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">AutoValuate India</span>
                  <span className="text-[11px] text-slate-400 font-mono">https://autovaluate.in/pricing</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-medium text-blue-400 hover:underline cursor-pointer leading-snug pt-1">
                AutoValuate India — Real Car & Bike Resale Price Calculator | Upload Your Vehicle
              </h3>

              {/* Rich Snippet Stars */}
              <div className="flex items-center gap-2 text-xs text-slate-300 pt-0.5">
                <span className="text-amber-400 font-mono font-bold">★★★★★ 4.9</span>
                <span className="text-slate-400 font-mono">(8,450 Indian appraisals)</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-emerald-400 font-medium">Free RTO Valuation</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                Calculate the real market resale price of cars and bikes across India. Covers Maruti Suzuki, Hyundai, Tata, Mahindra, Toyota, Royal Enfield & all variants with RTO state valuation and vehicle photo upload.
              </p>

              {/* Sitelinks Strip in Google snippet */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50 mt-3 text-xs">
                <div>
                  <div className="text-blue-400 font-medium hover:underline cursor-pointer">Indian Car Companies & Trims</div>
                  <div className="text-[11px] text-slate-400">Tata Nexon, Thar Roxx, Creta, Swift, Fortuner prices in Lakhs.</div>
                </div>
                <div>
                  <div className="text-blue-400 font-medium hover:underline cursor-pointer">Upload Vehicle Photos & RC</div>
                  <div className="text-[11px] text-slate-400">Upload photos and RC number for forensic AI valuation.</div>
                </div>
                <div>
                  <div className="text-blue-400 font-medium hover:underline cursor-pointer">Indian Bike Resale Values</div>
                  <div className="text-[11px] text-slate-400">Royal Enfield Classic, Hunter, Yamaha MT-15, Apache RTR.</div>
                </div>
                <div>
                  <div className="text-blue-400 font-medium hover:underline cursor-pointer">RTO State Tax Adjustments</div>
                  <div className="text-[11px] text-slate-400">Delhi (DL), Maharashtra (MH), Karnataka (KA), Tamil Nadu (TN).</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Schema.org (JSON-LD) Inspector */}
          <div className="lg:col-span-6 bg-slate-900/70 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Schema.org (JSON-LD) in INR Currency
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON-LD'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
              {jsonLdCode}
            </pre>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-slate-950/60 rounded border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Google Locale Tag</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">en_IN (English - India)</div>
                </div>
              </div>
              <div className="p-3 bg-slate-950/60 rounded border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Currency Protocol</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">INR (₹ Indian Rupee)</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

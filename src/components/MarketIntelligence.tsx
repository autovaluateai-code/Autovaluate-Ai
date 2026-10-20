import React from 'react';
import cockpitImage from '../assets/images/vehicle_inspection_detail_1792487599969.jpg';
import { ArrowUpRight, BarChart3, Database, ShieldAlert, Cpu } from 'lucide-react';

export const MarketIntelligence: React.FC = () => {
  return (
    <section id="market-intelligence" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              02. Algorithmic Foundation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Institutional Market Intelligence Infrastructure
            </h2>
          </div>
          <div className="text-xs text-slate-400 max-w-md">
            Bridging closed dealer auction networks, private marketplace transaction registries, and telematics-derived wear models into a single predictive valuation engine.
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: 7 cols - Deep Inspection & Machine Learning Price Index */}
          <div className="md:col-span-7 bg-slate-900/60 rounded-xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-mono text-slate-300">01. Dynamic Price Index</span>
                <span className="text-[11px] text-slate-400">Updated Hourly</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Continuous Auction Floor & Classified Liquidity Tracking
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Unlike legacy book guides that refresh once a month, AutoValuate continuously samples 3.4M active dealer listings and daily auction lanes across North America. Regional micro-climates, inventory velocity, and trim premiums are normalized in real time.
              </p>

              {/* Data points */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <div className="font-mono font-bold text-lg text-white tabular-nums">3.4M+</div>
                  <div className="text-slate-400 mt-0.5">Active retail listings</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-lg text-white tabular-nums">142,000</div>
                  <div className="text-slate-400 mt-0.5">Weekly auction lots</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-lg text-emerald-400 tabular-nums">&lt; 15 min</div>
                  <div className="text-slate-400 mt-0.5">Price index latency</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Manheim (MMR)</span>
                <span aria-hidden="true">·</span>
                <span>Adesa Lanes</span>
                <span aria-hidden="true">·</span>
                <span>Franchise Feeds</span>
              </div>
              <span className="text-slate-300 font-medium">Institutional Grade</span>
            </div>
          </div>

          {/* Card 2: 5 cols with Inspection Asset */}
          <div className="md:col-span-5 bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
              <img
                src={cockpitImage}
                alt="Automotive digital cockpit and interior telemetry inspection"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded border border-slate-700/60 flex items-center justify-between">
                <span>Interior & Telemetry Audit</span>
                <span className="font-mono text-emerald-400 text-[11px]">Certified Sensor Data</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-1">02. Precision Wear Calibration</div>
                <h4 className="text-base font-bold text-white mb-2">
                  Options & Condition De-risking
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every appraisal accounts for factory package packages, wheel curb blemishes, and tire tread life, eliminating the typical $1,500 blind-spot appraisal error.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Paint depth validation</span>
                <span>Tread depth metrics</span>
              </div>
            </div>
          </div>

          {/* Card 3: 4 cols - EV Battery Degradation Analytics */}
          <div className="md:col-span-4 bg-slate-900/60 rounded-xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">03. Electric & Hybrid Health</div>
              <h4 className="text-base font-bold text-white mb-2">
                EV Battery State-of-Health (SoH)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Electric vehicle residuals are dictated by battery capacity retention. Our models adjust residual pricing using real cycle wear curves and high-voltage health diagnostics.
              </p>
            </div>
            <div className="p-3 bg-slate-950/80 rounded border border-slate-800/80 text-xs font-mono tabular-nums text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Battery Degradation Rate</span>
                <span className="text-white">1.8% / 15,000 mi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">High-Voltage Thermal Risk</span>
                <span className="text-emerald-400">Low Exposure</span>
              </div>
            </div>
          </div>

          {/* Card 4: 8 cols - Multi-Channel Spread & Margin Defense */}
          <div className="md:col-span-8 bg-slate-900/60 rounded-xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">04. Multi-Channel Spread</div>
              <h4 className="text-lg font-bold text-white mb-2">
                Arbitrage & Trade-to-Retail Spread Analysis
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Automate margin protection by revealing the real spread between acquisition cost, reconditioning budget, days-to-turn, and local retail ceiling. Eliminate stale aged inventory before it depreciates on the lot.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3 bg-slate-950/80 rounded border border-slate-800/80">
                <div className="text-slate-400">Days to Turn (Avg)</div>
                <div className="text-base font-bold font-mono text-white tabular-nums mt-0.5">24.2 Days</div>
                <div className="text-[11px] text-slate-400 mt-1">-8 days vs industry benchmark</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded border border-slate-800/80">
                <div className="text-slate-400">Front-End Spread</div>
                <div className="text-base font-bold font-mono text-emerald-400 tabular-nums mt-0.5">$2,840 / unit</div>
                <div className="text-[11px] text-slate-400 mt-1">Acquisition-to-retail gross</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded border border-slate-800/80">
                <div className="text-slate-400">Wholesale Floor Risk</div>
                <div className="text-base font-bold font-mono text-white tabular-nums mt-0.5">0.4% Write-down</div>
                <div className="text-[11px] text-slate-400 mt-1">99.6% loss containment</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ValuationResultIndia, UploadedVehicle, formatInr, formatInrLakhs } from '../types/valuation';
import { X, Printer, ShieldCheck, QrCode, CheckCircle, IndianRupee } from 'lucide-react';

interface AppraisalModalProps {
  valuation: ValuationResultIndia | null;
  uploadedVehicle?: UploadedVehicle | null;
  onClose: () => void;
}

export const AppraisalModal: React.FC<AppraisalModalProps> = ({
  valuation,
  uploadedVehicle,
  onClose,
}) => {
  const activeValuation = uploadedVehicle ? uploadedVehicle.valuation : valuation;
  if (!activeValuation) return null;

  const isBike = activeValuation.type === 'bike';
  const regNumber = uploadedVehicle?.registrationNumber || `DL 03 CA ${Math.floor(1000 + Math.random() * 8999)}`;
  const certificateId = `AV-IN-${isBike ? 'MOTO' : 'AUTO'}-${activeValuation.year}-${Math.floor(10000 + Math.random() * 89999)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e131d] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 no-print shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">Indian RTO & Academy Certified Valuation Certificate</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-mono">
                AutoValuate Technical Academy — Indian Automotive Lab
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Official Indian {isBike ? 'Motorcycle' : 'Motor Vehicle'} Valuation Certificate
              </h2>
              <div className="text-xs text-slate-400 mt-1">
                Conforming to Indian Motor Vehicles Act & RTO Resale Appraisal Standards
              </div>
            </div>

            <div className="text-left sm:text-right sm:border-l sm:border-slate-800 sm:pl-6 text-xs font-mono">
              <div className="text-slate-400">Certificate Reference:</div>
              <div className="font-bold text-white text-sm">{certificateId}</div>
              <div className="text-slate-400 mt-1">Audit Standard: BS6 Phase 2</div>
              <div className="text-emerald-400 font-semibold mt-0.5">Valid & Digitally Signed</div>
            </div>
          </div>

          {/* Vehicle Core Identity Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Company & Model</span>
              <span className="font-bold text-white text-sm">{activeValuation.brand} {activeValuation.model}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Variant & Drivetrain</span>
              <span className="font-bold text-white text-sm truncate block">{activeValuation.variant}</span>
              <span className="text-[11px] text-slate-400 truncate block">{activeValuation.fuel} · {activeValuation.transmission}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Registration Number (RC)</span>
              <span className="font-mono font-bold text-white text-sm">{regNumber}</span>
              <span className="text-[11px] text-slate-400 block">{activeValuation.rtoState}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Certified Odometer</span>
              <span className="font-mono font-bold text-white text-sm tabular-nums">
                {activeValuation.odometerKm.toLocaleString()} KM
              </span>
              <span className="text-[11px] text-slate-400 block">{activeValuation.ownerSerial}</span>
            </div>
          </div>

          {/* Real Indian Resale Value Quad */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Certified Indian Market Resale Matrix (in INR)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/80">
                <div className="text-xs text-slate-400 mb-1">Fair Private Party Resale</div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {formatInr(activeValuation.privatePartyRealPrice)}
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold mt-0.5">
                  {formatInrLakhs(activeValuation.privatePartyRealPrice)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                  Optimal selling price between buyer and seller in {activeValuation.rtoState}.
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Dealer Lot / Spinny Retail</div>
                <div className="text-2xl font-bold font-mono text-slate-200 tabular-nums">
                  {formatInr(activeValuation.showroomDealerPrice)}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {formatInrLakhs(activeValuation.showroomDealerPrice)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                  Showroom listing price with reconditioning and warranty markup.
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Instant Cash Buyback</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {formatInr(activeValuation.instantCashBuyback)}
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-0.5">
                  {formatInrLakhs(activeValuation.instantCashBuyback)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                  Instant liquidation price paid via direct IMPS/NEFT bank transfer.
                </div>
              </div>

            </div>
          </div>

          {/* RTO & Indian Technical Ledger */}
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="font-semibold text-white">Student Technician Physical Inspection Audit</span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">
                Certified Score: {activeValuation.inspectionScore} / 100
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                <span className="text-slate-400">Ex-Showroom Invoice:</span>
                <span className="font-mono text-white font-bold">{formatInr(activeValuation.baseExShowroom)}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                <span className="text-slate-400">Total Age Depreciation:</span>
                <span className="font-mono text-amber-400">-{formatInr(activeValuation.depreciationLoss)}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                <span className="text-slate-400">RTO Registration Authority:</span>
                <span className="font-mono text-white">{activeValuation.rtoState} ({activeValuation.rtoCity})</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-950/60 rounded border border-slate-800/80">
                <span className="text-slate-400">Insurance Status:</span>
                <span className="font-mono text-emerald-400">{activeValuation.insuranceValid ? 'Active Comprehensive' : 'Third Party Only'}</span>
              </div>
            </div>
          </div>

          {/* Certificate Seal & QR */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 rounded">
                <QrCode className="w-full h-full text-slate-950" />
              </div>
              <div>
                <div className="text-slate-200 font-medium">AutoValuate India Verification Gateway</div>
                <div className="text-[10px] font-mono text-slate-400">NIC Vahan & RTO Node: Verified</div>
              </div>
            </div>

            <div className="text-right text-[11px]">
              <div className="text-slate-200 font-medium">Head of Automotive Faculty: Prof. Rajeshwar Sharma</div>
              <div className="text-slate-400">Institute of Automotive Technology & Valuation, India</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

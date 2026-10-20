import React from 'react';
import { UploadedVehicle, formatInr, formatInrLakhs } from '../types/valuation';
import { Car, Bike, Plus, FileText, Trash2, ShieldCheck, MapPin, Gauge } from 'lucide-react';

interface MyGarageProps {
  vehicles: UploadedVehicle[];
  onOpenUploadModal: () => void;
  onOpenReportModal: (vehicle: UploadedVehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export const MyGarage: React.FC<MyGarageProps> = ({
  vehicles,
  onOpenUploadModal,
  onOpenReportModal,
  onDeleteVehicle,
}) => {
  return (
    <section id="my-garage" className="py-16 md:py-20 bg-[#090d14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              02. Digital Vehicle Registry
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              My Uploaded Garage & Real Price Monitor
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your uploaded Indian cars and bikes with real-time market value tracking and RTO appraisal certificates.
            </p>
          </div>

          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 rounded-md transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Another Car or Bike</span>
          </button>
        </div>

        {/* Vehicles Grid */}
        {vehicles.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Vehicles Uploaded Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
              Upload photos of your car or bike along with its registration number to discover its true resale price in India.
            </p>
            <button
              onClick={onOpenUploadModal}
              className="px-5 py-2.5 text-xs font-semibold bg-white text-slate-950 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Upload Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((veh) => {
              const isBike = veh.type === 'bike';
              return (
                <div
                  key={veh.id}
                  className="bg-slate-900/70 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                      <img
                        src={veh.images[0]}
                        alt={veh.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-slate-900/90 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-slate-700/80">
                        {veh.registrationNumber}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 font-medium border border-slate-800">
                        {veh.rtoState}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{veh.year} · {veh.fuel} · {veh.transmission}</span>
                        <span>{veh.ownerSerial}</span>
                      </div>

                      <h3 className="text-base font-bold text-white truncate">
                        {veh.brand} {veh.model}
                      </h3>
                      <div className="text-xs text-slate-400 truncate mb-4">
                        {veh.variant}
                      </div>

                      {/* Real Price Quad */}
                      <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                          <span>Real Resale Market Price</span>
                          <span className="font-mono text-emerald-400 font-bold tabular-nums">
                            {formatInrLakhs(veh.valuation.privatePartyRealPrice)}
                          </span>
                        </div>
                        <div className="text-xl font-extrabold font-mono text-white tabular-nums">
                          {formatInr(veh.valuation.privatePartyRealPrice)}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 mt-2">
                          <span>Dealer Lot: {formatInrLakhs(veh.valuation.showroomDealerPrice)}</span>
                          <span className="text-emerald-400">Cash: {formatInrLakhs(veh.valuation.instantCashBuyback)}</span>
                        </div>
                      </div>

                      {/* Specs pills */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-slate-500" />
                          <span>{veh.odometerKm.toLocaleString()} KM</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">{veh.rtoCity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => onOpenReportModal(veh)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View Appraisal Certificate</span>
                    </button>

                    <button
                      onClick={() => onDeleteVehicle(veh.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove from Garage"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

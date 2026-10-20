import React, { useState } from 'react';
import { Wrench, Award, CheckCircle2, Send, GraduationCap } from 'lucide-react';

export const StudentLab: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    vehicleType: 'car',
    vehicleDetails: '',
    preferredDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="student-lab" className="py-16 md:py-24 bg-[#0a0e16]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              03. Hands-On Academic Training
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Student Automotive & Motorcycle Inspection Laboratory
            </h2>
          </div>
          <div className="text-xs text-slate-400 max-w-sm">
            Bridging technical classroom theory with physical appraisal audits on campus. Supervised by Master ASE technicians and university engineering faculty.
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 mb-4">
              <Wrench className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              100-Point Mechanical Audit
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Students inspect engine compression, brake hydraulic pressures, suspension bushings, and computerized OBD-II CAN bus logs to pinpoint hidden faults that deflate vehicle value.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 mb-4">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Certified Academy Stamp
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every inspected car and motorcycle receives an official cryptographic certificate signed by faculty, allowing students and community sellers to transact with full transparency.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200 mb-4">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Student Trade-in & Buyback
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A university community program facilitating fair-price vehicle transfers between students, avoiding predatory third-party dealer markups and financing traps.
            </p>
          </div>

        </div>

        {/* Campus Inspection Booking Form */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Book a Free Physical Inspection at the School Workshop
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Bring your car or bike to the campus automotive bay. Our senior technicians and students will run a complete diagnostic scan and print your official certified valuation certificate.
            </p>

            {submitted ? (
              <div className="p-6 bg-slate-900 rounded-xl border border-emerald-500/40 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Inspection Slot Reserved</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Thank you, {formData.ownerName || 'Student'}! A confirmation email and campus gate pass instructions have been dispatched to {formData.email || 'your email'}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Schedule Another Vehicle
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">School / Personal Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@academy.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Vehicle Classification</label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
                    >
                      <option value="car">Car / Sedan / SUV / EV</option>
                      <option value="bike">Motorcycle / Sportbike / Cruiser</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Year, Make & Model</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2022 Kawasaki Ninja 400"
                      value={formData.vehicleDetails}
                      onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Lab Date</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-slate-400 cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reserve Campus Workshop Slot</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

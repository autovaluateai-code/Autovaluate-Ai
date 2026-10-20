import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AdvanceVehicleExplorer } from './components/AdvanceVehicleExplorer';
import { ValuationEngine } from './components/ValuationEngine';
import { MyGarage } from './components/MyGarage';
import { UploadVehicleModal } from './components/UploadVehicleModal';
import { MarketIntelligence } from './components/MarketIntelligence';
import { GoogleSearchPreview } from './components/GoogleSearchPreview';
import { StudentLab } from './components/StudentLab';
import { StreamlitCapstoneStudio } from './components/StreamlitCapstoneStudio';
import { Footer } from './components/Footer';
import { AppraisalModal } from './components/AppraisalModal';
import {
  VehicleCategory,
  ValuationResultIndia,
  UploadedVehicle,
} from './types/valuation';
import { calculateIndianCityRealPrice } from './data/massiveVehiclesData';
import carHeroImage from './assets/images/hero_automotive_luxury_1792487597695.jpg';
import bikeHeroImage from './assets/images/academy_sportbike_studio_1792487899383.jpg';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('car');
  const [selectedCityId, setSelectedCityId] = useState<string>('delhi-ncr');
  const [presetModel, setPresetModel] = useState<{ brand: string; model: string } | null>(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [activeReportModal, setActiveReportModal] = useState<ValuationResultIndia | null>(null);
  const [activeUploadedVehicle, setActiveUploadedVehicle] = useState<UploadedVehicle | null>(null);

  // Initial sample uploaded vehicles in Indian garage
  const [uploadedVehicles, setUploadedVehicles] = useState<UploadedVehicle[]>([
    {
      id: 'demo-thar-2023',
      title: '2023 Mahindra Thar LX 4x4 Hard Top',
      type: 'car',
      brand: 'Mahindra',
      model: 'Thar 4x4 (3-Door)',
      variant: 'Thar 4x4 (3-Door) Top / Tech Petrol Automatic (AT/CVT)',
      year: 2023,
      registrationNumber: 'DL 08 CA 9182',
      rtoState: 'Delhi',
      rtoCity: 'New Delhi / NCR',
      odometerKm: 21500,
      fuel: 'Petrol',
      transmission: 'Automatic (AT/CVT)',
      ownerSerial: '1st Owner',
      condition: 'very_good',
      insuranceValidity: 'Comprehensive Zero-Dep Active until Nov 2027',
      images: [carHeroImage],
      notes: 'Single hand doctor driven, zero off-road abuse, company serviced at Mahindra Sterling.',
      valuation: calculateIndianCityRealPrice(
        'car',
        'Mahindra',
        'Thar 4x4 (3-Door)',
        'Thar 4x4 (3-Door) Top / Tech Petrol Automatic (AT/CVT)',
        1760000,
        2023,
        21500,
        'Petrol',
        'Automatic (AT/CVT)',
        'delhi-ncr',
        'very_good',
        '1st Owner',
        true,
        []
      ),
      uploadedAt: '20 Oct 2026',
    },
    {
      id: 'demo-re-gt650',
      title: '2024 Royal Enfield Continental GT 650',
      type: 'bike',
      brand: 'Royal Enfield',
      model: 'Continental GT 650',
      variant: 'Continental GT 650 Top / Tech Petrol Manual',
      year: 2024,
      registrationNumber: 'MH 02 ER 4409',
      rtoState: 'Maharashtra',
      rtoCity: 'Mumbai',
      odometerKm: 4200,
      fuel: 'Petrol',
      transmission: 'Manual',
      ownerSerial: '1st Owner',
      condition: 'excellent',
      insuranceValidity: '5-Year Bumper to Bumper Active',
      images: [bikeHeroImage],
      notes: 'Showroom condition, parked in covered garage, factory Red Rooster exhaust fitted by dealer.',
      valuation: calculateIndianCityRealPrice(
        'bike',
        'Royal Enfield',
        'Continental GT 650',
        'Continental GT 650 Top / Tech Petrol Manual',
        345000,
        2024,
        4200,
        'Petrol',
        'Manual',
        'mumbai',
        'excellent',
        '1st Owner',
        true,
        []
      ),
      uploadedAt: '18 Oct 2026',
    }
  ]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartValuation = () => {
    scrollToSection('valuation-engine');
  };

  const handleCategorySelect = (category: VehicleCategory) => {
    setActiveCategory(category);
    scrollToSection('valuation-engine');
  };

  const handleSelectModelFromExplorer = (
    type: VehicleCategory,
    brandName: string,
    modelName: string,
    cityId: string
  ) => {
    setActiveCategory(type);
    setSelectedCityId(cityId);
    setPresetModel({ brand: brandName, model: modelName });
    scrollToSection('valuation-engine');
  };

  const handleVehicleUploaded = (newVehicle: UploadedVehicle) => {
    setUploadedVehicles(prev => [newVehicle, ...prev]);
    setActiveUploadedVehicle(newVehicle);
    setActiveReportModal(null);
    scrollToSection('my-garage');
  };

  const handleDeleteVehicle = (id: string) => {
    setUploadedVehicles(prev => prev.filter(v => v.id !== id));
  };

  const handleOpenReportFromGarage = (vehicle: UploadedVehicle) => {
    setActiveUploadedVehicle(vehicle);
    setActiveReportModal(null);
  };

  const handleOpenReportFromCalculator = (val: ValuationResultIndia) => {
    setActiveReportModal(val);
    setActiveUploadedVehicle(null);
  };

  const handleCloseReportModal = () => {
    setActiveReportModal(null);
    setActiveUploadedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-slate-700 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        onStartValuation={handleStartValuation}
        onSelectCategory={handleCategorySelect}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onGoToGarage={() => scrollToSection('my-garage')}
        onGoToCatalog={() => scrollToSection('vehicle-catalog')}
        selectedCityId={selectedCityId}
        onSelectCityId={setSelectedCityId}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onExploreEngine={handleStartValuation}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          selectedCityId={selectedCityId}
        />

        {/* 70+ Car Brands & 20+ Bike Brands Massive Database Explorer */}
        <AdvanceVehicleExplorer
          onSelectModelForValuation={handleSelectModelFromExplorer}
          selectedCityId={selectedCityId}
          onSelectCityId={setSelectedCityId}
        />

        {/* Python Streamlit Capstone Machine Learning Studio */}
        <StreamlitCapstoneStudio />

        {/* Real Indian Fair Price Valuation Engine */}
        <ValuationEngine
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenReportModal={handleOpenReportFromCalculator}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          selectedCityId={selectedCityId}
          onSelectCityId={setSelectedCityId}
          presetModel={presetModel}
        />

        {/* Uploaded Garage & Real Price Monitor */}
        <MyGarage
          vehicles={uploadedVehicles}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onOpenReportModal={handleOpenReportFromGarage}
          onDeleteVehicle={handleDeleteVehicle}
        />

        {/* Algorithmic Foundation & Bento Grid */}
        <MarketIntelligence />

        {/* Google India SEO & Rich Snippet Indexing Inspector */}
        <GoogleSearchPreview />

        {/* Student Automotive & Motorcycle Lab */}
        <StudentLab />
      </main>

      {/* Footer */}
      <Footer />

      {/* Upload Vehicle Modal */}
      <UploadVehicleModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVehicleUploaded={handleVehicleUploaded}
        defaultCityId={selectedCityId}
      />

      {/* Official Certified Appraisal Certificate Modal */}
      <AppraisalModal
        valuation={activeReportModal}
        uploadedVehicle={activeUploadedVehicle}
        onClose={handleCloseReportModal}
      />
    </div>
  );
}

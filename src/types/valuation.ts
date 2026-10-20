export type VehicleCategory = 'car' | 'bike';
export type ConditionLevel = 'excellent' | 'very_good' | 'good' | 'fair';
export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid';
export type TransmissionType = 'Manual' | 'Automatic (AT/CVT)' | 'AMT' | 'DCT' | 'iMT';
export type OwnerSerial = '1st Owner' | '2nd Owner' | '3rd Owner' | '4th+ Owner';

export interface IndianCity {
  id: string;
  name: string;
  stateCode: string;
  stateName: string;
  rtoCode: string;
  taxPremiumFactor: number; // e.g. 1.08 for Bengaluru (KA) vs 0.96 for Delhi (DL)
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
}

export interface VehicleVariant {
  name: string;
  exShowroomPrice: number; // in INR
  fuel: FuelType;
  transmission: TransmissionType;
  engineSpecs: string;
}

export interface IndianVehicleModel {
  id: string;
  name: string;
  brand: string;
  type: VehicleCategory;
  bodyType: string;
  exShowroomRange: [number, number];
  variants: VehicleVariant[];
}

export interface IndianBrand {
  id: string;
  name: string;
  origin: string;
  type: VehicleCategory;
  modelCount: number;
  popularModels: IndianVehicleModel[];
}

export interface VehicleOption {
  id: string;
  name: string;
  valueImpactInr: number;
  category: 'feature' | 'condition';
  vehicleType?: VehicleCategory | 'both';
}

export interface MarketCompIndia {
  regNumberOrId: string;
  dealerOrPlatform: string;
  rtoCity: string;
  priceInr: number;
  mileageKm: number;
  daysOnMarket: number;
  variant: string;
  fuel: FuelType;
}

export interface DepreciationPointIndia {
  year: number;
  residualPercent: number;
  estimatedValueInr: number;
}

export interface ValuationResultIndia {
  type: VehicleCategory;
  brand: string;
  model: string;
  variant: string;
  year: number;
  fuel: FuelType;
  transmission: TransmissionType;
  rtoState: string;
  rtoCity: string;
  rtoCode: string;
  odometerKm: number;
  condition: ConditionLevel;
  ownerSerial: OwnerSerial;
  insuranceValid: boolean;
  selectedOptions: string[];
  
  // Real Price Identifiers in INR
  privatePartyRealPrice: number;
  showroomDealerPrice: number;
  instantCashBuyback: number;
  exchangeBonusValue: number;
  
  // Breakdown adjustments
  baseExShowroom: number;
  depreciationLoss: number;
  mileageAdjustment: number;
  conditionAdjustment: number;
  rtoAdjustment: number;
  ownerAdjustment: number;
  optionsAdjustment: number;
  
  // Scoring & Timeline
  inspectionScore: number;
  depreciationSchedule: DepreciationPointIndia[];
  comps: MarketCompIndia[];
  confidenceScore: number;
}

export interface UploadedVehicle {
  id: string;
  title: string;
  type: VehicleCategory;
  brand: string;
  model: string;
  variant: string;
  year: number;
  registrationNumber: string;
  rtoState: string;
  rtoCity: string;
  odometerKm: number;
  fuel: FuelType;
  transmission: TransmissionType;
  ownerSerial: OwnerSerial;
  condition: ConditionLevel;
  insuranceValidity: string;
  images: string[];
  notes: string;
  valuation: ValuationResultIndia;
  uploadedAt: string;
}

// Indian Rupee formatting helpers
export function formatInr(amount: number): string {
  if (isNaN(amount)) return '₹0';
  const absAmount = Math.abs(Math.round(amount));
  const sign = amount < 0 ? '-' : '';

  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(absAmount);

  return `${sign}₹${formatted}`;
}

export function formatInrLakhs(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0';
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absAmount >= 10000000) {
    const cr = (absAmount / 10000000).toFixed(2);
    return `${sign}₹${cr} Cr`;
  }
  if (absAmount >= 100000) {
    const lakh = (absAmount / 100000).toFixed(2);
    return `${sign}₹${lakh} Lakh`;
  }
  return formatInr(amount);
}

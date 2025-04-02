export interface Material {
  id: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
  unit: string;
}

export interface Labor {
  rateType: 'hourly' | 'fixed';
  rate: number;
  hours?: number;
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface Estimate {
  id: string;
  projectName: string;
  clientName?: string;
  materials: Material[];
  labor: Labor;
  dimensions?: Dimensions;
  taxRate: number;
  notes?: string;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateFormData {
  projectName: string;
  clientName?: string;
  materials: Material[];
  labor: Labor;
  dimensions?: Dimensions;
  taxRate: number;
  notes?: string;
}
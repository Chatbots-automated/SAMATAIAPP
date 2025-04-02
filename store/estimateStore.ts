import { create } from 'zustand';
import { Estimate, EstimateFormData } from '@/types/estimate';

interface EstimateStore {
  estimates: Estimate[];
  addEstimate: (estimate: EstimateFormData) => void;
  updateEstimate: (id: string, estimate: EstimateFormData) => void;
  deleteEstimate: (id: string) => void;
  duplicateEstimate: (id: string) => void;
}

export const useEstimateStore = create<EstimateStore>((set) => ({
  estimates: [],
  addEstimate: (estimateData) => {
    const newEstimate: Estimate = {
      id: Math.random().toString(36).substring(7),
      ...estimateData,
      totalCost: calculateTotalCost(estimateData),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      estimates: [newEstimate, ...state.estimates],
    }));
  },
  updateEstimate: (id, estimateData) => {
    set((state) => ({
      estimates: state.estimates.map((estimate) =>
        estimate.id === id
          ? {
              ...estimate,
              ...estimateData,
              totalCost: calculateTotalCost(estimateData),
              updatedAt: new Date().toISOString(),
            }
          : estimate
      ),
    }));
  },
  deleteEstimate: (id) => {
    set((state) => ({
      estimates: state.estimates.filter((estimate) => estimate.id !== id),
    }));
  },
  duplicateEstimate: (id) => {
    set((state) => {
      const estimateToDuplicate = state.estimates.find((e) => e.id === id);
      if (!estimateToDuplicate) return state;

      const duplicatedEstimate: Estimate = {
        ...estimateToDuplicate,
        id: Math.random().toString(36).substring(7),
        projectName: `${estimateToDuplicate.projectName} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        estimates: [duplicatedEstimate, ...state.estimates],
      };
    });
  },
}));

function calculateTotalCost(estimate: EstimateFormData): number {
  // Calculate materials cost
  const materialsCost = estimate.materials.reduce(
    (total, material) => total + material.pricePerUnit * material.quantity,
    0
  );

  // Calculate labor cost
  const laborCost =
    estimate.labor.rateType === 'hourly'
      ? (estimate.labor.hours || 0) * estimate.labor.rate
      : estimate.labor.rate;

  // Calculate subtotal
  const subtotal = materialsCost + laborCost;

  // Add tax if applicable
  const tax = estimate.taxRate > 0 ? subtotal * (estimate.taxRate / 100) : 0;

  // Return total rounded to 2 decimal places
  return Number((subtotal + tax).toFixed(2));
}
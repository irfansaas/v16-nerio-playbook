import { TCOCurrentState, TCOFutureState, TCOResults } from '../types/tco.types';

const BENEFITS_MULTIPLIER = 1.3; // 30% benefits on top of salary
const ANNUAL_GROWTH = 0.03; // 3% annual growth
const DISCOUNT_RATE = 0.08; // 8% NPV discount rate

export function calculateTCO(
  currentState: TCOCurrentState,
  futureState: TCOFutureState,
  userCount: number
): TCOResults {
  // Current State Calculations
  // CapEx - Year 1 includes all, Year 3 includes refresh for servers/storage
  const currentCapexY1 = currentState.physicalServers + currentState.storageSystems + currentState.networkEquipment;
  const currentCapexY2 = 0; // No refresh in year 2
  const currentCapexY3 = currentState.physicalServers + currentState.storageSystems; // 3-year refresh cycle
  
  // OpEx with annual growth
  const currentOpexBase = currentState.datacenterCosts + currentState.vdiPlatformLicensing + currentState.supportMaintenance;
  const currentOpexY1 = currentOpexBase;
  const currentOpexY2 = currentOpexBase * (1 + ANNUAL_GROWTH);
  const currentOpexY3 = currentOpexBase * Math.pow(1 + ANNUAL_GROWTH, 2);
  
  // Personnel with benefits multiplier and annual growth
  const currentPersonnelBase = 
    (currentState.vdiAdminFTE * currentState.vdiAdminSalary +
     currentState.infraFTE * currentState.infraSalary +
     currentState.storageAdminFTE * currentState.storageAdminSalary +
     currentState.helpdeskFTE * currentState.helpdeskSalary) * BENEFITS_MULTIPLIER;
  
  const currentPersonnelY1 = currentPersonnelBase;
  const currentPersonnelY2 = currentPersonnelBase * (1 + ANNUAL_GROWTH);
  const currentPersonnelY3 = currentPersonnelBase * Math.pow(1 + ANNUAL_GROWTH, 2);
  
  const currentY1 = currentCapexY1 + currentOpexY1 + currentPersonnelY1;
  const currentY2 = currentCapexY2 + currentOpexY2 + currentPersonnelY2;
  const currentY3 = currentCapexY3 + currentOpexY3 + currentPersonnelY3;
  const currentTotal = currentY1 + currentY2 + currentY3;
  
  // Future State Calculations
  // Azure compute with auto-scaling and reserved instances
  const baseCompute = (futureState.vmD4sQty * futureState.vmD4sMonthly * 12) + 
                     (futureState.vmD8sQty * futureState.vmD8sMonthly * 12);
  const autoscaleSavings = baseCompute * (futureState.autoscalePercent / 100);
  const computeAfterAutoscale = baseCompute + autoscaleSavings;
  const riSavings = computeAfterAutoscale * (futureState.riPercent / 100);
  const totalCompute = computeAfterAutoscale + riSavings;
  
  // Licensing
  const licensing = (userCount * futureState.nerdioCostPerUser * 12) + 
                   (userCount * futureState.m365CostPerUser * 12);
  
  // Personnel with benefits multiplier
  const futurePersonnelBase = 
    (futureState.cloudAdminFTE * futureState.cloudAdminSalary +
     futureState.devOpsFTE * futureState.devOpsSalary +
     futureState.helpdeskNewFTE * futureState.helpdeskNewSalary) * BENEFITS_MULTIPLIER;
  
  // Implementation costs (Year 1 only)
  const implementation = futureState.professionalServices + futureState.trainingMigration;
  
  // Future state with 5% annual cloud cost growth
  const futureY1 = totalCompute + licensing + futurePersonnelBase + implementation;
  const futureY2 = (totalCompute * 1.05) + (licensing * 1.05) + (futurePersonnelBase * (1 + ANNUAL_GROWTH));
  const futureY3 = (totalCompute * 1.05 * 1.05) + (licensing * 1.05 * 1.05) + (futurePersonnelBase * Math.pow(1 + ANNUAL_GROWTH, 2));
  const futureTotal = futureY1 + futureY2 + futureY3;
  
  // Savings Calculations
  const savingsY1 = currentY1 - futureY1;
  const savingsY2 = currentY2 - futureY2;
  const savingsY3 = currentY3 - futureY3;
  const savingsTotal = currentTotal - futureTotal;
  const savingsPercentage = (savingsTotal / currentTotal) * 100;
  const monthlySavings = savingsTotal / 36;
  
  // Per User Calculations
  const currentPerUserMonthly = (currentTotal / 36) / userCount;
  const futurePerUserMonthly = (futureTotal / 36) / userCount;
  const savingsPerUserMonthly = currentPerUserMonthly - futurePerUserMonthly;
  
  // Financial Metrics
  const paybackMonths = implementation / monthlySavings;
  
  // NPV Calculation
  const npv = (savingsY1 / Math.pow(1 + DISCOUNT_RATE, 1)) +
              (savingsY2 / Math.pow(1 + DISCOUNT_RATE, 2)) +
              (savingsY3 / Math.pow(1 + DISCOUNT_RATE, 3)) -
              implementation;
  
  // ROI Calculation
  const roi = ((npv + implementation) / implementation) * 100;
  
  return {
    currentState: {
      year1: currentY1,
      year2: currentY2,
      year3: currentY3,
      total: currentTotal
    },
    futureState: {
      year1: futureY1,
      year2: futureY2,
      year3: futureY3,
      total: futureTotal
    },
    savings: {
      year1: savingsY1,
      year2: savingsY2,
      year3: savingsY3,
      total: savingsTotal,
      percentage: savingsPercentage,
      monthly: monthlySavings
    },
    perUser: {
      currentMonthly: currentPerUserMonthly,
      futureMonthly: futurePerUserMonthly,
      savingsMonthly: savingsPerUserMonthly
    },
    paybackMonths,
    npv,
    roi
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
export interface TCOCurrentState {
    // CapEx
    physicalServers: number;
    storageSystems: number;
    networkEquipment: number;
    
    // OpEx
    datacenterCosts: number;
    vdiPlatformLicensing: number;
    supportMaintenance: number;
    
    // Personnel
    vdiAdminFTE: number;
    vdiAdminSalary: number;
    infraFTE: number;
    infraSalary: number;
    storageAdminFTE: number;
    storageAdminSalary: number;
    helpdeskFTE: number;
    helpdeskSalary: number;
  }
  
  export interface TCOFutureState {
    // Azure Infrastructure
    vmD4sQty: number;
    vmD4sMonthly: number;
    vmD8sQty: number;
    vmD8sMonthly: number;
    autoscalePercent: number;
    riPercent: number;
    
    // Licensing
    nerdioCostPerUser: number;
    m365CostPerUser: number;
    
    // Personnel
    cloudAdminFTE: number;
    cloudAdminSalary: number;
    devOpsFTE: number;
    devOpsSalary: number;
    helpdeskNewFTE: number;
    helpdeskNewSalary: number;
    
    // Implementation
    professionalServices: number;
    trainingMigration: number;
  }
  
  export interface TCOResults {
    currentState: {
      year1: number;
      year2: number;
      year3: number;
      total: number;
    };
    futureState: {
      year1: number;
      year2: number;
      year3: number;
      total: number;
    };
    savings: {
      year1: number;
      year2: number;
      year3: number;
      total: number;
      percentage: number;
      monthly: number;
    };
    perUser: {
      currentMonthly: number;
      futureMonthly: number;
      savingsMonthly: number;
    };
    paybackMonths: number;
    npv: number;
    roi: number;
  }
  
  export interface TCOScenario {
    id: string;
    name: string;
    industry: string;
    userCount: number;
    currentState: TCOCurrentState;
    futureState: TCOFutureState;
  }
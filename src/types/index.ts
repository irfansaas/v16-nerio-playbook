// Navigation Types
export interface NavigationItem {
  id: string;
  title: string;
  icon: any;
  description?: string;
}

// Interview Types
export interface InterviewStage {
  id: string;
  title: string;
  duration: string;
  objective: string;
  focusAreas: string[];
}

// Segment Types
export interface SegmentData {
  id: string;
  title: string;
  range: string;
  psychology: string;
  keyMessage: string;
  primaryDrivers: Array<{
    label: string;
    text: string;
  }>;
  discoveryQuestions: string[];
  commonObjections: string[];
}

// Objection Types
export interface ObjectionData {
  id: string;
  type: string;
  frequency: 'common' | 'occasional' | 'rare';
  customerStatement: string;
  responseFramework: string;
  keyPoints: string[];
  successMetrics: string[];
}

// Scenario Types
export interface ScenarioData {
  id: string;
  title: string;
  company: string;
  crisis: string;
  stakeholder: string;
  challenge: string;
  hiddenFactors: string[];
  successPath: string[];
}

// Checklist Types
export interface ChecklistItem {
  id: string;
  text: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    success: string;
    warning: string;
    error: string;
  };
}
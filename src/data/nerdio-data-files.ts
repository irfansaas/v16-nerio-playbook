// data/navigation.data.ts
import { Home, Target, Users, BookOpen, Calculator, TrendingUp, Shield, Briefcase, CheckSquare, Zap, FileText, DollarSign } from 'lucide-react';
export interface NavigationItem {
  id: string;
  title: string;
  icon: any;
  description?: string;
}
export const navigationData: NavigationItem[] = [
  
    {
      id: 'home',
      title: 'Executive Summary',
      icon: Home,
      description: 'Your complete roadmap to landing the Value Engineer role'
    },
    {
      id: 'role',
      title: 'Role Analysis & Discovery Mastery',
      icon: Target,
      description: 'Master the position requirements and uncover business value'
    },
    {
      id: 'stakeholders',
      title: 'Stakeholder Dynamics',
      icon: Users,
      description: 'Navigate complex organizational politics'
    },
    {
      id: 'stages', 
      title: 'Interview Stage Playbooks',
      icon: BookOpen,
      description: 'Detailed preparation for each interview stage'
    },
    {
      id: 'financial',
      title: 'Financial Modeling Toolkit',
      icon: Calculator,
      description: 'Advanced ROI/TCO analysis tools'
    },
    {
      id: 'tco',
      title: 'TCO Analysis',
      icon: TrendingUp,
      description: 'Comprehensive 3-Year Total Cost of Ownership Calculator'
    },
    {
      id: 'roi',
      title: 'ROI Analysis',
      icon: DollarSign,
      description: '3-Year Return on Investment Calculator with Sensitivity Analysis'
    },
    {
      id: 'segments',
      title: 'Segment Playbooks',
      icon: Briefcase,
      description: 'Master approaches for each company segment'
    },
    // ... rest of the navigation items
  { 
    id: 'objections', 
    title: 'Objection Handling', 
    icon: Shield,
    description: 'Turn objections into opportunities'
  },
  { 
    id: 'cases', 
    title: 'Case Studies & Scenarios', 
    icon: Briefcase,
    description: 'Real-world examples and practice'
  },
  { 
    id: 'validation', 
    title: 'Value Validation', 
    icon: CheckSquare,
    description: 'Prove predictions and recover from misses'
  },
  { 
    id: 'quickref', 
    title: 'Quick Reference Guides', 
    icon: Zap,
    description: 'Essential information at your fingertips'
  },
  { 
    id: 'appendix', 
    title: 'Appendices & Checklists', 
    icon: FileText,
    description: 'Additional resources and planning tools'
  },
  
];
// Debug logging
console.log('=== NERDIO DATA FILE LOADED ===');
console.log('Total navigation items:', navigationData.length);
console.log('Has TCO?', navigationData.some(item => item.id === 'tco'));
console.log('TCO item:', navigationData.find(item => item.id === 'tco'));
console.log('All navigation IDs:', navigationData.map(item => item.id));
// Continue with the rest of your exports...
// data/interview-stages.data.ts
export interface InterviewStage {
  id: string;
  title: string;
  duration: string;
  objective: string;
  focusAreas: string[];
}
export const interviewStagesData: InterviewStage[] = [
  {
    id: 'recruiter',
    title: 'Recruiter Screen',
    duration: '30-45 min',
    objective: 'Establish fit and generate excitement',
    focusAreas: ['Cultural fit', 'Basic qualifications', 'Salary expectations', 'Timeline']
  },
  {
    id: 'hiring',
    title: 'Hiring Manager',
    duration: '45-60 min',
    objective: 'Demonstrate value engineering mastery',
    focusAreas: ['Technical depth', 'Business acumen', 'Past successes', 'Role alignment']
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    duration: '45-60 min',
    objective: 'Prove technical depth and modeling excellence',
    focusAreas: ['Live modeling', 'Azure expertise', 'Cost optimization', 'Architecture']
  },
  {
    id: 'team',
    title: 'Team Interviews',
    duration: '30-45 min each',
    objective: 'Demonstrate collaboration and cultural fit',
    focusAreas: ['Cross-functional work', 'Communication style', 'Team dynamics', 'Partnership approach']
  },
  {
    id: 'leadership',
    title: 'Leadership',
    duration: '45-60 min',
    objective: 'Demonstrate strategic thinking and vision',
    focusAreas: ['Market perspective', 'Strategic vision', '90-day plan', 'Leadership qualities']
  }
];
// data/segments.data.ts
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
export const segmentsData: Record<string, SegmentData> = {
  smb: {
    id: 'smb',
    title: 'SMB',
    range: '50-500 employees',
    psychology: 'Scrappy to Professional',
    keyMessage: 'Focus on growing your business, not managing IT',
    primaryDrivers: [
      { label: 'Growth Constraints', text: 'What if a big opportunity comes and your IT can\'t handle it?' },
      { label: 'Professional Image', text: 'How do slow systems make you look to clients?' },
      { label: 'Founder\'s Fear', text: 'You\'ve invested everything - don\'t let IT hold it back' },
      { label: 'Competitive Urgency', text: 'Competitors with better IT are moving faster' }
    ],
    discoveryQuestions: [
      'What\'s your growth plan for the next 2 years?',
      'How does IT currently limit your business?',
      'What would doubling in size mean for your IT?',
      'Have you lost any deals due to IT issues?'
    ],
    commonObjections: [
      'Too expensive for our size',
      'We\'re not ready for the cloud',
      'Our IT person handles everything'
    ]
  },
  midmarket: {
    id: 'midmarket',
    title: 'Mid-Market',
    range: '500-2,500 employees',
    psychology: 'Enterprise Capabilities, SMB Budget',
    keyMessage: 'Reduce risk while improving operational efficiency',
    primaryDrivers: [
      { label: 'Compliance Burden', text: 'SOC 2, HIPAA, industry regulations' },
      { label: 'Multi-Location Complexity', text: 'Standardization challenges' },
      { label: 'Resource Constraints', text: 'Want enterprise features, limited budget' },
      { label: 'Risk Aversion', text: 'Been burned before, cautious about changes' }
    ],
    discoveryQuestions: [
      'What compliance requirements do you face?',
      'How do you manage IT across locations?',
      'What\'s your IT budget vs. wishlist gap?',
      'What went wrong with past IT projects?'
    ],
    commonObjections: [
      'We need to see ROI within 12 months',
      'Integration with existing systems',
      'Change management concerns'
    ]
  },
  enterprise: {
    id: 'enterprise',
    title: 'Enterprise',
    range: '2,500-10,000 employees',
    psychology: 'Strategic Alignment & Scale',
    keyMessage: 'Enable global business agility through IT standardization',
    primaryDrivers: [
      { label: 'Global Complexity', text: 'Multiple countries, regulations, time zones' },
      { label: 'Strategic Alignment', text: 'Connect IT decisions to business strategy' },
      { label: 'Executive Sponsorship', text: 'Must have C-level champion' },
      { label: 'Integration Requirements', text: 'Complex ecosystem dependencies' }
    ],
    discoveryQuestions: [
      'How does IT support your global strategy?',
      'What\'s the board asking about IT?',
      'Who owns the IT transformation agenda?',
      'What systems must we integrate with?'
    ],
    commonObjections: [
      'Concerned about data sovereignty',
      'Need extensive security review',
      'Requires global rollout plan'
    ]
  },
  strategic: {
    id: 'strategic',
    title: 'Strategic',
    range: '10,000+ employees',
    psychology: 'Market Leadership & Transformation',
    keyMessage: 'Accelerate business transformation and competitive advantage',
    primaryDrivers: [
      { label: 'Board-Level Metrics', text: 'Think market cap, not cost savings' },
      { label: 'Competitive Intelligence', text: 'Know competitor technology strategies' },
      { label: 'M&A Impact', text: 'How IT enables acquisition strategy' },
      { label: 'Innovation Velocity', text: 'Time-to-market is everything' }
    ],
    discoveryQuestions: [
      'How is technology enabling your market position?',
      'What are competitors doing that worries you?',
      'How does IT factor into M&A strategy?',
      'What\'s your innovation cycle time?'
    ],
    commonObjections: [
      'Need proven scale at our size',
      'Requires board-level approval',
      'Must align with 5-year strategy'
    ]
  }
};
// data/objections.data.ts
export interface ObjectionData {
  id: string;
  type: string;
  frequency: 'common' | 'occasional' | 'rare';
  customerStatement: string;
  responseFramework: string;
  keyPoints: string[];
  successMetrics: string[];
}
export const objectionsData: ObjectionData[] = [
  {
    id: 'azure-cost',
    type: 'Azure Cost Spike',
    frequency: 'common',
    customerStatement: 'But what if Azure costs spike? We\'ve heard horror stories about cloud bills getting out of control.',
    responseFramework: 'Cost Control Assurance',
    keyPoints: [
      'Nerdio provides 30-50% cost optimization vs native Azure',
      'Real-time cost monitoring and alerts',
      'Costs scale with business growth',
      'More predictable than hardware failures'
    ],
    successMetrics: [
      'Show actual customer cost savings',
      'Demo cost optimization features',
      'Provide cost guarantee options'
    ]
  },
  {
    id: 'internet-reliability',
    type: 'Internet Reliability',
    frequency: 'common',
    customerStatement: 'Our internet isn\'t reliable enough for cloud-based solutions.',
    responseFramework: 'Resilience Reframe',
    keyPoints: [
      'Current setup has single point of failure',
      'Cloud enables multiple redundancies',
      'Offline capabilities available',
      'Azure has 99.9% uptime SLA'
    ],
    successMetrics: [
      'Calculate current downtime costs',
      'Show redundancy options',
      'Demonstrate offline capabilities'
    ]
  },
  {
    id: 'too-expensive',
    type: 'Too Expensive',
    frequency: 'common',
    customerStatement: 'This seems expensive. We\'re trying to control costs right now.',
    responseFramework: 'Value Reframe',
    keyPoints: [
      'Calculate true current costs',
      'Show 18-month payback',
      'Highlight opportunity costs',
      'Focus on ROI not price'
    ],
    successMetrics: [
      'Build detailed TCO comparison',
      'Show productivity gains',
      'Calculate cost of inaction'
    ]
  }
];
// data/scenarios.data.ts
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
export const scenariosData: ScenarioData[] = [
  {
    id: 'smb-crisis',
    title: '🏪 SMB Crisis: Lost Client',
    company: 'Regional law firm, 120 attorneys',
    crisis: 'Major client threatening to leave due to slow document access',
    stakeholder: 'Managing Partner (panicked)',
    challenge: 'This client represents 30% of revenue',
    hiddenFactors: [
      'Partner considering retirement if client leaves',
      'Competitor has modern IT infrastructure',
      'Other clients starting to complain',
      'Associates threatening to leave'
    ],
    successPath: [
      'Acknowledge business crisis, not IT issue',
      'Quantify total risk beyond one client',
      'Position as transformation opportunity',
      'Create urgency with 30-day action plan'
    ]
  },
  {
    id: 'compliance-crisis',
    title: '🏢 Mid-Market: Compliance Failure',
    company: 'Healthcare system, 2,000 employees',
    crisis: 'Failed SOC 2 audit, 90 days to remediate',
    stakeholder: 'CISO and Compliance Officer',
    challenge: '$15M client contract at risk',
    hiddenFactors: [
      'Board considering CISO replacement',
      'Cyber insurance threatening cancellation',
      'M&A deal on hold due to compliance',
      'Employees doing workarounds'
    ],
    successPath: [
      'Focus on compliance automation',
      'Highlight audit trail capabilities',
      'Show 60-day implementation possible',
      'Offer compliance guarantee'
    ]
  }
];
// data/checklists.data.ts
export interface ChecklistItem {
  id: string;
  text: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}
export const recruiterChecklistData: ChecklistItem[] = [
  { id: 'rec1', text: 'Review Ben Murphy connection story', priority: 'high' },
  { id: 'rec2', text: 'Practice 30-second elevator pitch', priority: 'high' },
  { id: 'rec3', text: 'Prepare 5 thoughtful questions', priority: 'high' },
  { id: 'rec4', text: 'Research recruiter\'s background', priority: 'medium' },
  { id: 'rec5', text: 'Test video/audio setup', priority: 'high' },
  { id: 'rec6', text: 'Prepare salary expectations answer', priority: 'medium' },
  { id: 'rec7', text: 'Ready to explain job transitions', priority: 'medium' }
];
export const ninetyDayPlanData: Record<string, ChecklistItem[]> = {
  foundation: [
    { id: 'f1', text: 'Complete Nerdio certification', category: 'learning' },
    { id: 'f2', text: 'Shadow 10+ customer calls', category: 'learning' },
    { id: 'f3', text: 'Review all VE materials', category: 'learning' },
    { id: 'f4', text: 'Map stakeholder relationships', category: 'relationships' },
    { id: 'f5', text: 'Audit competitive intelligence', category: 'analysis' },
    { id: 'f6', text: 'Build first ROI model', category: 'deliverables' },
    { id: 'f7', text: 'Present learnings to team', category: 'communication' }
  ],
  development: [
    { id: 'd1', text: 'Create segment playbooks', category: 'deliverables' },
    { id: 'd2', text: 'Build model templates', category: 'deliverables' },
    { id: 'd3', text: 'Develop battle cards', category: 'deliverables' },
    { id: 'd4', text: 'Launch partner enablement', category: 'enablement' },
    { id: 'd5', text: 'Deliver first customer wins', category: 'results' },
    { id: 'd6', text: 'Establish success metrics', category: 'measurement' },
    { id: 'd7', text: 'Get customer feedback', category: 'feedback' }
  ],
  scale: [
    { id: 's1', text: 'Enable partner teams', category: 'enablement' },
    { id: 's2', text: 'Create self-service tools', category: 'automation' },
    { id: 's3', text: 'Launch value dashboard', category: 'measurement' },
    { id: 's4', text: 'Develop case studies', category: 'content' },
    { id: 's5', text: 'Build exec relationships', category: 'relationships' },
    { id: 's6', text: 'Measure impact metrics', category: 'measurement' },
    { id: 's7', text: 'Plan quarter 2 initiatives', category: 'planning' }
  ]
};
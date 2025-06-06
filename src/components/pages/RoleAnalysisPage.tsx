import { CheckCircle } from 'lucide-react';
import { Card } from '../common/Card';

export function RoleAnalysisPage() {
  const responsibilities = [
    'Lead value discovery workshops with enterprise clients',
    'Build comprehensive ROI/TCO models tailored to client needs',
    'Partner with sales teams to accelerate deal velocity',
    'Create compelling business cases for C-level executives'
  ];

  const bestPractices = [
    {
      title: 'Start with Business Goals',
      description: 'Never lead with technology. Always uncover the business objectives first, then map Nerdio\'s capabilities to those specific goals.',
      borderColor: 'border-purple-500'
    },
    {
      title: 'Quantify Current Pain',
      description: 'Get specific numbers: downtime hours, productivity losses, compliance risks. Vague pain points don\'t create urgency.',
      borderColor: 'border-blue-500'
    },
    {
      title: 'Map the Political Landscape',
      description: 'Identify champions, skeptics, and hidden influencers. Your success depends on navigating organizational dynamics.',
      borderColor: 'border-green-500'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Role Analysis & Discovery Mastery</h2>
      
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Core Responsibilities</h3>
        <ul className="space-y-3">
          {responsibilities.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Discovery Best Practices</h3>
        <div className="space-y-4">
          {bestPractices.map((practice, index) => (
            <div key={index} className={`border-l-4 ${practice.borderColor} pl-4`}>
              <h4 className="font-semibold mb-2">{practice.title}</h4>
              <p className="text-gray-600">{practice.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
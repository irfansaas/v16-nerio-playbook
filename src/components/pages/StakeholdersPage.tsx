import { Users } from 'lucide-react';
import { Card } from '../common/Card';

export function StakeholdersPage() {
  const stakeholders = [
    {
      title: 'Economic Buyer (CFO/CEO)',
      color: 'text-purple-600',
      careAbout: [
        'ROI and payback period',
        'Risk mitigation',
        'Competitive advantage',
        'Board-level metrics'
      ],
      howToEngage: 'Lead with business outcomes, not features. Show how Nerdio impacts revenue, reduces risk, and enables growth.'
    },
    {
      title: 'Technical Buyer (CTO/IT Director)',
      color: 'text-blue-600',
      careAbout: [
        'Technical architecture',
        'Integration complexity',
        'Security and compliance',
        'Team enablement'
      ],
      howToEngage: 'Demonstrate deep technical knowledge. Show how Nerdio simplifies their life while maintaining control and security.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Stakeholder Dynamics</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {stakeholders.map((stakeholder, index) => (
          <Card key={index}>
            <h3 className={`text-xl font-semibold mb-4 flex items-center`}>
              <Users className={`w-6 h-6 mr-2 ${stakeholder.color}`} />
              {stakeholder.title}
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-gray-700">What They Care About:</h4>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  {stakeholder.careAbout.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700">How to Engage:</h4>
                <p className="text-sm text-gray-600 mt-1">{stakeholder.howToEngage}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
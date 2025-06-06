import { Target, Users, Calculator, Shield } from 'lucide-react';
import { Card } from '../common/Card';
import { AnimatedSection } from '../common/AnimatedSection';

export function HomePage() {
  const features = [
    {
      icon: Target,
      color: 'text-purple-600',
      title: 'Role Mastery',
      description: 'Deep dive into the Value Engineer position and excel in every aspect'
    },
    {
      icon: Users,
      color: 'text-blue-600',
      title: 'Stakeholder Success',
      description: 'Navigate complex organizational dynamics with confidence'
    },
    {
      icon: Calculator,
      color: 'text-green-600',
      title: 'Financial Impact',
      description: 'Master ROI calculations and demonstrate clear business value'
    },
    {
      icon: Shield,
      color: 'text-red-600',
      title: 'Objection Handling',
      description: 'Turn every objection into an opportunity to add value'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatedSection>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl shadow-xl mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Nerdio Success Playbook</h1>
          <p className="text-xl opacity-90">
            Your comprehensive guide to mastering the Value Engineer role at Nerdio
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <feature.icon className={`w-10 h-10 ${feature.color} mb-3`} />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
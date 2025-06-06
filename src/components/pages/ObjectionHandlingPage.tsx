import { CheckCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { objectionsData } from '../../data/nerdio-data-files';
import { AnimatedSection } from '../common/AnimatedSection';

export function ObjectionHandlingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Objection Handling Mastery</h2>
      
      <div className="space-y-6">
        {objectionsData.map((objection, index) => (
          <AnimatedSection key={objection.id} delay={index * 100}>
            <Card>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{objection.type}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  objection.frequency === 'common' 
                    ? 'bg-red-100 text-red-700'
                    : objection.frequency === 'occasional'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {objection.frequency}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Customer Says:</h4>
                <p className="text-gray-600 italic bg-gray-50 p-3 rounded">
                  "{objection.customerStatement}"
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Response Framework:</h4>
                <p className="text-purple-700 font-semibold">{objection.responseFramework}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Points:</h4>
                <ul className="space-y-2">
                  {objection.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Success Metrics:</h4>
                <div className="flex flex-wrap gap-2">
                  {objection.successMetrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
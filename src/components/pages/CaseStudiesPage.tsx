import { Card } from '../common/Card';
import { scenariosData } from '../../data/nerdio-data-files';
import { AnimatedSection } from '../common/AnimatedSection';

export function CaseStudiesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Case Studies & Scenarios</h2>
      
      <div className="space-y-6">
        {scenariosData.map((scenario, index) => (
          <AnimatedSection key={scenario.id} delay={index * 100}>
            <Card>
              <h3 className="text-xl font-semibold mb-2">{scenario.title}</h3>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Company:</span> {scenario.company}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Crisis:</span> {scenario.crisis}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Stakeholder:</span> {scenario.stakeholder}
                </p>
                <div className="bg-red-50 p-3 rounded mt-2">
                  <p className="text-red-700 font-semibold">
                    ⚡ Challenge: {scenario.challenge}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Hidden Factors:</h4>
                <ul className="space-y-1">
                  {scenario.hiddenFactors.map((factor, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">
                      • {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Success Path:</h4>
                <ol className="space-y-2">
                  {scenario.successPath.map((step, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
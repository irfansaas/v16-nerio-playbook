import { ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';

export function FinancialModelingPage() {
  const valueDrivers = [
    { title: 'Azure Cost Optimization', value: '30-50% reduction through auto-scaling' },
    { title: 'IT Labor Savings', value: '75% reduction in management time' },
    { title: 'Downtime Reduction', value: '90% fewer user-impacting incidents' },
    { title: 'Productivity Gains', value: '2-3 hours per user per week' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Financial Modeling Toolkit</h2>
      
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">ROI Calculation Framework</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Basic ROI Formula:</h4>
          <code className="block bg-gray-800 text-white p-3 rounded text-sm">
            ROI = ((Gain from Investment - Cost of Investment) / Cost of Investment) × 100
          </code>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold mb-2">Key Value Drivers to Model:</h4>
          <ul className="space-y-2">
            {valueDrivers.map((driver, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold">{driver.title}:</span>
                  <span className="text-gray-600 ml-2">{driver.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">TCO Comparison Template</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  With Nerdio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Infrastructure Costs
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $50,000/mo
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $30,000/mo
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                  40% reduction
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
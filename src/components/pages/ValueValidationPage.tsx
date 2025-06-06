import { Card } from '../common/Card';

export function ValueValidationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Value Validation Framework</h2>
      
      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Measuring Success</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-purple-700 mb-2">Leading Indicators</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>User adoption rate</li>
              <li>System performance</li>
              <li>Ticket reduction</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-blue-700 mb-2">Lagging Indicators</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Cost savings realized</li>
              <li>Productivity gains</li>
              <li>ROI achieved</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-green-700 mb-2">Strategic Indicators</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Business agility</li>
              <li>Innovation velocity</li>
              <li>Competitive position</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Validation Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                30
              </div>
              <div>
                <p className="font-semibold">30 Days: Initial Metrics</p>
                <p className="text-sm text-gray-600">User adoption, system stability, early wins</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                90
              </div>
              <div>
                <p className="font-semibold">90 Days: Operational Impact</p>
                <p className="text-sm text-gray-600">Cost trends, productivity metrics, process improvements</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                180
              </div>
              <div>
                <p className="font-semibold">180 Days: Strategic Value</p>
                <p className="text-sm text-gray-600">Full ROI validation, business transformation metrics</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
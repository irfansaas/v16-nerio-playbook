import { CheckSquare } from 'lucide-react';
import { Card } from '../common/Card';
import { recruiterChecklistData } from '../../data/nerdio-data-files';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function QuickReferencePage() {
    const [completedItems, setCompletedItems] = useLocalStorage<string[]>('completedItems', []);

    const toggleComplete = (itemId: string) => {
        if (completedItems.includes(itemId)) {
          setCompletedItems(completedItems.filter(id => id !== itemId));
        } else {
          setCompletedItems([...completedItems, itemId]);
        }
      };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Quick Reference Guides</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Recruiter Screen Checklist</h3>
          <ul className="space-y-3">
            {recruiterChecklistData.map((item) => (
              <li key={item.id} className="flex items-start">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`mr-3 mt-0.5 ${
                    completedItems.includes(item.id)
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }`}
                >
                  {completedItems.includes(item.id) ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded" />
                  )}
                </button>
                <span className={completedItems.includes(item.id) ? 'line-through text-gray-500' : ''}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Key Metrics to Remember</h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="font-semibold">Azure Cost Reduction:</span>
              <span className="text-purple-600 font-bold">30-50%</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Management Time Saved:</span>
              <span className="text-purple-600 font-bold">75%</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Typical Payback Period:</span>
              <span className="text-purple-600 font-bold">12-18 months</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Productivity Gain:</span>
              <span className="text-purple-600 font-bold">2-3 hrs/user/week</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Downtime Reduction:</span>
              <span className="text-purple-600 font-bold">90%</span>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Power Phrases</h3>
          <ul className="space-y-3">
            <li className="border-l-4 border-purple-500 pl-3">
              <p className="italic text-gray-700">
                "What if you could reduce Azure costs by 40% while improving performance?"
              </p>
            </li>
            <li className="border-l-4 border-blue-500 pl-3">
              <p className="italic text-gray-700">
                "Imagine giving your IT team 30 hours back each week..."
              </p>
            </li>
            <li className="border-l-4 border-green-500 pl-3">
              <p className="italic text-gray-700">
                "Your competitors are already moving faster because of this..."
              </p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
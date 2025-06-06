import { CheckSquare } from 'lucide-react';
import { Card } from '../common/Card';
import { ninetyDayPlanData } from '../../data/nerdio-data-files';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function AppendixPage() {
    const [completedItems, setCompletedItems] = useLocalStorage<string[]>('90dayCompleted', []);

    const toggleComplete = (itemId: string) => {
        if (completedItems.includes(itemId)) {
          setCompletedItems(completedItems.filter(id => id !== itemId));
        } else {
          setCompletedItems([...completedItems, itemId]);
        }
      };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Appendices & Resources</h2>
      
      <Card className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">90-Day Success Plan</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-purple-700">Days 1-30: Foundation</h4>
            <ul className="space-y-2">
              {ninetyDayPlanData.foundation.map((item) => (
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
                  <div className="flex-1">
                    <span className={completedItems.includes(item.id) ? 'line-through text-gray-500' : ''}>
                      {item.text}
                    </span>
                    {item.category && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-blue-700">Days 31-60: Development</h4>
            <ul className="space-y-2">
              {ninetyDayPlanData.development.map((item) => (
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
                  <div className="flex-1">
                    <span className={completedItems.includes(item.id) ? 'line-through text-gray-500' : ''}>
                      {item.text}
                    </span>
                    {item.category && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Ready to Excel!</h3>
        <p className="text-lg mb-4">
          You now have everything you need to succeed as a Value Engineer at Nerdio.
          Remember: It's not about knowing everything—it's about asking the right questions
          and focusing on business value.
        </p>
        <p className="text-xl font-semibold">
          Go make an impact! 🚀
        </p>
      </div>
    </div>
  );
}
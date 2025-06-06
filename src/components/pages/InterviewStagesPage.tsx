import { Clock } from 'lucide-react';
import { Card } from '../common/Card';
import { interviewStagesData } from '../../data/nerdio-data-files';

export function InterviewStagesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Interview Stage Playbooks</h2>
      
      <div className="space-y-6">
        {interviewStagesData.map((stage) => (
          <Card key={stage.id}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{stage.title}</h3>
                <p className="text-gray-600 text-sm mt-1">Duration: {stage.duration}</p>
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Objective:</h4>
              <p className="text-gray-600">{stage.objective}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Focus Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {stage.focusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { segmentsData } from '../../data/nerdio-data-files';

export function SegmentPlaybooksPage() {
  const [selectedSegment, setSelectedSegment] = useState('smb');
  const segment = segmentsData[selectedSegment];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Segment Playbooks</h2>
      
      {/* Segment Selector */}
      <div className="flex space-x-4 mb-6">
        {Object.values(segmentsData).map((seg) => (
          <button
            key={seg.id}
            onClick={() => setSelectedSegment(seg.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedSegment === seg.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {seg.title}
          </button>
        ))}
      </div>

      {/* Segment Details */}
      <Card className="mb-6">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">{segment.title}</h3>
          <p className="text-gray-600">{segment.range}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Psychology</h4>
            <p className="text-gray-700">{segment.psychology}</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Key Message</h4>
            <p className="text-gray-700 italic">"{segment.keyMessage}"</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h4 className="text-xl font-semibold mb-4">Primary Value Drivers</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {segment.primaryDrivers.map((driver, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-4">
              <h5 className="font-semibold text-purple-700">{driver.label}</h5>
              <p className="text-gray-600 text-sm mt-1">{driver.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h4 className="text-xl font-semibold mb-4">Discovery Questions</h4>
          <ul className="space-y-3">
            {segment.discoveryQuestions.map((question, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="w-5 h-5 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{question}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h4 className="text-xl font-semibold mb-4">Common Objections</h4>
          <ul className="space-y-3">
            {segment.commonObjections.map((objection, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{objection}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
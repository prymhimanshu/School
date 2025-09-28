import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sampleNotices = [
  { id: 'n1', title: 'Half Yearly exam', date: '09-09-2025', body: 'The Half-Yearly Examinations will commence from 09-09-2025. Students are advised to prepare thoroughly and follow the timetable issued by the school. Attendance during all examination days is compulsory. Kindly ensure you carry your admit card and necessary stationery.' },
  { id: 'n2', title: 'Science Exhibition', date: '20-09-2025', body: 'The school is organizing a Science Exhibition on 20th September 2025. All students are invited to participate and showcase their innovative projects and models. The exhibition will be held in the school auditorium from 9:00 AM to 2:00 PM. Students willing to participate should give their names to their respective science teachers by 15th September 2025.' },
  { id: 'n3', title: 'PA 4 PTM', date: '23-08-2025', body: 'Parents are hereby informed that the Parent-Teacher Meeting (PTM) for Periodic Assessment-4 will be held on 23rd August 2025 in the school premises from 9:00 AM to 12:30 PM. All parents are requested to attend the meeting to discuss the academic performance and progress of their wards. Your presence will greatly contribute to the betterment of your child’s learning.'}
];

const Notices: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const excerpt = (text: string, len = 120) => {
    if (text.length <= len) return text;
    return text.slice(0, len).trimEnd() + '…';
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Recent Notices</h2>

      <div className="space-y-4">
        {sampleNotices.map((n, idx) => {
          const isOpen = expandedId === n.id;
          const accent = idx % 2 === 0 ? 'border-blue-300' : 'border-yellow-300';
          return (
            <article key={n.id} className={`bg-white rounded-lg shadow-sm overflow-hidden border-2 ${accent}`}>
              <button
                onClick={() => toggle(n.id)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 flex items-start gap-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{n.title}</h3>
                      <div className="text-xs text-gray-500 mt-1">{n.date}</div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-yellow-600' : ''}`} />
                    </div>
                  </div>

                  <div className="mt-3 text-gray-700 text-sm">
                    {!isOpen ? excerpt(n.body) : n.body}
                  </div>
                </div>
              </button>

              {/* Expanded area: visible when open. keep subtle border and padding */}
              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-gray-50">
                  <div className="mt-3 text-sm text-gray-700 leading-relaxed">
                    {n.body}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Notices;

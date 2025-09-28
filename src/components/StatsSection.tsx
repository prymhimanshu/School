import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: '1,800+',
      label: 'Active Students',
      description: 'Currently enrolled across all programs',
    },
    {
      number: '81+',
      label: 'Expert Teachers',
      description: 'Qualified educators with advanced degrees',
    },
    {
      number: '95%',
      label: 'Success Rate',
      description: 'Students achieving their academic goals',
    },
    {
      number: '25+',
      label: 'Years Excellence',
      description: 'Proven track record in education',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Our Impact by Numbers
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            These statistics reflect our commitment to educational excellence and student success.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 group-hover:border-yellow-400 transition-colors duration-300">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
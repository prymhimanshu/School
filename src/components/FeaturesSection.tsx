import React from 'react';
import { BookOpen, Users, Award, Calendar, Bell, Shield } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Comprehensive curriculum designed to nurture critical thinking and creativity.',
      color: 'bg-blue-500',
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Experienced educators dedicated to student success and personal growth.',
      color: 'bg-green-500',
    },
    {
      icon: Award,
      title: 'Achievement Focus',
      description: 'Celebrating student accomplishments and fostering a culture of excellence.',
      color: 'bg-purple-500',
    },
    {
      icon: Calendar,
      title: 'Flexible Learning',
      description: 'Adaptable schedules and learning methods to fit every student\'s needs.',
      color: 'bg-orange-500',
    },
    {
      icon: Bell,
      title: 'Live Updates',
      description: 'Real-time notifications and announcements to keep everyone informed.',
      color: 'bg-red-500',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Secure and nurturing environment where students can thrive and learn.',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Choose Shakti Shanti Academy?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide a comprehensive educational experience that prepares students for success 
            in an ever-changing world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
import React from 'react';
import { BookOpen, Users, Award, Calendar, Bell, Shield, Laptop, Globe, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureCard from './ui/FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Comprehensive CBSE curriculum designed to nurture critical thinking and creativity with modern teaching methods.',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Experienced educators including IITians and NEET-qualified teachers dedicated to student success.',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      icon: Award,
      title: 'Achievement Focus',
      description: 'Celebrating student accomplishments and fostering a culture of excellence with regular assessments.',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      icon: Laptop,
      title: 'Smart Classrooms',
      description: 'Modern technology-enabled classrooms with interactive learning tools and digital resources.',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
    {
      icon: Bell,
      title: 'Real-time Updates',
      description: 'Instant notifications for homework, announcements, and important school updates through our portal.',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Secure and nurturing environment where students can thrive, learn, and develop their full potential.',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    },
    {
      icon: Globe,
      title: 'NEEV Program',
      description: 'Specialized foundation program for JEE and NEET preparation starting from Class 8.',
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock academic support and guidance for students and parents through our digital platform.',
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    },
    {
      icon: Star,
      title: 'Holistic Development',
      description: 'Focus on overall personality development through sports, cultural activities, and leadership programs.',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Shakti Shanti Academy
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            We provide a comprehensive educational experience that prepares students for success 
            in an ever-changing world with modern facilities and expert guidance.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the difference of quality education with modern facilities and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/apply-admission"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply Now
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold border border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
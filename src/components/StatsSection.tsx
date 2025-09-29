import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import StatCard from './ui/StatCard';
import AnimatedCounter from './ui/AnimatedCounter';

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    notices: 0,
    events: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes, noticesRes, eventsRes] = await Promise.all([
          supabase.from('students').select('id', { count: 'exact' }),
          supabase.from('teachers').select('id', { count: 'exact' }),
          supabase.from('notices').select('id', { count: 'exact' }),
          supabase.from('events').select('id', { count: 'exact' })
        ]);

        setStats({
          students: studentsRes.count || 1800,
          teachers: teachersRes.count || 81,
          notices: noticesRes.count || 25,
          events: eventsRes.count || 15
        });
      } catch (error) {
        // Fallback to default values
        setStats({
          students: 1800,
          teachers: 81,
          notices: 25,
          events: 15
        });
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      number: stats.students,
      label: 'Active Students',
      description: 'Currently enrolled across all programs',
      icon: Users,
      isCounter: true
    },
    {
      number: stats.teachers,
      label: 'Expert Teachers',
      description: 'Qualified educators with advanced degrees',
      icon: GraduationCap,
      isCounter: true
    },
    {
      number: '95%',
      label: 'Success Rate',
      description: 'Students achieving their academic goals',
      icon: Award,
      isCounter: false
    },
    {
      number: '25+',
      label: 'Years Excellence',
      description: 'Proven track record in education',
      icon: BookOpen,
      isCounter: false
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Impact by Numbers
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            These statistics reflect our commitment to educational excellence and student success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              description={stat.description}
              delay={index * 0.1}
              isCounter={stat.isCounter}
            />
          ))}
        </div>

        {/* Additional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              <AnimatedCounter end={stats.notices} suffix="+" />
            </div>
            <p className="text-gray-300">Active Notices</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              <AnimatedCounter end={stats.events} suffix="+" />
            </div>
            <p className="text-gray-300">Upcoming Events</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">CBSE</div>
            <p className="text-gray-300">Affiliated Board</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
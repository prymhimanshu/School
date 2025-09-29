import React from 'react';
import { ArrowRight, BookOpen, Star, Heart, Lightbulb, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50 min-h-[600px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-center p-8 lg:p-12"
          >
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 mb-4"
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Excellence in Education</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Roots</span> of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Education</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-700 text-lg lg:text-xl mb-8 leading-relaxed"
              >
                Nurturing young minds with knowledge, creativity, and values to help them grow into
                strong and confident futures.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/apply-admission" 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                
                <Link 
                  to="/about" 
                  className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
                >
                  <span>Learn More</span>
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex items-center justify-center relative overflow-hidden p-8 lg:p-12"
          >
            {/* Central Student Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-2xl">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  >
                    <div className="w-24 h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center">
                      <span className="text-4xl lg:text-5xl">👩‍🎓</span>
                    </div>
                  </motion.div>
                  <div className="text-white">
                    <p className="font-bold text-xl lg:text-2xl mb-2">Happy Student</p>
                    <p className="text-blue-100 text-sm lg:text-base">Ready to Learn & Grow</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-16 left-12 lg:top-20 lg:left-16"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 lg:p-4 transform rotate-12 shadow-xl">
                <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute top-32 right-16 lg:top-40 lg:right-20"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2 lg:p-3 shadow-xl">
                <Star className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-20 left-20 lg:bottom-24 lg:left-24"
            >
              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-2 lg:p-3 transform -rotate-12 shadow-xl">
                <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [5, -15, 5] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute bottom-32 right-12 lg:bottom-40 lg:right-16"
            >
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-full p-3 lg:p-4 shadow-xl">
                <Lightbulb className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
            </motion.div>

            {/* Background Geometric Shapes */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-24 left-24 lg:top-32 lg:left-32 w-40 h-40 lg:w-48 lg:h-48 border-2 border-blue-400 rounded-full"></div>
              <div className="absolute bottom-24 right-24 lg:bottom-32 lg:right-32 w-32 h-32 lg:w-40 lg:h-40 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute top-48 right-40 lg:top-60 lg:right-48 w-20 h-20 lg:w-24 lg:h-24 bg-purple-400 rounded-full opacity-60"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
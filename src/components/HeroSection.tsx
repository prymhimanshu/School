import React from 'react';
import { ArrowRight, BookOpen, Star, Heart, Lightbulb, Sparkles, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientCard from './ui/GradientCard';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 px-4 sm:px-6 lg:px-8 py-12">
          {/* Left Section - Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-800 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Excellence in Education Since 1999
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Roots</span> of Education
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Nurturing young minds with knowledge, creativity, and values to help them grow into 
              strong and confident leaders of tomorrow.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/apply-admission" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link 
                to="/about" 
                className="group bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
              >
                <span>Learn More</span>
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">1800+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-600">81+</div>
                <div className="text-sm text-gray-600">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">25+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Visual */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto">
              {/* Main school image */}
              <motion.div
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/assest/School.png" 
                  alt="Shakti Shanti Academy" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">Shakti Shanti Academy</h3>
                  <p className="text-sm opacity-90">Excellence in Education</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                className="absolute -top-6 -left-6 z-20"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <GradientCard gradient="yellow" className="p-4">
                  <div className="flex items-center space-x-2 text-white">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-semibold">CBSE Affiliated</span>
                  </div>
                </GradientCard>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -right-6 z-20"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              >
                <GradientCard gradient="blue" className="p-4">
                  <div className="flex items-center space-x-2 text-white">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-semibold">1800+ Students</span>
                  </div>
                </GradientCard>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute top-12 right-12 w-16 h-16 bg-yellow-200 rounded-full opacity-60"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute bottom-12 left-12 w-12 h-12 bg-blue-200 rounded-full opacity-60"
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Features preview */}
        <motion.div 
          className="mt-16 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GradientCard gradient="blue" className="p-6 text-white text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Academic Excellence</h3>
              <p className="text-sm opacity-90">CBSE curriculum with modern teaching methods</p>
            </GradientCard>
            
            <GradientCard gradient="yellow" className="p-6 text-white text-center">
              <Star className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">NEEV Program</h3>
              <p className="text-sm opacity-90">Integrated foundation for competitive exams</p>
            </GradientCard>
            
            <GradientCard gradient="purple" className="p-6 text-white text-center">
              <Heart className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Holistic Development</h3>
              <p className="text-sm opacity-90">Character building and value education</p>
            </GradientCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

              </div>
            </div>

            <div className="absolute top-24 right-12 lg:top-32 lg:right-16 animate-pulse">
              <div className="bg-yellow-400 rounded-full p-1.5 lg:p-2 shadow-lg">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900" />
              </div>
            </div>

            <div className="absolute bottom-16 left-16 lg:bottom-20 lg:left-20 animate-bounce delay-300">
              <div className="bg-yellow-400 rounded-lg p-1.5 lg:p-2 transform -rotate-12 shadow-lg">
                <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900" />
              </div>
            </div>

            <div className="absolute bottom-24 right-8 lg:bottom-32 lg:right-12 animate-pulse delay-500">
              <div className="bg-yellow-400 rounded-full p-2 lg:p-3 shadow-lg">
                <Lightbulb className="w-4 h-4 lg:w-6 lg:h-6 text-gray-900" />
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-16 left-16 lg:top-24 lg:left-24 w-32 h-32 lg:w-40 lg:h-40 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-16 right-16 lg:bottom-24 lg:right-24 w-24 h-24 lg:w-32 lg:h-32 border-2 border-yellow-400 rounded-full"></div>
              <div className="absolute top-32 right-32 lg:top-48 lg:right-40 w-16 h-16 lg:w-20 lg:h-20 bg-yellow-400 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
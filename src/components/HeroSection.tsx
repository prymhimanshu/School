import React from 'react';
import { ArrowRight, BookOpen, Star, Heart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Section - Yellow */}
          <div className="bg-yellow-400 flex-1 flex items-center justify-center p-8 lg:p-12">
            <div className="max-w-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                The roots of education
              </h2>
              <p className="text-gray-800 text-sm lg:text-base mb-6 leading-relaxed">
                Nuturing young minds with knowledge, creativity, and values to help them grow into
                strong and confident futures.
              </p>
              <Link to="/apply-admission" className="group bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-lg">
                <span>Apply for Admission</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Right Section - Blue */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex-1 flex items-center justify-center relative overflow-hidden p-8 lg:p-12">
            {/* Student Image Area */}
            <div className="relative z-10">
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-20">
                <div className="text-center">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 text-lg lg:text-xl font-bold">👩‍🎓</span>
                    </div>
                  </div>
                  <div className="text-white">
                    <p className="font-bold text-base lg:text-lg mb-1">Happy Student</p>
                    <p className="text-blue-100 text-xs lg:text-sm">Ready to Learn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-12 left-8 lg:top-16 lg:left-12 animate-bounce">
              <div className="bg-yellow-400 rounded-lg p-2 lg:p-3 transform rotate-12 shadow-lg">
                <BookOpen className="w-4 h-4 lg:w-6 lg:h-6 text-gray-900" />
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
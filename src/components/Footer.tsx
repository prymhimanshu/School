import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  // Track logged in user role for portal link
  const [portal, setPortal] = useState<{ label: string; to: string }>(
    { label: 'Student Portal', to: '/student-dashboard' }
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem('loggedUser');
      if (raw) {
        const user = JSON.parse(raw);
        if (user && user.loggedAs === 'teacher') {
          setPortal({ label: 'Teacher Portal', to: '/teacher-dashboard' });
        } else if (user && user.loggedAs === 'student') {
          setPortal({ label: 'Student Portal', to: '/student-dashboard' });
        } else {
          setPortal({ label: 'Student Portal', to: '/student-dashboard' });
        }
      } else {
        setPortal({ label: 'Student Portal', to: '/student-dashboard' });
      }
    } catch (e) {
      setPortal({ label: 'Student Portal', to: '/student-dashboard' });
    }
    // Listen for login/logout events
    const handler = () => {
      try {
        const raw = localStorage.getItem('loggedUser');
        if (raw) {
          const user = JSON.parse(raw);
          if (user && user.loggedAs === 'teacher') {
            setPortal({ label: 'Teacher Portal', to: '/teacher-dashboard' });
          } else if (user && user.loggedAs === 'student') {
            setPortal({ label: 'Student Portal', to: '/student-dashboard' });
          } else {
            setPortal({ label: 'Student Portal', to: '/student-dashboard' });
          }
        } else {
          setPortal({ label: 'Student Portal', to: '/student-dashboard' });
        }
      } catch (e) {
        setPortal({ label: 'Student Portal', to: '/student-dashboard' });
      }
    };
    window.addEventListener('authChanged', handler);
    return () => window.removeEventListener('authChanged', handler);
  }, []);
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold">Shakti Shanti Academy</h3>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed max-w-md text-sm">
                Nurturing young minds since 1999. We are committed to providing exceptional 
                education that prepares students for a bright future.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Ami, Ambika Sthan, Dighwara, Saran, Bihar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm">+91 707096273</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm">shaktishanti@ami.ac.in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">About Us</Link></li>
                <li><Link to="/team" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">Team</Link></li>
                <li><Link to="/gallery" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">Gallery</Link></li>
                <li><Link to="/apply-admission" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">Apply for Admission</Link></li>
                <li><Link to="/neev" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">NEEV</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-base font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link to={portal.to} className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">{portal.label}</Link></li>
                <li><Link to="/Notices" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">Notice</Link></li>
                <li><Link to="/calendar" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">Calendar</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 sm:mb-0">
              © 2025 Shakti Shanti Academy. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="www.facebook.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="www.twitter.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="www.instagram.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="www.linkedin.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
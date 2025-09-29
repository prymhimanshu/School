import React, { useEffect, useState } from 'react';
import { User, Lock, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, signInWithCredentials } from '../lib/supabase';
import toast from 'react-hot-toast';
import LoadingSpinner from './ui/LoadingSpinner';

const LoginSection: React.FC = () => {
  const [admissionId, setAdmissionId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123'); // Default password for demo
  const [role, setRole] = useState('student');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load logged user from localStorage
    try {
      const raw = localStorage.getItem('loggedUser');
      if (raw) setLoggedUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }

    // Listen for global auth changes
    const authHandler = (ev: Event) => {
      try {
        const ce = ev as CustomEvent;
        if (ce.detail) setLoggedUser(ce.detail);
        else setLoggedUser(null);
      } catch (e) {
        setLoggedUser(null);
      }
    };
    window.addEventListener('authChanged', authHandler as EventListener);

    return () => {
      window.removeEventListener('authChanged', authHandler as EventListener);
    };
  }, []);

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Administrator' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let credentials: any = {};
      
      if (role === 'student') {
        credentials.admission_id = admissionId;
      } else if (role === 'teacher') {
        credentials.teacher_id = teacherId;
      } else if (role === 'admin') {
        credentials.email = email;
      }

      const { user, error } = await signInWithCredentials(credentials, password, role);

      if (error || !user) {
        toast.error('Invalid credentials. Please try again.');
        return;
      }

      const userState = {
        ...user,
        loggedAs: role,
      };

      localStorage.setItem('loggedUser', JSON.stringify(userState));
      setLoggedUser(userState);
      
      // Notify other components
      window.dispatchEvent(new CustomEvent('authChanged', { detail: userState }));
      
      toast.success('Login successful!');

      // Navigate to role-specific dashboard
      if (role === 'teacher') {
        navigate('/teacher-dashboard', { state: { user: userState } });
      } else {
        navigate('/student-dashboard', { state: { user: userState } });
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    window.dispatchEvent(new CustomEvent('authChanged', { detail: null }));
    toast.success('Logged out successfully');
    navigate('/');
  };

  const goToDashboard = () => {
    if (!loggedUser) return;
    if (loggedUser.loggedAs === 'teacher') {
      navigate('/teacher-dashboard', { state: { user: loggedUser } });
    } else {
      navigate('/student-dashboard', { state: { user: loggedUser } });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {loggedUser ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={goToDashboard}
              role="button"
              tabIndex={0}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 flex items-center gap-4 cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img 
                  src={loggedUser.profile_photo || '/assest/logo.png'} 
                  alt="profile" 
                  className="w-16 h-18 object-cover rounded-xl border-2 border-yellow-200 shadow-lg" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600 font-medium">Signed in as</div>
                <div className="text-lg font-bold text-gray-900">{loggedUser.name}</div>
                <div className="text-sm text-gray-500">
                  {loggedUser.loggedAs === 'teacher' 
                    ? `Teacher ID: ${loggedUser.teacher_id}` 
                    : `Admission ID: ${loggedUser.admission_id}`
                  }
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="p-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-10 border border-white/20"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <LogIn className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
                <p className="text-gray-600">Access your school account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Login as</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="w-full bg-white/50 border border-gray-300 rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 flex items-center justify-between hover:bg-white/70"
                    >
                      <span className="capitalize font-medium">{roles.find(r => r.value === role)?.label}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showRoleDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden"
                      >
                        {roles.map((roleOption) => (
                          <button
                            key={roleOption.value}
                            type="button"
                            onClick={() => {
                              setRole(roleOption.value);
                              setShowRoleDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 font-medium"
                          >
                            {roleOption.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {role === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Admission ID</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={admissionId}
                          onChange={e => setAdmissionId(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
                          placeholder="Enter your Admission ID"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {role === 'teacher' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Teacher ID</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={teacherId}
                          onChange={e => setTeacherId(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
                          placeholder="Enter your Teacher ID"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {role === 'admin' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/70"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700'} text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2`}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Demo credentials: Use any admission ID from the database with password "123"
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
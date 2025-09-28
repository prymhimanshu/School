import React, { useEffect, useState } from 'react';
import { User, Lock, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Minimal fallback users in case fetch fails
const FALLBACK_USERS = [
  {
    admissionId: 'himanshu123',
    teacherId: 'himanshu123',
    email: 'himanshu@gmail.com',
    password: '123',
    name: 'Himanshu',
    roles: ['student', 'teacher', 'admin'],
    dob: '2005-01-01',
    bloodGroup: 'B+',
    className: 'XII',
    section: 'A',
    profilePhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
];

// Minimal fallback teachers
const FALLBACK_TEACHERS = [
  {
    teacherId: 'teacher001',
    password: 'abc',
    name: 'Teacher One',
    roles: ['teacher'],
    email: 'teacher.one@school.edu',
    profilePhoto: '/data/images/teacher_placeholder.jpg',
    classes: ['IX'],
    sections: ['A']
  }
];

const LoginSection: React.FC = () => {
  const [admissionId, setAdmissionId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState<any[]>(FALLBACK_USERS);
  const [teachers, setTeachers] = useState<any[]>(FALLBACK_TEACHERS);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState('');
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // load logged user from localStorage
    try {
      const raw = localStorage.getItem('loggedUser');
      if (raw) setLoggedUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }

    // listen for global auth changes so this component stays in sync
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

    // fetch users.json and teachers.json in parallel
    (async () => {
      try {
        const [uRes, tRes] = await Promise.all([
          fetch('/data/users.json'),
          fetch('/data/teachers.json')
        ]);

        if (!uRes.ok) throw new Error(`/data/users.json HTTP ${uRes.status}`);
        if (!tRes.ok) throw new Error(`/data/teachers.json HTTP ${tRes.status}`);

        const [uList, tList] = await Promise.all([uRes.json(), tRes.json()]);

        if (!Array.isArray(uList) || uList.length === 0) {
          console.warn('User data is empty or invalid.');
          setUsers(FALLBACK_USERS);
        } else setUsers(uList);

        if (!Array.isArray(tList) || tList.length === 0) {
          console.warn('Teacher data is empty or invalid.');
          setTeachers(FALLBACK_TEACHERS);
        } else setTeachers(tList);
      } catch (err) {
        console.warn('Could not load user/teacher data, using fallback.', err);
        setDataError('Could not load user/teacher data; using fallbacks.');
        setUsers(FALLBACK_USERS);
        setTeachers(FALLBACK_TEACHERS);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      window.removeEventListener('authChanged', authHandler as EventListener);
    };
  }, []);

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Administrator' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

  const normalize = (s: any) => (typeof s === 'string' ? s.trim().toLowerCase() : '');
  const pass = String(password || '').trim();

    let user: any = null;
    if (role === 'student') {
      user = users.find(u => normalize(u.admissionId) === normalize(admissionId) && String(u.password || '').trim() === pass);
    } else if (role === 'teacher') {
      // look up in teachers list specifically
      user = teachers.find(t => (
        (t.teacherId && normalize(t.teacherId) === normalize(teacherId)) ||
        normalize(t.email) === normalize(teacherId) ||
        normalize(t.teacherId) === normalize(teacherId)
      ) && String(t.password || '').trim() === pass);
      // fall back to users list if not found (in case teacher is stored there)
      if (!user) {
        user = users.find(u => (
          (u.teacherId && normalize(u.teacherId) === normalize(teacherId)) ||
          normalize(u.admissionId) === normalize(teacherId) ||
          normalize(u.email) === normalize(teacherId)
        ) && String(u.password || '').trim() === pass);
      }
    } else if (role === 'admin') {
      user = users.find(u => normalize(u.email) === normalize(email) && String(u.password || '').trim() === pass);
    }

    if (!user) {
      setError('Invalid credentials.');
      return;
    }

    const userState = {
      name: user.name,
      dob: user.dob,
      admissionId: user.admissionId,
      teacherId: user.teacherId,
      bloodGroup: user.bloodGroup,
      className: user.className,
      section: user.section,
      profilePhoto: user.profilePhoto,
      roles: user.roles || [],
      loggedAs: role, // record which role was used to login
    };

    try {
      localStorage.setItem('loggedUser', JSON.stringify(userState));
    } catch (e) {
      // ignore
    }

    setLoggedUser(userState);
    // notify other components
    try {
      window.dispatchEvent(new CustomEvent('authChanged', { detail: userState }));
    } catch (e) {
      // ignore (older browsers)
    }
    setSuccess('Login successful!');

    // navigate to role-specific dashboard
    if (role === 'teacher') {
      navigate('/teacher-dashboard', { state: { user: userState } });
    } else {
      navigate('/student-dashboard', { state: { user: userState } });
    }
  };

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    try {
      window.dispatchEvent(new CustomEvent('authChanged', { detail: null }));
    } catch (e) {
      // ignore
    }
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
    <section className="bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {loggedUser ? (
            <div
              onClick={goToDashboard}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-xl focus:outline-none"
            >
              <img src={loggedUser.profilePhoto} alt="profile" className="w-16 h-18 object-cover rounded-md border-2 border-yellow-200" />
              <div>
                <div className="text-sm text-gray-600">Signed in as</div>
                <div className="text-lg font-semibold text-gray-900">{loggedUser.name}</div>
                <div className="text-sm text-gray-500">{loggedUser.loggedAs === 'teacher' ? `Teacher ID: ${loggedUser.teacherId}` : `Admission ID: ${loggedUser.admissionId}`}</div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 lg:p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <LogIn className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Login</h3>
                <p className="text-gray-600 text-sm">Access your school account</p>
              </div>

              {loading && (
                <div className="text-sm text-gray-500 text-center mb-3">Loading user & teacher data...</div>
              )}
              {dataError && (
                <div className="text-sm text-red-600 text-center mb-3">{dataError}</div>
              )}
              {!loading && (
                <div className="text-sm text-green-600 text-center mb-3">
                  {role === 'teacher' ? `Loaded ${teachers.length} teacher(s)` : `Loaded ${users.length} user(s)`}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center font-semibold">{success}</div>}

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Login as</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 flex items-center justify-between text-sm hover:border-gray-400"
                    >
                      <span className="capitalize">{roles.find(r => r.value === role)?.label}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showRoleDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        {roles.map((roleOption) => (
                          <button
                            key={roleOption.value}
                            type="button"
                            onClick={() => {
                              setRole(roleOption.value);
                              setShowRoleDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-sm"
                          >
                            {roleOption.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {role === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admission ID</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={admissionId}
                          onChange={e => setAdmissionId(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm hover:border-gray-400"
                          placeholder="Enter your Admission ID"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm hover:border-gray-400"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={teacherId}
                          onChange={e => setTeacherId(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm hover:border-gray-400"
                          placeholder="Enter your Teacher ID"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm hover:border-gray-400"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm hover:border-gray-400"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm hover:border-gray-400"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'} text-white py-3 rounded-lg font-medium transition-all duration-300 transform ${loading ? '' : 'hover:scale-105'} text-sm shadow-lg`}
                >
                  {loading ? 'Loading users...' : 'Sign In'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginSection;

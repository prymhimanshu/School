import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trash2, BookOpen, ClipboardList, GraduationCap, Users, Calendar, Mail, Phone, Award, TrendingUp, CheckCircle, LogOut } from 'lucide-react';
import MarksManagement from './MarksManagement';
import { motion, AnimatePresence } from 'framer-motion';

interface TeacherData {
  name: string;
  teacherId?: string;
  loggedAs?: string;
  profilePhoto?: string;
  classes?: string[];
  sections?: string[];
}

const TeacherDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Prefer route state, otherwise fall back to localStorage session
  let teacher: TeacherData | undefined = location.state?.user;
  let loggedUser: any = null;
  try {
    const raw = localStorage.getItem('loggedUser');
    if (raw) loggedUser = JSON.parse(raw);
  } catch (e) {
    loggedUser = null;
  }
  if (!teacher && loggedUser && loggedUser.loggedAs === 'teacher') {
    teacher = loggedUser as TeacherData;
  }

  const [activeTab, setActiveTab] = useState<'homework' | 'marks'>('homework');
  const [className, setClassName] = useState('IX');
  const [section, setSection] = useState('NEEV');
  const [availableClasses, setAvailableClasses] = useState<string[] | null>(null);
  const [availableSections, setAvailableSections] = useState<string[] | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [profile, setProfile] = useState<any | null>(null);
  const [studentsCount, setStudentsCount] = useState<number | null>(null);
  const [teacherMap, setTeacherMap] = useState<Record<string,string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem('homeworks');
      if (!raw) return;
      const list = JSON.parse(raw);
      if (Array.isArray(list)) setHomeworks(list);
    } catch (e) {}
  }, []);

  // load teacher profile from public/data/teachers.json when available (use teacher.teacherId or loggedUser)
  useEffect(() => {
    (async () => {
      try {
        // find teacher id from location state or localStorage
        let rawUser: any = teacher;
        if (!rawUser) {
          const raw = localStorage.getItem('loggedUser');
          if (raw) rawUser = JSON.parse(raw);
        }
        const teacherId = rawUser?.teacherId || rawUser?.name || rawUser?.email;
        if (!teacherId) return;

  const [tRes, uRes] = await Promise.all([fetch('/data/teachers.json'), fetch('/data/users.json')]);
  if (!tRes.ok) return;
  const tList = await tRes.json();
        if (!Array.isArray(tList)) return;
        const found = tList.find((t: any) => String(t.teacherId) === String(teacherId));
        if (found) {
          setProfile(found);
          setAvailableClasses(Array.isArray(found.classes) ? found.classes.map((c: any) => String(c)) : null);
          setAvailableSections(Array.isArray(found.sections) ? found.sections.map((s: any) => String(s)) : null);
          // default selected values to first available if not already set
          if (Array.isArray(found.classes) && found.classes.length > 0) setClassName(String(found.classes[0]));
          if (Array.isArray(found.sections) && found.sections.length > 0) setSection(String(found.sections[0]));
          if (Array.isArray(found.subjects) && found.subjects.length > 0) setSubject(String(found.subjects[0]));
        }

        // also populate teacherMap for resolving createdBy
        try {
          const teachersList = Array.isArray(tList) ? tList : [];
          const map: Record<string,string> = {};
          teachersList.forEach((t: any) => {
            if (t.teacherId) map[String(t.teacherId)] = t.name || String(t.teacherId);
            if (t.email) map[String(t.email)] = t.name || String(t.email);
            if (t.name) map[String(t.name)] = t.name; // map name to itself for direct matches
          });
          setTeacherMap(map);
        } catch (e) {
          // ignore
        }

        // compute students count for classes/sections this teacher handles
        if (uRes.ok) {
          const users = await uRes.json();
          if (Array.isArray(users)) {
            if (found && Array.isArray(found.classes) && found.classes.length > 0) {
              const classesSet = new Set(found.classes.map((c: any) => String(c).trim()));
              const sectionsSet = found.sections && Array.isArray(found.sections) ? new Set(found.sections.map((s: any) => String(s).trim().toLowerCase())) : null;
              const count = users.filter((u: any) => {
                if (!u.roles || !Array.isArray(u.roles) || !u.roles.includes('student')) return false;
                if (!classesSet.has(String(u.className).trim())) return false;
                if (sectionsSet) {
                  return sectionsSet.has(String(u.section || '').trim().toLowerCase());
                }
                return true;
              }).length;
              setStudentsCount(count);
            }
          }
        }
      } catch (e) {
        // ignore
      }
    })();
  }, [teacher]);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!title.trim()) {
      setMessage('Please provide a title for the homework.');
      return;
    }
    // validate class/section against available lists if provided
    if (availableClasses && !availableClasses.includes(className)) {
      setMessage(`You cannot assign homework to class ${className}.`);
      return;
    }
    if (availableSections && !availableSections.includes(section)) {
      setMessage(`You cannot assign homework to section ${section}.`);
      return;
    }
    const hw = {
      id: Date.now(),
      className: String(className).trim(),
      section: String(section).trim(),
      title: title.trim(),
  subject: subject || (profile?.subjects && profile.subjects[0]) || '',
      description: description.trim(),
  submissionDate: submissionDate || null,
  createdBy: profile?.name || teacher?.name || profile?.teacherId || teacher?.teacherId || 'unknown',
      ts: Date.now(),
    };
    try {
      const raw = localStorage.getItem('homeworks');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(hw);
      localStorage.setItem('homeworks', JSON.stringify(list));
      setHomeworks(list);
      setMessage('Homework assigned. Students in the class will see it.');
      setTitle('');
      setDescription('');
  setSubmissionDate('');
    } catch (e) {
      setMessage('Could not save homework.');
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Delete this homework?')) return;
    try {
      const raw = localStorage.getItem('homeworks');
      const list = raw ? JSON.parse(raw) : [];
      const next = list.filter((h: any) => h.id !== id);
      localStorage.setItem('homeworks', JSON.stringify(next));
      setHomeworks(next);
      setMessage('Homework deleted.');
    } catch (e) {
      setMessage('Could not delete homework.');
    }
  };

  if (!teacher) {
    // If someone is logged in but as a student, show a specific message
    if (loggedUser && loggedUser.loggedAs === 'student') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">You are logged in as a student</h2>
            <p className="text-gray-600 mb-4">Use the Student Portal to access student features.</p>
            <button
              onClick={() => navigate('/student-dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Go to Student Portal
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login to access your teacher dashboard</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teacher Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {profile?.name || teacher.name}</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('loggedUser');
                navigate('/');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 bg-white rounded-2xl shadow-xl p-2 border border-gray-100"
        >
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('homework')}
              className={`flex-1 px-6 py-4 rounded-xl transition-all duration-200 ${
                activeTab === 'homework'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <ClipboardList className={`w-5 h-5 ${activeTab === 'homework' ? '' : 'opacity-60'}`} />
                <span className="font-semibold">Homework</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`flex-1 px-6 py-4 rounded-xl transition-all duration-200 ${
                activeTab === 'marks'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <BookOpen className={`w-5 h-5 ${activeTab === 'marks' ? '' : 'opacity-60'}`} />
                <span className="font-semibold">Marks Management</span>
              </div>
            </button>
          </div>
        </motion.div>
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl">
                  <img
                    src={profile?.profilePhoto || teacher.profilePhoto}
                    alt="teacher"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/data/images/Default.jpg';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{profile?.name || teacher.name}</h2>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Teacher ID: {profile?.teacherId || teacher.teacherId}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-blue-200" />
                      <span className="text-sm text-blue-100">Classes</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {(profile?.classes && profile.classes.length > 0) ? profile.classes.join(', ') : (teacher?.classes ? teacher.classes.join(', ') : '—')}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-200" />
                      <span className="text-sm text-blue-100">Sections</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {(profile?.sections && profile.sections.length > 0) ? profile.sections.join(', ') : (teacher?.sections ? teacher.sections.join(', ') : '—')}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-200" />
                      <span className="text-sm text-blue-100">Subjects</span>
                    </div>
                    <div className="text-lg font-bold">
                      {(profile?.subjects && profile.subjects.length > 0) ? profile.subjects.join(', ') : '—'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-sm text-blue-100 mb-1">Total Classes</div>
                    <div className="text-3xl font-bold">{profile?.classes ? profile.classes.length : '—'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-sm text-blue-100 mb-1">Total Students</div>
                    <div className="text-3xl font-bold">{studentsCount ?? '—'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-sm text-blue-100 mb-1">Attendance</div>
                    <div className="text-3xl font-bold text-green-300">95%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <AnimatePresence mode="wait">
          {activeTab === 'homework' ? (
          <motion.div
            key="homework"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Assign Homework</h3>
                  <p className="text-sm text-gray-600">Create and assign homework to your students</p>
                </div>
              </div>
            </div>

            <div className="p-8">
          <form onSubmit={handleAssign} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Class
                  </div>
                </label>
                {availableClasses ? (
                  <select value={className} onChange={e => setClassName(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    {availableClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <input value={className} onChange={e => setClassName(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Section
                  </div>
                </label>
                {availableSections ? (
                  <select value={section} onChange={e => setSection(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    {availableSections.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <input value={section} onChange={e => setSection(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Submission Date
                  </div>
                </label>
                <input type="date" value={submissionDate} onChange={e => setSubmissionDate(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Title
                </div>
              </label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter homework title" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Subject
                </div>
              </label>
              {profile?.subjects ? (
                <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                  {profile.subjects.map((s: string) => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Enter subject" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter homework description and instructions"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex-1">
                {message && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{message}</span>
                  </motion.div>
                )}
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Assign Homework
              </button>
            </div>
          </form>

          {homeworks.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-5 h-5 text-gray-700" />
                <h4 className="text-lg font-bold text-gray-900">Recent Homework Assignments</h4>
                <span className="ml-auto text-sm text-gray-500">{homeworks.length} total</span>
              </div>
              <div className="space-y-3">
                {homeworks.slice(0, 8).map((hw, index) => (
                  <motion.div
                    key={hw.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-gray-50 to-white p-5 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                            Class {hw.className}
                          </div>
                          <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                            Section {hw.section}
                          </div>
                          {hw.subject && (
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                              {hw.subject}
                            </div>
                          )}
                        </div>
                        <h5 className="font-bold text-gray-900 text-lg mb-1">{hw.title}</h5>
                        {hw.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{hw.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>By {teacherMap[hw.createdBy] || hw.createdBy}</span>
                          </div>
                          {(hw.submissionDate || hw.dueDate) && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Due: {hw.submissionDate || hw.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(hw.id)}
                        title="Delete"
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="marks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <MarksManagement
              userRole="teacher"
              userId={profile?.teacherId || teacher?.teacherId || ''}
              teacherId={profile?.teacherId || teacher?.teacherId}
            />
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeacherDashboard;

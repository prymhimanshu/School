import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface StudentData {
  name: string;
  dob: string;
  admissionId: string;
  bloodGroup: string;
  className: string;
  section: string;
  profilePhoto: string;
}

const StudentDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Prefer route state, otherwise fall back to localStorage session
  let student: StudentData | undefined = location.state?.user;
  let loggedUser: any = null;
  try {
    const raw = localStorage.getItem('loggedUser');
    if (raw) loggedUser = JSON.parse(raw);
  } catch (e) {
    loggedUser = null;
  }
  if (!student && loggedUser && loggedUser.loggedAs === 'student') {
    student = loggedUser as StudentData;
  }

  if (!student) {
    // If someone is logged in but as a teacher, show a specific message
    if (loggedUser && loggedUser.loggedAs === 'teacher') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">You are logged in as a teacher</h2>
            <p className="text-gray-600 mb-4">Use the Teacher Portal to access teacher features.</p>
            <button
              onClick={() => navigate('/teacher-dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Go to Teacher Portal
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login to access your student dashboard</p>
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

  // Small helper fallbacks
  const photoSrc = student.profilePhoto || '/assest/logo.png';
  const attendance = '96%'; // placeholder - replace with real data when available
  const lastExam = '88%'; // placeholder - replace with real data when available
  const [homeworks, setHomeworks] = React.useState<any[]>([]);
  const [teacherMap, setTeacherMap] = React.useState<Record<string, string>>({});

  // Load teachers and homeworks together so we can migrate legacy homework objects
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/teachers.json');
        const map: Record<string,string> = {};
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list)) {
            list.forEach((t: any) => {
              if (t.teacherId) map[String(t.teacherId)] = t.name || String(t.teacherId);
              if (t.email) map[String(t.email)] = t.name || String(t.email);
            });
          }
        }
        setTeacherMap(map);

        // Read homeworks and migrate legacy fields (dueDate -> submissionDate) and resolve createdBy
        try {
          const raw = localStorage.getItem('homeworks');
          if (!raw) return;
          const list = JSON.parse(raw);
          if (!Array.isArray(list)) return;

          let changed = false;
          const migrated = list.map((h: any) => {
            const copy = { ...h };
            // normalize submissionDate
            if (!copy.submissionDate && copy.dueDate) {
              copy.submissionDate = copy.dueDate;
              // keep dueDate for backward-compat but prefer submissionDate
              changed = true;
            }
            // resolve createdBy id/email -> teacher full name when possible
            if (copy.createdBy && map[String(copy.createdBy)]) {
              if (copy.createdBy !== map[String(copy.createdBy)]) {
                copy.createdBy = map[String(copy.createdBy)];
                changed = true;
              }
            }
            return copy;
          });

          // If migration changed any object, persist back to localStorage
          if (changed) {
            try {
              localStorage.setItem('homeworks', JSON.stringify(migrated));
            } catch (e) {
              // ignore write failures
            }
          }

          // Filter for this student
          const filtered = migrated.filter((h: any) => String(h.className).trim() === String(student.className).trim() && String(h.section).trim().toLowerCase() === String(student.section).trim().toLowerCase());
          setHomeworks(filtered);
        } catch (e) {
          // ignore homework parse errors
        }
      } catch (e) {
        // ignore teacher fetch errors
      }
    })();
  }, [student.className, student.section]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white min-h-screen px-4 py-8">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl border border-yellow-300 overflow-hidden flex flex-col">
        {/* Header: passport image + ID + quick stats */}
        <div className="px-6 py-4 border-b bg-blue-50">
          <div className="flex items-center gap-6">
            <img
              src={photoSrc}
              alt={`${student.name} profile`}
              className="w-28 h-32 object-cover rounded-md border-2 border-gray-200 shadow-sm"
            />

            <div>
              <h2 className="text-2xl font-bold text-blue-800">{student.name}</h2>
              <div className="mt-1 text-sm text-gray-600">Class: {student.className} • Section: {student.section}</div>
              <div className="mt-3 inline-flex items-baseline gap-3">
                <span className="text-xs text-gray-500">Admission ID</span>
                <span className="text-xl font-semibold text-blue-700">{student.admissionId}</span>
              </div>
            </div>

            <div className="ml-auto flex gap-4">
              <div className="bg-white p-3 rounded-lg shadow text-center">
                <div className="text-xs text-gray-500">Attendance</div>
                <div className="text-lg font-bold text-green-600">{attendance}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow text-center">
                <div className="text-xs text-gray-500">Last Exam</div>
                <div className="text-lg font-bold text-indigo-600">{lastExam}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column: details */}
          <div className="md:w-1/3 p-6 bg-yellow-100">
            <div className="text-center">
              <img
                src={photoSrc}
                alt="passport"
                className="w-32 h-36 object-cover rounded-md border-4 border-yellow-400 shadow-md mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-800">{student.name}</h3>
              <p className="text-sm text-gray-700 mt-2">DOB: {student.dob}</p>
            </div>

            <div className="mt-6 space-y-2 text-gray-700 text-sm">
              <div><span className="font-semibold">Admission No:</span> {student.admissionId}</div>
              <div><span className="font-semibold">Blood Group:</span> {student.bloodGroup}</div>
              <div><span className="font-semibold">Class:</span> {student.className}</div>
              <div><span className="font-semibold">Section:</span> {student.section}</div>
            </div>
          </div>

          {/* Right Column: stats and actions */}
          <div className="md:w-2/3 p-6 bg-gray-50">
            <h4 className="text-lg font-semibold text-blue-700 mb-4">Recent Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500">Attendance (This Term)</div>
                <div className="text-2xl font-bold text-green-600">{attendance}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500">Last Exam Score</div>
                <div className="text-2xl font-bold text-indigo-600">{lastExam}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500">Profile Status</div>
                <div className="text-lg font-semibold text-gray-800">Active</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-xs text-gray-500">Remarks</div>
                <div className="text-lg font-semibold text-gray-800">Good Progress</div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-md font-medium text-blue-700 mb-2">Student Details</h5>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div><span className="font-medium">Admission No:</span> {student.admissionId}</div>
                <div><span className="font-medium">Name:</span> {student.name}</div>
                <div><span className="font-medium">Date of Birth:</span> {student.dob}</div>
                <div><span className="font-medium">Blood Group:</span> {student.bloodGroup}</div>
                <div><span className="font-medium">Class:</span> {student.className}</div>
                <div><span className="font-medium">Section:</span> {student.section}</div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-md font-medium text-blue-700 mb-2">Homeworks for your class</h5>
              {homeworks.length === 0 ? (
                <div className="text-sm text-gray-500">No homework assigned.</div>
              ) : (
                <ul className="space-y-2">
                  {homeworks.map(hw => (
                    <li key={hw.id} className="p-3 bg-white rounded shadow-sm border">
                      <div className="text-sm text-gray-500">
                        {hw.title} {hw.subject && <span className="ml-2 text-xs">• {hw.subject}</span>} { (hw.submissionDate || hw.dueDate) && <span className="ml-2 text-xs">(Submission: {hw.submissionDate || hw.dueDate})</span> }
                      </div>
                      <div className="text-sm text-gray-700">{hw.description}</div>
                      <div className="text-xs text-gray-400 mt-1">Assigned by {teacherMap[hw.createdBy] || hw.createdBy}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
	{ title: '1. Our Aim', desc: 'Our aim through NEEV is to build a strong foundation from Class 8 onwards, bridging the gap between school studies and competitive exams like JEE and NEET.' },
	{ title: '2. Faculties', desc: 'Experienced faculty including IITians and NEET-qualified teachers provide concept clarity and exam guidance.' },
	{ title: '3. Engagement', desc: 'Weekly extracurricular activities help holistic development.' },
	{ title: '4. Modern Facilities', desc: 'Smart classrooms and comfortable environment for learning.' },
	{ title: '5. Excellence', desc: 'We aim to help students reach their highest potential.' },
];

const themeYellow = '#fcd116';
const themeBlue = '#2563eb';

const Neev: React.FC = () => {
	const navigate = useNavigate();
	const [showForm, setShowForm] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [progress, setProgress] = useState<boolean[]>([false, false, false, false]);
	const [currentRole, setCurrentRole] = useState<string | null>(null);

	// form fields
	const [name, setName] = useState('');
	const [fatherName, setFatherName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [dob, setDob] = useState('');
	const [aim, setAim] = useState('');
	const [exams, setExams] = useState('');

	useEffect(() => {
		try {
			const raw = localStorage.getItem('loggedUser');
			if (!raw) return;
			const user = JSON.parse(raw);
			const key = `neevApplication_${user.admissionId || 'guest'}`;
			const app = localStorage.getItem(key);
			if (app) setSubmitted(true);
			setCurrentRole(user.loggedAs || null);
			// load progress if present
			const progKey = `neevProgress_${user.admissionId || 'guest'}`;
			const prog = localStorage.getItem(progKey);
			if (prog) {
				try {
					const arr = JSON.parse(prog);
					if (Array.isArray(arr) && arr.length === 4) setProgress(arr);
				} catch (e) {}
			}
		} catch (e) {}
	}, []);

	const parseGrade = (className: any): number | null => {
		if (!className) return null;
		const s = String(className).trim();
		const n = Number(s);
		if (!Number.isNaN(n)) return n;
		const map: Record<string, number> = {
			I: 1,
			II: 2,
			III: 3,
			IV: 4,
			V: 5,
			VI: 6,
			VII: 7,
			VIII: 8,
			IX: 9,
			X: 10,
			XI: 11,
			XII: 12,
		};
		const up = s.toUpperCase();
		if (map[up]) return map[up];
		const m = s.match(/(\d+)/);
		if (m) return Number(m[1]);
		return null;
	};

	const handleApplyClick = () => {
		setMessage(null);
		try {
			const raw = localStorage.getItem('loggedUser');
			if (!raw) {
				setMessage('Please sign in to apply for NEEV.');
				return;
			}
			const user = JSON.parse(raw);
				// ensure the person is logging in as a student
				if (user.loggedAs && user.loggedAs !== 'student') {
					setMessage('Please login as a student to apply for NEEV.');
					return;
				}

				// check grade eligibility first
				const grade = parseGrade(user.className || user.class || user.className);
				if (grade === null || grade < 8) {
					setMessage('Only students of Class 8 or above can apply for NEEV.');
					return;
				}

				// then check whether they're already enrolled in NEEV
				const section = (user.section || '').toString().trim().toLowerCase();
				if (section === 'neev' || section === 'n') {
					setMessage('You are already enrolled in NEEV.');
					return;
				}
			// prefill
			setName(user.name || '');
			setEmail(user.email || '');
			setPhone(user.phone || '');
			setDob(user.dob || '');
			const key = `neevApplication_${user.admissionId || 'guest'}`;
			const prev = localStorage.getItem(key);
			if (prev) {
				try {
					const p = JSON.parse(prev);
					setName(p.name || user.name || '');
					setFatherName(p.fatherName || '');
					setPhone(p.phone || '');
					setEmail(p.email || '');
					setDob(p.dob || '');
					setAim(p.aim || '');
					setExams(p.exams || '');
					setSubmitted(!!p.submitted);
				} catch (e) {}
			}
			setShowForm(true);
		} catch (e) {
			setMessage('Unable to verify login status. Please try again.');
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const raw = localStorage.getItem('loggedUser');
			if (!raw) {
				setMessage('Please sign in first.');
				return;
			}
			const user = JSON.parse(raw);
			const key = `neevApplication_${user.admissionId || 'guest'}`;
			const payload = { applicant: user.admissionId || 'guest', name, fatherName, phone, email, dob, aim, exams, submitted: true, ts: Date.now() };
			localStorage.setItem(key, JSON.stringify(payload));
			setSubmitted(true);
			setShowForm(false);
			setMessage('Application submitted. We will contact you.');

			// initialize progress: first step completed (Fill form)
			const progKey = `neevProgress_${user.admissionId || 'guest'}`;
			const init = [true, false, false, false];
			localStorage.setItem(progKey, JSON.stringify(init));
			setProgress(init);
		} catch (e) {
			setMessage('Could not save application.');
		}
	};

	const advanceStep = (idx: number) => {
		try {
			const raw = localStorage.getItem('loggedUser');
			if (!raw) return;
			const user = JSON.parse(raw);
			const progKey = `neevProgress_${user.admissionId || 'guest'}`;
			const next = [...progress];
			if (idx >= 0 && idx < next.length) next[idx] = true;
			localStorage.setItem(progKey, JSON.stringify(next));
			setProgress(next);
		} catch (e) {}
	};

	return (
		<div className="max-w-3xl mx-auto py-16 px-4">
			<div className="flex items-center mb-6">
				<GraduationCap className="w-20 h-20 text-blue-700" />
				<h2 className="text-4xl font-extrabold text-gray-900 tracking-tight ml-4">NEEV</h2>
			</div>

			<p className="text-lg text-gray-700 mb-8">
				NEEV is our school’s School Integrated Foundation Program for motivated students starting from Class 8.
			</p>

			<div className="space-y-6">
				{steps.map((step, idx) => {
					const isYellow = idx % 2 === 0;
					return (
						<div key={step.title} className="rounded-xl shadow-md p-6" style={{ background: isYellow ? themeYellow : themeBlue }}>
							<h3 className="text-2xl font-bold mb-2" style={{ color: isYellow ? themeBlue : themeYellow }}>{step.title}</h3>
							<p className="text-gray-900 mb-2">{step.desc}</p>
							{idx === steps.length - 1 && (
								<div className="mt-4 flex justify-end">
									<button onClick={handleApplyClick} className="font-semibold px-6 py-2 rounded-lg shadow transition-colors bg-blue-600 text-white hover:bg-blue-700">
										{submitted ? 'View / Edit Application' : 'Apply for NEEV'}
									</button>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{message && (
				<div className="mt-6 max-w-2xl mx-auto p-4 bg-yellow-50 border border-yellow-200 rounded">
					<div className="text-sm text-yellow-900">{message}</div>
					{!localStorage.getItem('loggedUser') && (
						<div className="mt-2">
							<button onClick={() => navigate('/')} className="text-sm font-medium text-blue-600 underline">Go to login</button>
						</div>
					)}

					{/* Progress tracker - show when submitted */}
					{submitted && (
						<div className="mt-8 bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
							<h3 className="text-lg font-semibold mb-4">Application Progress</h3>
							<div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
								{['Fill form', 'Visit NEEV', 'Interview & Test', 'Done'].map((label, i) => (
									<div key={label} className="p-4 rounded-md border flex flex-col items-center justify-center">
										<div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress[i] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
											{progress[i] ? '✓' : i + 1}
										</div>
										<div className="mt-2 text-sm text-center">{label}</div>
										{/* button to advance step for testing */}
										{!progress[i] && currentRole !== 'student' && (
											<button onClick={() => advanceStep(i)} className="mt-2 text-xs text-blue-600 underline">Mark done</button>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}

			{showForm && (
				<div className="mt-8 bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
					<h3 className="text-lg font-semibold mb-4">NEEV Application Form</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Full name</label>
								<input value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Father's name</label>
								<input value={fatherName} onChange={e => setFatherName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Phone</label>
								<input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Email</label>
								<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Date of birth</label>
								<input type="date" value={dob} onChange={e => setDob(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Aim (short)</label>
							<input value={aim} onChange={e => setAim(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Exams you want to qualify / target</label>
							<input value={exams} onChange={e => setExams(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g., JEE, NEET, NTSE" />
						</div>

						<div className="flex items-center gap-3">
							<button type="submit" className="bg-yellow-400 px-5 py-2 rounded-md font-semibold">Submit Application</button>
							<button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-600">Cancel</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Neev;

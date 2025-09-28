import React, { useState } from 'react';

const themeYellow = '#fcd116';
const themeBlue = '#2563eb';

const steps = [
  { label: 'Fill Application Form' },
  { label: 'Visit School' },
  { label: 'Entrance Test' },
  { label: 'Interview' },
  { label: 'Admission Confirmation' },
];

const ApplyAdmission: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-8 text-center" style={{ color: themeBlue }}>Apply for Admission</h2>
        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border-4" style={{ borderColor: themeYellow }}>
            <div className="mb-4">
              <label className="block font-bold mb-1 text-gray-900">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1 text-gray-900">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1 text-gray-900">Phone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="mb-6">
              <label className="block font-bold mb-1 text-gray-900">Grade Applying For</label>
              <select name="grade" value={form.grade} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option value="">Select Grade</option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3 rounded-lg font-bold text-white" style={{ background: themeBlue }}>Submit Application</button>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 border-4" style={{ borderColor: themeYellow }}>
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: themeBlue }}>Admission Process</h3>
            <ol className="space-y-4">
              {steps.map((step, idx) => (
                <li key={step.label} className="flex items-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold mr-4 ${idx === 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {idx === 0 ? '✓' : idx + 1}
                  </span>
                  <span className="text-lg font-medium text-gray-900">{step.label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-green-600 font-semibold">Your application has been submitted! Please follow the next steps for admission.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplyAdmission;

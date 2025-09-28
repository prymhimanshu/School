import React from 'react';

const themeYellow = '#fcd116';
const themeBlue = '#2563eb';

const ContactSection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center" style={{ color: themeBlue }}>Contact Us</h2>
      <div className="bg-white rounded-xl shadow-lg p-8 border-4" style={{ borderColor: themeYellow }}>
        <div className="mb-4">
          <span className="block font-bold text-gray-900 mb-1">Address:</span>
          <span className="text-gray-700">Ami, Ambika Sthan, Dighwara, Saran, Bihar</span>
        </div>
        <div className="mb-4">
          <span className="block font-bold text-gray-900 mb-1">Phone:</span>
          <span className="text-gray-700">+91 707096273</span>
        </div>
        <div className="mb-4">
          <span className="block font-bold text-gray-900 mb-1">Email:</span>
          <span className="text-gray-700">shaktishanti@ami.ac.in</span>
        </div>
        <div className="mb-4">
          <span className="block font-bold text-gray-900 mb-1">Website:</span>
          <span className="text-gray-700">www.ssaami.ac.in</span>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;

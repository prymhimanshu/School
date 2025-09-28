import React from 'react';

const themeYellow = '#fcd116';
const themeBlue = '#2563eb';

const team = [
  {
    name: 'MR MANOJ KUMAR',
    title: 'Director',
    img: 'https://www.ssaami.ac.in/director.jpeg',
  },
  {
    name: 'MRS KUNDAN SINGH',
    title: 'Principal',
    img: 'https://www.ssaami.ac.in/principal.jpeg',
  },
];

const TeamSection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center" style={{ color: themeBlue }}>SSA TEAM</h2>
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {team.map(member => (
          <div key={member.name} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 border-4" style={{ borderColor: themeYellow }}>
            <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4" style={{ borderColor: themeBlue }} />
            <h3 className="text-xl font-bold mb-1" style={{ color: themeBlue }}>{member.name}</h3>
            <p className="text-yellow-600 font-semibold">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;

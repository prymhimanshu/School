
import React from 'react';


const About: React.FC = () => {
       return (
	       <div className="max-w-3xl mx-auto py-16 px-4">
		       {/* School Image with bold, diagonal background */}
		       <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
			       <div 
				       className="p-4 flex justify-center items-center"
				       style={{
					       background: 'linear-gradient(135deg, #2563eb 0 60%, #fde047 60% 100%)',
					       borderRadius: '1rem',
				       }}
			       >
				       <img 
					       src="/assest/School.png" 
					       alt="S.S. Academy Building" 
					       className="rounded-xl w-full max-h-80 object-cover border-8 border-white shadow-md"
				       />
			       </div>
		       </div>
		       <h2 className="text-3xl font-bold mb-4">About Us</h2>
		       <p className="text-lg text-gray-700 mb-4">
			       This S.S. Academy is a co-educational institution established on 7th Aug. 1999. It is run by S.S. Trust Patna (Bihar) an organization registered under the Trust Registration Act. The school began with 80 students and four teaching staff is just 3 km away from Dighwara Railway Station towards the west in the vicinity of goddess Maa Ambika Bhawani, Ambika Sthan, Ami, Saran.
		       </p>
		       <p className="text-gray-600">
			       Today the school has turned from an ice ball to an avalanche and is affiliated to CBSE, BHARAT, up to 10+2.  We have classes from Std.- I to Std.- XII with a strength of 1800 students and a devoted team of 81 staff. The true essence of SSA lies, not in its infrastructure of four walls but its overall purpose of imparting quality education includes the art of shaping individual's a personality through physical, emotional, intellectual and spiritual development. The school, therefore, devotes itself assiduously to nurturing of students in such a way that they excel in all walks of life, make a mark in every field of human activities and become worthy citizens of 21st century not only infused with qualities of character but also a capability to withstand the onslaught of modern day degeneration of values. The true riches of SSA lies in producing gentle SSAians who are truthful and represent the school motto.
		       </p>
	       </div>
       );
};

export default About;

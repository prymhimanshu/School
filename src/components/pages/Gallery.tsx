
import React, { useState } from 'react';

const images = [
	'https://www.ssaami.ac.in/home-photos/1-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/2-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/3-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/4-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/5-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/6-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/7-1024.jpeg',
	'https://www.ssaami.ac.in/home-photos/8-1024.jpeg',
];

const themeYellow = '#fcd116';
const themeBlue = '#2563eb';

const Gallery: React.FC = () => {
	const [selected, setSelected] = useState<string | null>(null);

	return (
		<div className="max-w-5xl mx-auto py-16 px-4">
			<h2 className="text-4xl font-extrabold mb-8 flex items-center">
				<img src="/assest/logo.png" alt="Logo" className="h-10 w-10 mr-3 rounded-full" style={{ background: themeYellow }} />
				<span style={{ color: themeBlue }}>Gallery</span>
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{images.map((img, idx) => (
					<div
						key={img}
						className="rounded-xl overflow-hidden shadow-lg cursor-pointer border-4"
						style={{ borderColor: idx % 2 === 0 ? themeYellow : themeBlue }}
						onClick={() => setSelected(img)}
					>
						<img src={img} alt={`School ${idx + 1}`} className="w-full h-56 object-cover transition-transform duration-200 hover:scale-105" />
					</div>
				))}
			</div>

			{/* Modal for selected image */}
			{selected && (
				<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
					<div className="bg-white rounded-xl p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
						<button
							className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-red-500"
							onClick={() => setSelected(null)}
						>
							&times;
						</button>
						<img src={selected} alt="Selected" className="w-full h-96 object-contain rounded-lg" />
					</div>
				</div>
			)}

			{/* User interaction: Upload suggestion */}
			<div className="mt-12 bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4" style={{ borderColor: themeYellow }}>
				<h3 className="text-2xl font-bold mb-2 text-gray-900">Want to see your school memories here?</h3>
				<p className="mb-4 text-gray-700">Suggest an image to add to our gallery! (Feature coming soon)</p>
				<button
					className="bg-themeBlue hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors"
					style={{ background: themeBlue }}
					disabled
				>
					Suggest Image
				</button>
			</div>
		</div>
	);
};

export default Gallery;

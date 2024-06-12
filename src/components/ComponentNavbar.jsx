// components/Header.jsx
import React from 'react';

const ComponentNavbar = ({ toggleComponent }) => {
	return (
		<div className='w-full mt-8 p-4 flex justify-center items-center gap-8'>
			<button
				className='text-white text-2xl hover:text-yellow-500 active:text-yellow-500 focus:outline-none'
				onClick={() => toggleComponent('entries')}>
				Entrées
			</button>
			<button
				className='text-white text-2xl hover:text-yellow-500 active:text-yellow-500 focus:outline-none'
				onClick={() => toggleComponent('courses')}>
				Courses
			</button>
			<button
				className='text-white text-2xl hover:text-yellow-500 active:text-yellow-500 focus:outline-none'
				onClick={() => toggleComponent('imprevus')}>
				Imprévus
			</button>
		</div>
	);
};

export default ComponentNavbar;

// components/Navbar.jsx
import React from 'react';

const Navbar = ({
	years,
	selectedYear,
	setSelectedYear,
	months,
	selectedMonth,
	setSelectedMonth,
}) => {
	return (
		<>
			{/* NAVBAR ANNÉES */}
			<nav className='w-full flex justify-center items-center mt-4'>
				<div className='flex flex-wrap justify-center items-center gap-2'>
					{years.map((year) => (
						<button
							key={year}
							onClick={() => setSelectedYear(year)}
							className={`px-4 py-2 mx-1 rounded ${
								year === selectedYear
									? 'bg-slate-600 text-white'
									: 'bg-slate-400 text-slate-900'
							}`}>
							{year}
						</button>
					))}
				</div>
			</nav>

			{/* NAVBAR MOIS DE L'ANNÉE */}
			<nav className='w-full flex justify-center items-center mt-4'>
				<div className='flex flex-wrap justify-center items-center gap-2'>
					{months.map((month, index) => (
						<button
							key={index}
							onClick={() => setSelectedMonth(index)}
							className={`px-4 py-2 mx-1 rounded ${
								index === selectedMonth
									? 'bg-slate-600 text-white'
									: 'bg-slate-400 text-slate-900'
							}`}>
							{month}
						</button>
					))}
				</div>
			</nav>
		</>
	);
};

export default Navbar;

// components/Courses.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const Courses = ({
	courses,
	budgetCourses,
	getTotalCourses,
	handleAddCourse,
	handleCourseChange,
	handleSaveCourses,
}) => {
	return (
		<section className='w-auto bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<h2 className='text-2xl text-slate-50 font-bold text-center mb-5 tracking-wide'>
				Courses
			</h2>

			<div className='flex flex-col items-center mb-5'>
				<div className='flex justify-center items-center gap-4 mb-4'>
					<label className='text-emerald-500 text-lg'>
						Budget : {parseFloat(budgetCourses)} €
					</label>
					<label className='text-cyan-500 text-lg'>
						En Cours : {getTotalCourses()} €
					</label>
					<label className='text-rose-500 text-lg'>
						Reste :{' '}
						{(
							parseFloat(budgetCourses) - parseFloat(getTotalCourses())
						).toFixed(2)}{' '}
						€
					</label>
				</div>

				<button
					type='button'
					className='w-auto flex justify-center items-center gap-4 h-10 mt-2 mb-4 text-lg text-center bg-green-700 p-4 rounded text-slate-50 hover:bg-green-600'
					title='Ajouter une course'
					onClick={handleAddCourse}>
					<span>Ajouter</span>
					<FontAwesomeIcon icon={faPlus} />
				</button>

				{courses.map((course, index) => (
					<div key={index} className='flex justify-center items-center mb-2'>
						<input
							type='text'
							placeholder='Libellé'
							value={course.label}
							onChange={(e) =>
								handleCourseChange(index, 'label', e.target.value)
							}
							className='w-40 p-2 rounded bg-gray-700 text-white mr-2'
						/>

						<input
							type='number'
							placeholder='Montant'
							value={course.amount}
							onChange={(e) =>
								handleCourseChange(index, 'amount', e.target.value)
							}
							className='w-30 p-2 rounded bg-gray-700 text-white'
						/>
					</div>
				))}

				{/* <button
					type='button'
					className='w-40 mt-4 text-lg text-center bg-blue-500 p-2 rounded text-slate-50 hover:bg-blue-600'
					title='Valider les courses'
					onClick={handleSaveCourses}>
					<FontAwesomeIcon icon={faCheck} className='mr-2' />
					Valider
				</button> */}
			</div>
		</section>
	);
};

export default Courses;

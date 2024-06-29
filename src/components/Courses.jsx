// ! Composant gérant les courses du mois

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Courses = ({
	budgetCourses,
	tempBudgetCourses,
	setTempBudgetCourses,
	handleSaveBudgetCourses,
	getTotalCourses,
	handleAddCourse,
	courses,
	handleCourseChange,
	handleDeleteCourse,
}) => {
	// ! ** VARIABLES **
	const resteCourses =
		parseFloat(budgetCourses) - parseFloat(getTotalCourses()).toFixed(2);

	return (
		<section className='w-full bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			{/* Boutons CTA */}
			<div className='flex flex-wrap justify-between items-center gap-42 mb-10'>
				<div className='flex justify-center items-center gap-4'>
					<input
						type='number'
						value={tempBudgetCourses}
						onChange={(e) => setTempBudgetCourses(e.target.value)}
						className='w-44 p-2 rounded bg-gray-700 text-white'
						placeholder='Modifier le budget'
					/>
					<button
						type='button'
						className='w-auto text-lg text-center bg-blue-500 px-4 py-1 rounded text-slate-50 hover:bg-blue-600 tracking-wide'
						onClick={handleSaveBudgetCourses}
						title='Valider le budget du mois'>
						Valider
					</button>
				</div>
				<h2 className='text-2xl text-amber-400 text-center tracking-widest'>
					COURSES
					<p className='mt-2 text-sm italic font-light text-yellow-500'>
						Toutes les courses du mois
					</p>
				</h2>
				<button
					type='button'
					className='w-auto h-10 flex flex-center items-center gap-2 text-lg text-center bg-green-700 p-2 rounded text-slate-50 hover:bg-green-600'
					onClick={handleAddCourse}
					title='Ajouter une nouvelle course'>
					Ajouter des courses
					{/* <FontAwesomeIcon icon={faPlus} /> */}
				</button>
			</div>

			<div className='flex flex-col items-center mb-5'>
				{/* Résumé */}
				<div className='flex justify-center items-center gap-20 mb-8'>
					<label className='text-cyan-600 text-2xl'>
						Budget courses : {parseFloat(budgetCourses)} €
					</label>
					<label className='text-slate-50 text-2xl tracking-wide'>
						Dépenses en cours : {getTotalCourses()} €
					</label>
					{resteCourses > 0 && (
						<label className='text-green-600 text-2xl animate-pulse'>
							Reste : {resteCourses} €
						</label>
					)}
					{resteCourses < 0 && (
						<label className='text-red-500 text-2xl animate-pulse'>
							Dépassement : {resteCourses} €
						</label>
					)}
				</div>

				{/* Mapping des courses */}
				{courses.map((course, index) => (
					<div
						key={index}
						className='flex justify-center items-center gap-5 mb-2'>
						<input
							type='text'
							placeholder='Libellé'
							value={course.label}
							onChange={(e) =>
								handleCourseChange(index, 'label', e.target.value)
							}
							className='w-72 p-2 rounded bg-gray-700 text-slate-50 mr-2 text-center'
						/>

						<input
							type='number'
							placeholder='Montant'
							value={course.amount}
							onChange={(e) =>
								handleCourseChange(index, 'amount', e.target.value)
							}
							className='max-w-40 p-2 rounded bg-gray-700 text-slate-50 text-center'
						/>
						<button
							type='button'
							className='w-auto flex justify-center items-center h-10 ml-5 text-lg text-center bg-red-500 p-2 rounded text-slate-50 hover:bg-red-600'
							title='Supprimer la course'
							onClick={() => handleDeleteCourse(course.id)}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default Courses;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Entries = ({
	prime,
	salaireJacques,
	tempSalaireJacques,
	setTempSalaireJacques,
	handleSaveSalaireJacques,
	salaireAstrid,
	tempSalaireAstrid,
	setTempSalaireAstrid,
	handleSaveSalaireAstrid,
	revenuCaf,
	tempRevenuCaf,
	setTempRevenuCaf,
	handleSaveRevenuCaf,
}) => {
	return (
		<div className='w-full flex justify-center items-center'>
			<section className='w-auto bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
				<h2 className='text-2xl text-green-500 font-bold text-center mb-5 tracking-widest'>
					ENTRÉES
				</h2>

				{/* SALAIRE JACQUES */}
				<div className='flex flex-col items-start mb-4'>
					<label className='text-slate-50 text-lg mb-2'>
						Salaire JP :{' '}
						<span className='text-green-500'>
							{prime ? (
								<>
									{salaireJacques !== null
										? parseFloat(salaireJacques).toFixed(2)
										: '0'}{' '}
									€ (pi)
								</>
							) : (
								<>
									{salaireJacques !== null
										? parseFloat(salaireJacques).toFixed(2)
										: '0'}{' '}
									€
								</>
							)}
						</span>
					</label>
					<div className='flex justify-center items-center'>
						<input
							type='number'
							value={tempSalaireJacques}
							onChange={(e) => setTempSalaireJacques(e.target.value)}
							className='w-30 p-2 rounded bg-gray-700 text-white'
							title='Entrer le salaire de Jacques du mois'
							required
						/>
						<button
							type='button'
							className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
							title='Ajouter le salaire'
							onClick={handleSaveSalaireJacques}>
							<FontAwesomeIcon icon={faCheck} />
						</button>
					</div>
				</div>

				{/* SALAIRE ASTRID */}
				<div className='flex flex-col items-start'>
					<label className='text-slate-50 text-lg mb-2'>
						Salaire AAC :{' '}
						<span className='text-green-500'>
							{salaireAstrid !== null
								? parseFloat(salaireAstrid).toFixed(2)
								: '0'}{' '}
							€
						</span>
					</label>
					<div className='flex justify-center items-center'>
						<input
							type='number'
							value={tempSalaireAstrid}
							onChange={(e) => setTempSalaireAstrid(e.target.value)}
							className='w-30 p-2 rounded bg-gray-700 text-white'
							title='Entrer le salaire de Jacques du mois'
							required
						/>
						<button
							type='button'
							className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
							title='Ajouter le salaire'
							onClick={handleSaveSalaireAstrid}>
							<FontAwesomeIcon icon={faCheck} />
						</button>
					</div>
				</div>

				{/* CAF */}
				<div className='flex flex-col items-start mt-4'>
					<label className='text-slate-50 text-lg mb-2'>
						ALLOCS (CAF) :{' '}
						<span className='text-green-500'>
							{revenuCaf !== null ? parseFloat(revenuCaf).toFixed(2) : '0'} €
						</span>
					</label>
					<div className='flex justify-center items-center'>
						<input
							type='number'
							value={tempRevenuCaf}
							onChange={(e) => setTempRevenuCaf(e.target.value)}
							className='w-30 p-2 rounded bg-gray-700 text-white'
							title='Entrer les allocations du mois'
							required
						/>
						<button
							type='button'
							className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
							title='Ajouter les allocations'
							onClick={handleSaveRevenuCaf}>
							<FontAwesomeIcon icon={faCheck} />
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Entries;

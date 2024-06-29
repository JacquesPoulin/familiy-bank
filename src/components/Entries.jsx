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
	// ! FONCTION : Calculer le total des entrées
	const totalEntrees =
		(parseFloat(salaireJacques) || 0) +
		(parseFloat(salaireAstrid) || 0) +
		(parseFloat(revenuCaf) || 0);

	return (
		<div className='w-full flex justify-center items-center'>
			<section className='w-full bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
				<h2 className='text-2xl text-green-600 font-bold text-center mb-5 tracking-widest'>
					ENTRÉES
					<p className='mt-2 text-lg italic font-light text-yellow-500'>
						{/* Affichage du total des entrées */}
						Entrées fixes du mois :{' '}
						<span className='animate-pulse'>{totalEntrees.toFixed(2)} €</span>
					</p>
				</h2>

				{/* ENTRÉES CONTAINER */}
				<div className='flex justify-between items-center gap-4'>
					{/* SALAIRE JACQUES */}
					<div className='flex flex-col justify-center items-center gap-1'>
						<label className='w-full text-slate-50 text-lg mb-2'>
							Salaire Jacques :{' '}
							<span className='text-green-600'>
								{prime ? (
									<>
										{salaireJacques !== null
											? parseFloat(salaireJacques).toFixed(2)
											: '0'}{' '}
										€ (pi)*
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
						<div className='flex justify-around items-center'>
							<input
								type='number'
								value={tempSalaireJacques}
								onChange={(e) => setTempSalaireJacques(e.target.value)}
								className='w-52 p-2 rounded bg-gray-700 text-white'
								placeholder='Modifier salaire Jacques'
								title='Entrer le salaire de Jacques du mois'
								required
							/>
							<button
								type='button'
								className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
								title='Ajouter/Modifier le salaire de Jacques'
								onClick={handleSaveSalaireJacques}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					</div>

					{/* SALAIRE ASTRID */}
					<div className='flex flex-col justify-center items-center gap-1'>
						<label className='w-full text-slate-50 text-lg mb-2 tracking-wide'>
							Salaire Astrid :{' '}
							<span className='text-green-600'>
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
								className='w-52 p-2 rounded bg-gray-700 text-white'
								placeholder='Modifier salaire Astrid'
								title='Entrer le salaire de Jacques du mois'
								required
							/>
							<button
								type='button'
								className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
								title="Ajouter/Modifier le salaire d'Astrid"
								onClick={handleSaveSalaireAstrid}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					</div>

					{/* CAF */}
					<div className='flex flex-col justify-around items-center gap-1 mb-4'>
						<label className='w-full text-slate-50 text-lg mb-2 tracking-wider'>
							ALLOCS (CAF) :{' '}
							<span className='text-green-600'>
								{revenuCaf !== null ? parseFloat(revenuCaf).toFixed(2) : '0'} €
							</span>
						</label>
						<div className='flex justify-center items-center'>
							<input
								type='number'
								value={tempRevenuCaf}
								onChange={(e) => setTempRevenuCaf(e.target.value)}
								className='w-52 p-2 rounded bg-gray-700 text-white'
								placeholder='Modifier allocations'
								title='Entrer les allocations du mois'
								required
							/>
							<button
								type='button'
								className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
								title='Ajouter/Modifier les allocations'
								onClick={handleSaveRevenuCaf}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					</div>
				</div>
				{prime ? (
					<div className='w-full flex justify-center items-center mt-5'>
						<p className='text-white'>* Prime inclue</p>
					</div>
				) : null}
			</section>
		</div>
	);
};

export default Entries;

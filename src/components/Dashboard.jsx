// components/Dashboard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, faCheck } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({
	prime,
	tempPrime,
	setTempPrime,
	handleSavePrime,
	compte,
	tempCompte,
	setTempCompte,
	handleSaveCompte,
	epargne,
	tempEpargne,
	setTempEpargne,
	handleSaveEpargne,
}) => {
	return (
		<section className='bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto mt-10'>
			<div className='flex justify-center items-center'>
				<h2 className='text-2xl text-yellow-500 font-bold text-center mb-8 tracking-wide'>
					<FontAwesomeIcon icon={faMoneyBillTrendUp} className='mr-2' /> Tableau
					de bord (Revolut)
				</h2>
			</div>
			<div className='flex justify-around items-center'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-20'>
					{/* PRIME */}
					<div className='flex flex-col items-start'>
						<label className='text-slate-50 text-lg mb-2'>
							Ma prime :{' '}
							<span className='text-yellow-500'>
								{' '}
								{prime !== null ? parseFloat(prime).toFixed(2) : '0'} €
							</span>
						</label>
						<div className='flex justify-center items-center'>
							<input
								type='number'
								value={tempPrime}
								onChange={(e) => setTempPrime(e.target.value)}
								className='w-30 p-2 rounded bg-gray-700 text-white'
								title='Entrer la prime du mois'
								required
							/>
							<button
								type='button'
								className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
								title='Ajouter une prime'
								onClick={handleSavePrime}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					</div>

					{/* COMPTE */}
					<div className='flex flex-col items-start'>
						<label className='text-slate-50 text-lg mb-2'>
							Mon compte :{' '}
							<span className='text-yellow-500'>
								{compte !== null ? parseFloat(compte).toFixed(2) : '0'} €
							</span>
						</label>
						<div className='flex justify-center items-center'>
							<input
								type='number'
								value={tempCompte}
								onChange={(e) => setTempCompte(e.target.value)}
								className='w-30 p-2 rounded bg-gray-700 text-white'
								required
							/>
							<button
								type='button'
								className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
								title='Actualiser le compte'
								onClick={handleSaveCompte}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					</div>

					{/* ÉPARGNE */}
					<div className='flex flex-col items-start'>
						<label className='text-slate-50 text-lg mb-2'>
							Mon épargne :{' '}
							<span className='text-yellow-500'>
								{epargne !== null ? parseFloat(epargne).toFixed(2) : '0'} €
							</span>
						</label>
						<div className='flex justify-center items-center'>
							<input
								type='number'
								value={tempEpargne}
								onChange={(e) => setTempEpargne(e.target.value)}
								className='w-30 p-2 rounded bg-gray-700 text-white'
								required
							/>
							<button
								type='button'
								className='w-10 h-10 ml-5 text-lg text-center bg-slate-500 p-2 rounded text-slate-50 hover:bg-slate-600'
								title="Ajouter de l'épargne"
								onClick={handleSaveEpargne}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;

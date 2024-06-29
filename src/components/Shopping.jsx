// ! Composant qui gère les dépenses de shopping

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Shopping = ({
	shopping,
	handleAddShopping,
	handleShoppingChange,
	handleDeleteShopping,
	budgetShopping,
	tempBudgetShopping,
	setTempBudgetShopping,
	handleSaveBudgetShopping,
	getTotalShopping,
}) => {
	const totalShopping = getTotalShopping();

	const resteShopping =
		parseFloat(budgetShopping) - parseFloat(totalShopping).toFixed(2);

	return (
		<section className='w-full bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<div className='flex flex-wrap justify-between items-center gap-42 mb-10'>
				<div className='flex justify-center items-center gap-4'>
					<input
						type='number'
						value={tempBudgetShopping}
						onChange={(e) => setTempBudgetShopping(e.target.value)}
						className='w-44 p-2 rounded bg-gray-700 text-white'
						placeholder='Modifier le budget'
					/>
					<button
						type='button'
						className='w-auto text-lg text-center bg-blue-500 px-4 py-1 rounded text-slate-50 hover:bg-blue-600 tracking-wide'
						onClick={handleSaveBudgetShopping}
						title='Valider le budget du mois'>
						Valider
					</button>
				</div>
				<h2 className='text-2xl text-amber-400 text-center tracking-widest'>
					SHOPPING
					<p className='mt-2 text-sm italic font-light text-yellow-500'>
						Toutes les achats plaisrs (décathlon, vinted...)
					</p>
				</h2>
				<button
					type='button'
					className='w-auto h-10 flex flex-center items-center gap-2 text-lg text-center bg-green-700 p-2 rounded text-slate-50 hover:bg-green-600 tracking-wide'
					onClick={handleAddShopping}
					title='Ajouter une dépense de shopping'>
					Ajouter dépense
				</button>
			</div>

			<div className='flex flex-col items-center mb-5'>
				<div className='flex justify-center items-center gap-20 mb-8'>
					<label className='text-slate-50 text-lg'>
						Budget pour le shopping : {parseFloat(budgetShopping)} €
					</label>
					<label className='text-slate-50 text-lg tracking-wide'>
						Dépenses shopping : {totalShopping} €
					</label>
					{resteShopping > 0 && (
						<label className='text-green-600 text-xl animate-pulse'>
							Reste : {resteShopping.toFixed(2)} €
						</label>
					)}
					{resteShopping < 0 && (
						<label className='text-red-500 text-xl animate-pulse'>
							Dépassement : {resteShopping.toFixed(2)} €
						</label>
					)}
				</div>

				{shopping.map((m) => (
					<div
						key={m.id}
						className='flex justify-center items-center gap-5 mb-2'>
						<input
							type='text'
							placeholder='Libellé'
							value={m.libelle}
							onChange={(e) =>
								handleShoppingChange(m.id, 'libelle', e.target.value)
							}
							className='w-72 p-2 rounded bg-gray-700 text-slate-50 mr-2 text-center'
						/>

						<input
							type='number'
							placeholder='Montant'
							value={m.montant}
							onChange={(e) =>
								handleShoppingChange(m.id, 'montant', e.target.value)
							}
							className='max-w-40 p-2 rounded bg-gray-700 text-slate-50 text-center'
						/>
						<button
							type='button'
							className='w-10 h-10 ml-5 text-lg text-center bg-red-500 p-2 rounded text-slate-50 hover:bg-red-600'
							title='Supprimer la dépenses shopping'
							onClick={() => handleDeleteShopping(m.id)}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default Shopping;

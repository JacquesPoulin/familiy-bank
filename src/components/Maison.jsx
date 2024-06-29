// ! Composant qui gère les dépenses de ma maison

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Maison = ({
	maison,
	handleAddMaison,
	handleMaisonChange,
	handleDeleteMaison,
	budgetMaison,
	tempBudgetMaison,
	setTempBudgetMaison,
	handleSaveBudgetMaison,
	getTotalMaison,
}) => {
	const totalMaison = getTotalMaison();

	const resteMaison =
		parseFloat(budgetMaison) - parseFloat(totalMaison).toFixed(2);

	return (
		<section className='w-full bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<div className='flex flex-wrap justify-between items-center gap-42 mb-10'>
				<div className='flex justify-center items-center gap-4'>
					<input
						type='number'
						value={tempBudgetMaison}
						onChange={(e) => setTempBudgetMaison(e.target.value)}
						className='w-44 p-2 rounded bg-gray-700 text-white'
						placeholder='Modifier le budget'
					/>
					<button
						type='button'
						className='w-auto text-lg text-center bg-blue-500 px-4 py-1 rounded text-slate-50 hover:bg-blue-600 tracking-wide'
						onClick={handleSaveBudgetMaison}
						title='Valider le budget du mois'>
						Valider
					</button>
				</div>
				<h2 className='text-2xl text-amber-400 text-center tracking-widest'>
					MAISON
					<p className='mt-2 text-sm italic font-light text-yellow-500'>
						Toutes les dépenses de la maison (décos, ...)
					</p>
				</h2>
				<button
					type='button'
					className='w-auto h-10 flex flex-center items-center gap-2 text-lg text-center bg-green-700 p-2 rounded text-slate-50 hover:bg-green-600 tracking-wide'
					onClick={handleAddMaison}
					title='Ajouter une dépense de maison'>
					Ajouter dépense
				</button>
			</div>

			<div className='flex flex-col items-center mb-5'>
				<div className='flex justify-center items-center gap-20 mb-8'>
					<label className='text-cyan-600 text-lg'>
						Budget pour la maison : {parseFloat(budgetMaison)} €
					</label>
					<label className='text-slate-50 text-lg tracking-wide'>
						Dépenses en maison : {totalMaison} €
					</label>
					{resteMaison > 0 && (
						<label className='text-green-600 text-xl animate-pulse'>
							Reste : {resteMaison} €
						</label>
					)}
					{resteMaison < 0 && (
						<label className='text-red-500 text-xl animate-pulse'>
							Dépassement : {resteMaison} €
						</label>
					)}
				</div>

				{maison.map((m) => (
					<div
						key={m.id}
						className='flex justify-center items-center gap-5 mb-2'>
						<input
							type='text'
							placeholder='Libellé'
							value={m.libelle}
							onChange={(e) =>
								handleMaisonChange(m.id, 'libelle', e.target.value)
							}
							className='w-72 p-2 rounded bg-gray-700 text-slate-50 mr-2 text-center'
						/>

						<input
							type='number'
							placeholder='Montant'
							value={m.montant}
							onChange={(e) =>
								handleMaisonChange(m.id, 'montant', e.target.value)
							}
							className='max-w-40 p-2 rounded bg-gray-700 text-slate-50 text-center'
						/>
						<button
							type='button'
							className='w-10 h-10 ml-5 text-lg text-center bg-red-500 p-2 rounded text-slate-50 hover:bg-red-600'
							title='Supprimer la dépenses maison'
							onClick={() => handleDeleteMaison(m.id)}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default Maison;

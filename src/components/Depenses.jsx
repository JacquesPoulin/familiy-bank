// ! Gestion du composant DEPENSES

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Depenses = ({
	depenses,
	handleDepenseChange,
	handleSaveDepenses,
	handleDeleteDepense,
	handleAddDepense,
	getTotalDepenses,
}) => {
	// ! *** FONCTIONS ***
	// ?  Calculer le total des dépense par comptes
	const getTotalByCompte = () => {
		const totals = {};
		depenses.forEach((depense) => {
			const compte = depense.compte || 'Revolut'; // Définir un compte par défaut si le champ est vide ou indéfini
			if (totals[compte]) {
				totals[compte] += parseFloat(depense.montant || 0);
			} else {
				totals[compte] = parseFloat(depense.montant || 0);
			}
		});
		return totals;
	};

	// ! *** VARIABLES ***
	const totalByCompte = getTotalByCompte();

	return (
		<section className='w-full bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<h2 className='text-2xl text-cyan-600 font-bold text-center mb-5 tracking-widest'>
				DÉPENSES (fixes)
				<p className='mt-2 text-lg italic font-light text-yellow-500'>
					{/* Affichage du total des dépenses fixes du mois */}
					Dépenses prévues ce mois :{' '}
					<span className='animate-pulse'>{getTotalDepenses()} €</span>
				</p>
			</h2>
			{/* Affichage des totaux par compte */}
			<div>
				<ul className='text-slate-50 w-full flex justify-center items-center gap-8 text-lg tracking-wider'>
					<span className='text-gr'>TOTAUX :</span>
					{Object.keys(totalByCompte).map((compte) => (
						<li key={compte}>
							<span className='font-bold'>{compte}:</span>{' '}
							{totalByCompte[compte].toFixed(2)} €
						</li>
					))}
				</ul>
			</div>
			<table className='w-full text-white mt-8'>
				{/* libéllés */}
				<thead>
					<tr>
						<th className='text-lg tracking-wide'>Libellé</th>
						<th className='text-lg tracking-wide'>Montant</th>
						<th className='text-lg tracking-wide'>Date</th>
						<th className='text-lg tracking-wide'>Compte</th>
						<th className='text-lg tracking-wide'>Déposé</th>
						<th className='text-lg tracking-wide'>Payé</th>
					</tr>
				</thead>
				<tbody>
					{depenses.map((depense) => (
						<tr key={depense.id}>
							<td className='p-2 text-center'>
								<input
									type='text'
									value={depense.libelle}
									onChange={(e) =>
										handleDepenseChange(depense.id, 'libelle', e.target.value)
									}
									className='bg-gray-700 text-white p-1 rounded text-center min-w-52'
								/>
							</td>

							{/* Montant de la dépense */}
							<td className='p-2 text-center'>
								<input
									type='number'
									value={depense.montant}
									onChange={(e) =>
										handleDepenseChange(
											depense.id,
											'montant',
											parseFloat(e.target.value)
										)
									}
									className='bg-gray-700 text-white p-1 rounded text-center'
								/>
							</td>

							{/* Date de la dépense */}
							<td className='p-2 text-center'>
								<input
									type='date'
									value={depense.date}
									onChange={(e) =>
										handleDepenseChange(depense.id, 'date', e.target.value)
									}
									className='bg-gray-700 text-white p-1 rounded text-center'
								/>
							</td>

							{/* Compte sur lequel la dépense sera faite */}
							<td className='p-2 text-center'>
								<select
									value={depense.compte}
									onChange={(e) =>
										handleDepenseChange(depense.id, 'compte', e.target.value)
									}
									className='bg-gray-700 text-white p-2 rounded text-center cursor-pointer'>
									<option value='Revolut'>Revolut</option>
									<option value='Lydia'>Lydia</option>
									<option value='Boursorama'>Boursorama</option>
								</select>
							</td>

							{/* Argent est-il déposé sur le compte en question ? */}
							<td className='p-2 text-center'>
								<input
									className='w-5 h-5 p-4 hover:cursor-pointer'
									type='checkbox'
									checked={depense.depose}
									onChange={(e) =>
										handleDepenseChange(depense.id, 'depose', e.target.checked)
									}
								/>
							</td>

							{/* La dépense prévue est-elle effectivement payée ? */}
							<td className='p-2 text-center'>
								<input
									className='w-5 h-5 p-4 hover:cursor-pointer'
									type='checkbox'
									checked={depense.paye}
									onChange={(e) =>
										handleDepenseChange(depense.id, 'paye', e.target.checked)
									}
								/>
							</td>

							{/* Bouton CTA de "delete" */}
							<td className='p-2 text-center'>
								<button
									onClick={() => handleDeleteDepense(depense.id)}
									className='bg-red-500 text-white p-1 rounded'
									title='Supprimer la dépense'>
									Supprimer
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex justify-center items-center mt-8 mb-4'>
				{/* <button
					type='button'
					className='w-auto text-lg text-center bg-blue-500 p-2 rounded text-slate-50 hover:bg-blue-600'
					onClick={handleSaveDepenses}>
					Enregistrer
				</button> */}
				<button
					type='button'
					className='w-auto text-lg text-center bg-green-700 p-2 rounded text-slate-50 hover:bg-green-600 ml-4'
					onClick={handleAddDepense}>
					Ajouter une dépense (fixe)
				</button>
			</div>
		</section>
	);
};

export default Depenses;

// components/Imprévu.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const Imprevu = ({
	imprevus,
	handleAddImprevus,
	handleImprevuChange,
	handleSaveImprevus,
}) => {
	return (
		<section className='w-auto bg-slate-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<h2 className='text-2xl text-slate-50 font-bold text-center mb-5 tracking-wide'>
				IMPRÉVUS
			</h2>

			<div className='flex flex-col items-center mb-5'>
				<div className='text-slate-50 flex justify-center items-center gap-4 mb-4'>
					<p>Tout ce que l'on a pas planifié</p>
				</div>

				<button
					type='button'
					className='w-auto flex justify-center items-center gap-4 h-10 mt-2 mb-4 text-lg text-center bg-green-700 p-4 rounded text-slate-50 hover:bg-green-600'
					title='Ajouter une dépense imprévue'
					onClick={handleAddImprevus}>
					<span>Ajouter</span>
					<FontAwesomeIcon icon={faPlus} />
				</button>

				{imprevus.map((imprevu, index) => (
					<div key={index} className='flex justify-center items-center mb-2'>
						<input
							type='text'
							placeholder='Libellé'
							value={imprevu.libelle}
							onChange={(e) =>
								handleImprevuChange(index, 'libelle', e.target.value)
							}
							className='w-auto p-2 rounded bg-gray-700 text-white mr-2'
						/>

						<input
							type='number'
							placeholder='Montant'
							value={imprevu.montant}
							onChange={(e) =>
								handleImprevuChange(index, 'montant', e.target.value)
							}
							className='w-auto p-2 rounded bg-gray-700 text-white'
						/>
					</div>
				))}

				{/* <button
					type='button'
					className='w-40 mt-4 text-lg text-center bg-blue-500 p-2 rounded text-slate-50 hover:bg-blue-600'
					title='Valider les imprévus'
					onClick={handleSaveImprevus}>
					<FontAwesomeIcon icon={faCheck} className='mr-2' />
					Valider
				</button> */}
			</div>
		</section>
	);
};

export default Imprevu;

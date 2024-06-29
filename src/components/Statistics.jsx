// ! COMPOSANT 	PERMETTANT DE GÉRER LES STATS

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartBar,
	faChartSimple,
	faChartLine,
} from '@fortawesome/free-solid-svg-icons';

const Statistics = ({
	depenses = [],
	imprevus = [],
	loisirs = [],
	courses = [],
	maison = [],
	shopping = [],
	totalEntries,
}) => {
	const [totalDepenses, setTotalDepenses] = useState(0);
	const [totalImprevus, setTotalImprevus] = useState(0);
	const [totalLoisirs, setTotalLoisirs] = useState(0);
	const [totalCourses, setTotalCourses] = useState(0);
	const [totalMaison, setTotalMaison] = useState(0);
	const [totalShopping, setTotalShopping] = useState(0);
	const [savings, setSavings] = useState(0);

	useEffect(() => {
		setTotalDepenses(
			depenses.reduce(
				(total, depense) => total + parseFloat(depense.montant || 0),
				0
			)
		);
		setTotalImprevus(
			imprevus.reduce(
				(total, imprevu) => total + parseFloat(imprevu.montant || 0),
				0
			)
		);
		setTotalLoisirs(
			loisirs.reduce(
				(total, loisir) => total + parseFloat(loisir.montant || 0),
				0
			)
		);
		setTotalCourses(
			courses.reduce(
				(total, course) => total + parseFloat(course.amount || 0),
				0
			)
		);
		setTotalMaison(
			maison.reduce((total, m) => total + parseFloat(m.montant || 0), 0)
		);
		setTotalShopping(
			shopping.reduce((total, m) => total + parseFloat(m.montant || 0), 0)
		);
		setSavings(
			totalEntries -
				(totalDepenses +
					totalImprevus +
					totalLoisirs +
					totalCourses +
					totalMaison +
					totalShopping)
		);
	}, [depenses, imprevus, loisirs, courses, maison, shopping, totalEntries]);

	const mesEconomies = savings.toFixed(2);

	return (
		<section className='w-full bg-slate-800 p-2 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<div className='mt-4 mb-4 flex flex-col items-center gap-4 text-slate-50 animate-pulse'>
				<h2 className='mb-2 text-3xl font-medium text-amber-400 tracking-wider'>
					<FontAwesomeIcon icon={faChartLine} className='mr-4' />
					STATISTIQUES
				</h2>

				<div className='w-full flex justify-center items-center gap-20'>
					<div>
						<ul className='flex flex-col gap-2 text-xl tracking-wider'>
							<li className='text-green-600'>
								Total des revenus : {totalEntries} €
							</li>
							<li>Total des dépenses : {totalDepenses.toFixed(2)} €</li>
							<li>Total des imprévus : {totalImprevus.toFixed(2)} €</li>
							<li>Total des loisirs : {totalLoisirs.toFixed(2)} €</li>
						</ul>
					</div>

					<div>
						<ul className='flex flex-col gap-2 text-xl tracking-wider'>
							<li>Total des courses : {totalCourses.toFixed(2)} €</li>
							<li>Total des dépenses maison : {totalMaison.toFixed(2)} €</li>
							<li>
								Total des dépenses shopping : {totalShopping.toFixed(2)} €
							</li>

							{mesEconomies <= 50 && (
								<li className='text-orange-600'>
									Économies : {mesEconomies} €
								</li>
							)}
							{mesEconomies < 50 && (
								<li className='text-red-600'>Économies : {mesEconomies} €</li>
							)}
							{mesEconomies > 50 && (
								<li className='text-green-600'>Économies : {mesEconomies} €</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Statistics;

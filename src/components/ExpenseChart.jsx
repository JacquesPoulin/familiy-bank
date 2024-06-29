import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartBar,
	faChartSimple,
	faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const ExpenseChart = ({
	depenses = [],
	imprevus = [],
	loisirs = [],
	courses = [],
	maison = [],
	shopping = [],
}) => {
	const data = {
		labels: [
			'Dépenses',
			'Imprévus',
			'Loisirs',
			'Courses',
			'Maison',
			'Shopping',
		],
		datasets: [
			{
				label: 'Montants',
				data: [
					depenses.reduce(
						(total, depense) => total + parseFloat(depense.montant || 0),
						0
					),
					imprevus.reduce(
						(total, imprevu) => total + parseFloat(imprevu.montant || 0),
						0
					),
					loisirs.reduce(
						(total, loisir) => total + parseFloat(loisir.montant || 0),
						0
					),
					courses.reduce(
						(total, course) => total + parseFloat(course.amount || 0),
						0
					),
					maison.reduce((total, m) => total + parseFloat(m.montant || 0), 0),
					shopping.reduce(
						(total, shopping) => total + parseFloat(shopping.montant || 0),
						0
					),
				],
				backgroundColor: [
					'rgba(75, 192, 192, 0.6)',
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 64, 0.6)',
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Répartition des dépenses',
			},
		},
	};

	return (
		<div className='flex flex-col justify-center items-center mb-14'>
			<h2 className='mt-20 mb-4 text-3xl tracking-wider text-blue-400'>
				<FontAwesomeIcon icon={faChartSimple} className='mr-4' />
				GRAPHIQUE
			</h2>
			<Bar data={data} options={options} />
		</div>
	);
};

export default ExpenseChart;

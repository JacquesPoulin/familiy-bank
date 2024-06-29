import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartBar,
	faChartSimple,
	faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

const Recommendations = ({
	savings,
	totalDepenses,
	totalImprevus,
	totalLoisirs,
	totalCourses,
	totalMaison,
}) => {
	return (
		<section className='w-full bg-slate-800 p-4 rounded-lg shadow-md max-w-6xl mx-auto mt-10'>
			<div className='flex flex-col item-center'>
				<h2 className='text-center mb-8 text-xl text-slate-50'>
					<FontAwesomeIcon icon={faLightbulb} className='mr-4' /> CONSEILS
				</h2>
				{savings < 0 ? (
					<p className='mb-3 text-slate-50 tracking-wider text-lg'>
						Vos dépenses dépassent vos revenus. Essayez de réduire vos dépenses
						dans les catégories suivantes :
					</p>
				) : (
					<p className='mb-3 text-slate-50 tracking-wider text-lg'>
						Bon travail ! Voici quelques suggestions pour économiser encore plus
						:
					</p>
				)}
				<ul>
					{totalDepenses > 1000 && (
						<li className='mb-3 text-slate-50 tracking-wider text-lg'>
							Réduisez vos dépenses fixes. Essayez de renégocier vos abonnements
							ou vos factures.
						</li>
					)}
					{totalImprevus > 200 && (
						<li className='mb-3 text-slate-50 tracking-wider text-lg'>
							Préparez un fonds d'urgence pour gérer les imprévus sans
							déséquilibrer votre budget.
						</li>
					)}
					{totalLoisirs > 300 && (
						<li className='mb-3 text-slate-50 tracking-wider text-lg'>
							Limitez vos sorties et loisirs. Cherchez des alternatives moins
							coûteuses.
						</li>
					)}
					{totalCourses > 400 && (
						<li className='mb-3 text-slate-50 tracking-wider text-lg'>
							Optimisez vos dépenses alimentaires. Planifiez vos repas et évitez
							les achats impulsifs.
						</li>
					)}
					{totalMaison > 500 && (
						<li className='mb-3 text-slate-50 tracking-wider text-lg'>
							Économisez sur les dépenses de maison. Comparez les prix avant
							d'acheter.
						</li>
					)}
				</ul>
			</div>
		</section>
	);
};

export default Recommendations;

// ! Liste de navigation des composants

import {
	faEuroSign,
	faCreditCard,
	faCartShopping,
	faTriangleExclamation,
	faUtensils,
	faHouseChimney,
	faStore,
} from '@fortawesome/free-solid-svg-icons';

const componentList = [
	{
		id: 1,
		nom: 'Entrées',
		title: "Toutes les rentrées d'argent du mois",
		tag: 'entries',
		icon: faEuroSign,
	},
	{
		id: 2,
		nom: 'Dépenses',
		title: 'Toutes les dépenses fixes',
		tag: 'depenses',
		icon: faCreditCard,
	},
	{
		id: 3,
		nom: 'Courses',
		title: 'Toutes les Courses du mois',
		tag: 'courses',
		icon: faCartShopping,
	},
	{
		id: 4,
		nom: 'Imprévus',
		title: 'Toutes les dépenses imprévues du mois',
		tag: 'imprevus',
		icon: faTriangleExclamation,
	},
	{
		id: 5,
		nom: 'Loisirs',
		title: 'Toutes les dépenses de loisirs du mois',
		tag: 'loisirs',
		icon: faUtensils,
	},
	{
		id: 6,
		nom: 'Maison',
		title: 'Toute les dépenses du mois concernant la maison',
		tag: 'maison',
		icon: faHouseChimney,
	},
	{
		id: 7,
		nom: 'Shopping',
		title: 'Toute les dépenses du mois concernant le shopping',
		tag: 'shopping',
		icon: faStore,
	},
];

export default componentList;

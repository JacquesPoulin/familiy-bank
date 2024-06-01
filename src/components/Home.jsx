import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import Logout from './Logout';
import Notification from './globals/Notification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faWallet,
	faMoneyBillTrendUp,
	faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';

const months = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
];

const currentYear = new Date().getFullYear();
const years = Array.from(
	new Array(2),
	(val, index) => new Date().getFullYear() - index
);

function Home() {
	const [userWelcome, setUserWelcome] = useState('');
	const [prime, setPrime] = useState(null);
	const [compte, setCompte] = useState(null);
	const [epargne, setEpargne] = useState(null);
	const [showNotification, setShowNotification] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	const [selectedYear, setSelectedYear] = useState(currentYear);
	const { currentUser } = useAuth();

	const logoutAfterInactivity = () => {
		signOut(auth)
			.then(() => {
				console.log("Déconnexion automatique après 15 minutes d'inactivité");
				// Rediriger ou afficher une notification de déconnexion
			})
			.catch((error) => {
				console.error('Erreur lors de la déconnexion automatique : ', error);
			});
	};

	useEffect(() => {
		if (currentUser && currentUser.email === 'jacques.poulin64@gmail.com') {
			setUserWelcome('Bienvenue, Jacques !');
		} else {
			setUserWelcome('Bienvenue !');
		}
	}, [currentUser]);

	useEffect(() => {
		let inactivityTimeout;
		let notificationTimeout;

		const resetInactivityTimer = () => {
			clearTimeout(inactivityTimeout);
			clearTimeout(notificationTimeout);
			setShowNotification(false);

			notificationTimeout = setTimeout(() => {
				console.log('Notification affichée');
				setShowNotification(true);
			}, 14 * 60 * 1000); // 1 minute avant déconnexion

			inactivityTimeout = setTimeout(() => {
				console.log('Déconnexion');
				logoutAfterInactivity();
			}, 15 * 60 * 1000); // 2 minutes d'inactivité
		};

		document.addEventListener('mousemove', resetInactivityTimer);
		document.addEventListener('keydown', resetInactivityTimer);
		document.addEventListener('click', resetInactivityTimer);

		resetInactivityTimer();

		return () => {
			document.removeEventListener('mousemove', resetInactivityTimer);
			document.removeEventListener('keydown', resetInactivityTimer);
			document.removeEventListener('click', resetInactivityTimer);
			clearTimeout(inactivityTimeout);
			clearTimeout(notificationTimeout);
		};
	}, []);
	// ! SAUVEGARDER LES DATAS
	const saveData = async () => {
		if (!currentUser) return;
		try {
			const month = months[selectedMonth];
			await setDoc(
				doc(
					db,
					'users',
					currentUser.uid,
					'years',
					String(selectedYear),
					'months',
					month
				),
				{
					prime: parseFloat(prime),
					compte: parseFloat(compte),
					epargne: parseFloat(epargne),
				}
			);
			console.log('Données sauvegardées !');
		} catch (error) {
			console.error('Erreur lors de la sauvegarde des données : ', error);
		}
	};

	// ! RÉCUPÉRER LES DATAS
	const loadData = async () => {
		if (!currentUser) return;
		const month = months[selectedMonth];
		const docRef = doc(
			db,
			'users',
			currentUser.uid,
			'years',
			String(selectedYear),
			'months',
			month
		);
		try {
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				setPrime(data.prime);
				setCompte(data.compte);
				setEpargne(data.epargne);
			} else {
				console.log('Pas de données disponibles pour ce mois !');
				setPrime(null);
				setCompte(null);
				setEpargne(null);
			}
		} catch (error) {
			console.error('Erreur lors du chargement des données : ', error);
		}
	};

	useEffect(() => {
		if (currentUser) {
			loadData();
		}
	}, [currentUser, selectedMonth, selectedYear]);

	useEffect(() => {
		if (currentUser && prime !== null && compte !== null && epargne !== null) {
			saveData();
		}
	}, [prime, compte, epargne]);

	return (
		<div className='w-full min-h-screen flex flex-col bg-slate-900 p-4'>
			<header className='flex justify-between items-center'>
				<h1 className='text-2xl text-slate-50'>{userWelcome}</h1>
				<Logout />
			</header>

			{/* ANNÉE */}
			<nav className='w-full flex justify-center items-center mt-4'>
				<div className='flex flex-wrap justify-center items-center gap-2'>
					{years.map((year) => (
						<button
							key={year}
							onClick={() => setSelectedYear(year)}
							className={`px-4 py-2 mx-1 rounded ${
								year === selectedYear
									? 'bg-slate-600 text-white'
									: 'bg-slate-400 text-slate-900'
							}`}>
							{year}
						</button>
					))}
				</div>
			</nav>

			{/* MOIS DE L'ANNÉE */}
			<nav className='w-full flex justify-center items-center mt-4'>
				<div className='flex flex-wrap justify-center items-center gap-2'>
					{months.map((month, index) => (
						<button
							key={index}
							onClick={() => setSelectedMonth(index)}
							className={`px-4 py-2 mx-1 rounded ${
								index === selectedMonth
									? 'bg-slate-600 text-white'
									: 'bg-slate-400 text-slate-900'
							}`}>
							{month}
						</button>
					))}
				</div>
			</nav>

			<section className='bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto mt-10'>
				<h2 className='text-2xl text-slate-50 font-bold text-center mb-10 tracking-wide'>
					- Tableau de bord -
				</h2>
				<div className='flex justify-around items-center'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-20'>
						{/* PRIME */}
						<div className='flex flex-col items-start'>
							<label className='text-slate-50 text-lg mb-2'>
								Ma prime :{' '}
								{prime !== null ? parseFloat(prime).toFixed(2) : '-'}
							</label>
							<div className='flex justify-center items-center'>
								<input
									type='number'
									value={prime !== null ? prime : ''}
									onChange={(e) => setPrime(parseFloat(e.target.value))}
									className='w-30 p-2 rounded bg-gray-700 text-white'
									title='Entrer la prime du mois'
								/>
							</div>
						</div>

						{/* COMPTE */}
						<div className='flex flex-col items-start'>
							<label className='text-slate-50 text-lg mb-2'>
								Mon compte :{' '}
								{compte !== null ? parseFloat(compte).toFixed(2) : '-'}
							</label>
							<div className='flex justify-center items-center'>
								<input
									type='number'
									value={compte !== null ? compte : ''}
									onChange={(e) => setCompte(parseFloat(e.target.value))}
									className='w-30 p-2 rounded bg-gray-700 text-white'
								/>
							</div>
						</div>

						{/* ÉPARGNE */}
						<div className='flex flex-col items-start'>
							<label className='text-slate-50 text-lg mb-2'>
								Mon épargne :{' '}
								{epargne !== null ? parseFloat(epargne).toFixed(2) : '-'}
							</label>
							<div className='flex justify-center items-center'>
								<input
									type='number'
									value={epargne !== null ? epargne : ''}
									onChange={(e) => setEpargne(parseFloat(e.target.value))}
									className='w-30 p-2 rounded bg-gray-700 text-white'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className='text-center text-gray-300 sticky top-full'>
				<p>Family bank application - © {currentYear}</p>
			</footer>

			{showNotification && (
				<Notification
					message='Vous allez être déconnecté dans 1 minute pour inactivité.'
					onClose={() => setShowNotification(false)}
				/>
			)}
		</div>
	);
}

export default Home;

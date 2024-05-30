import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import Logout from './Logout';
import Notification from './globals/Notification';

function Home() {
	const [userWelcome, setUserWelcome] = useState('');
	const [prime, setPrime] = useState(0);
	const [compte, setCompte] = useState(0);
	const [epargne, setEpargne] = useState(0);
	const [showNotification, setShowNotification] = useState(false);
	const { currentUser } = useAuth();
	const currentYear = new Date().getFullYear(); // Obtenir l'année actuelle

	const logoutAfterInactivity = () => {
		signOut(auth)
			.then(() => {
				console.log("Déconnexion automatique après 2 minutes d'inactivité");
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

	return (
		<div className='w-full min-h-screen flex flex-col bg-slate-900 p-4'>
			<header className='flex justify-between items-center'>
				<h1 className='text-2xl text-slate-50'>{userWelcome}</h1>
				<Logout />
			</header>

			<section className='bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto mt-20'>
				<h2 className='text-2xl text-slate-50 font-bold text-center mb-10 tracking-wide'>
					Tableau de bord
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='flex flex-col justify-center items-center'>
						<label className='text-slate-50 text-lg mb-2'>
							Prime : XXXXXX €
						</label>
						<input
							type='number'
							value={prime}
							onChange={(e) => setPrime(e.target.value)}
							className='p-2 rounded bg-gray-700 text-white'
						/>
					</div>
					<div className='flex flex-col justify-center items-center'>
						<label className='text-slate-50 text-lg mb-2'>
							Compte : XXXXXX €
						</label>
						<input
							type='number'
							value={compte}
							onChange={(e) => setCompte(e.target.value)}
							className='p-2 rounded bg-gray-700 text-white'
						/>
					</div>
					<div className='flex flex-col justify-center items-center'>
						<label className='text-slate-50 text-lg mb-2'>
							Epargne : XXXXXX €
						</label>
						<input
							type='number'
							value={epargne}
							onChange={(e) => setEpargne(e.target.value)}
							className='p-2 rounded bg-gray-700 text-white'
						/>
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

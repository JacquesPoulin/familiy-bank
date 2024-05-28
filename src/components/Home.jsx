import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logout from './Logout';

function Home() {
	const [user, setUser] = useState('');
	const { currentUser } = useAuth();
	const currentYear = new Date().getFullYear(); // ! Obtenir l'année actuelle

	useEffect(() => {
		if (currentUser && currentUser.email === 'jacques.poulin64@gmail.com') {
			setUser('Jacques');
		} else if (
			currentUser &&
			currentUser.email === 'famille.poulin.aguirre@gmail.com'
		)
			setUser('Famille PAC');
		else {
			setUser(currentUser.email);
		}
	}, [currentUser]);

	return (
		<div className='w-full min-h-screen flex flex-col justify-between bg-slate-900 p-4'>
			<header className='flex justify-between items-center'>
				<h1 className='text-2xl text-slate-50'>Bienvenue, {user}</h1>
				<Logout />
			</header>

			<footer className='text-center text-gray-300 mt-4'>
				<p>Family bank application - © {currentYear}</p>
			</footer>
		</div>
	);
}

export default Home;

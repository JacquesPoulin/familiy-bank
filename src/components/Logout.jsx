import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

function Logout() {
	const handleLogout = async () => {
		try {
			await signOut(auth);
			// Rediriger ou montrer une notification de succès
		} catch (error) {
			console.error('Error signing out: ', error);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className='px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-700 focus:ring-4 focus:ring-red-300'>
			Logout
		</button>
	);
}

export default Logout;

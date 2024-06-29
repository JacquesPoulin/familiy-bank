// components/Header.jsx
import React from 'react';
import Logout from './Logout';

const Header = ({ currentUser }) => {
	return (
		<header className='w-full mb-6 p-2 flex justify-between items-center bg-slate-800 rounded-md'>
			<p className='text-slate-50'>{currentUser.email}</p>

			<Logout />
		</header>
	);
};

export default Header;

// components/Header.jsx
import React from 'react';
import Logout from './Logout';

const Header = ({ userWelcome }) => {
	return (
		<header className='flex justify-between items-center'>
			<h1 className='text-2xl text-slate-50'>{userWelcome}</h1>
			<Logout />
		</header>
	);
};

export default Header;

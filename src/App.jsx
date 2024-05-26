import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
// import Signup from './components/Signup';
import Home from './components/Home'; // Importer le nouveau composant Home
import './App.css';

function App() {
	const { currentUser } = useAuth();

	return (
		<div className='min-h-screen flex flex-col justify-center items-center bg-slate-900'>
			{currentUser ? (
				<Home />
			) : (
				<div className='w-full flex justify-center items-center gap-10'>
					<Login />
					{/* <Signup /> */}
				</div>
			)}
		</div>
	);
}

export default App;

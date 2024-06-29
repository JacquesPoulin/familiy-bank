import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Rediriger ou montrer une notification de succès
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='w-full flex flex-col justify-center items-center min-h-screen gap-10'>
			<p className='text-slate-50 animate-pulse'>Veuillez vous connecter...</p>

			<div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
				<h2 className='text-2xl font-bold text-center'>Connexion</h2>
				<form onSubmit={handleLogin} className='mt-8 space-y-6'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'>
							Email*
						</label>
						<input
							type='email'
							id='email'
							className='w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='exemple@gmail.com'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700'>
							Mot de passe*
						</label>
						<input
							type='password'
							id='password'
							className='w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div>
						<button
							type='submit'
							className='w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'>
							Se connecter
						</button>
					</div>
					{error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
				</form>
			</div>
		</div>
	);
}

export default Login;

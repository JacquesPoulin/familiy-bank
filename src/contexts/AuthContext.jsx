// ! Navigation et gestion de l'état de l'utilisateur
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = { currentUser };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

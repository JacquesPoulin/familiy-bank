import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import Logout from './Logout';
import Notification from './globals/Notification';
import Header from './Header';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Entries from './Entries';
import Imprevu from './Imprevu';
import Courses from './Courses';
import ComponentNavbar from './ComponentNavbar';
import { months } from '../utils/mois';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faWallet,
	faMoneyBillTrendUp,
	faArrowsRotate,
	faCheck,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ! ****** VARIABLES ******
const currentYear = new Date().getFullYear();
const years = Array.from(
	new Array(2),
	(val, index) => new Date().getFullYear() - index
);
const budgetCourses = 560;

function Home() {
	const [userWelcome, setUserWelcome] = useState('');
	const [prime, setPrime] = useState(null);
	const [salaireJacques, setSalaireJacques] = useState(null);
	const [salaireAstrid, setSalaireAstrid] = useState(null);
	const [revenuCaf, setRevenuCaf] = useState(null);
	const [compte, setCompte] = useState(null);
	const [epargne, setEpargne] = useState(null);
	const [showNotification, setShowNotification] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	const [selectedYear, setSelectedYear] = useState(currentYear);
	const { currentUser } = useAuth();
	const [courses, setCourses] = useState([]);
	const [imprevus, setImprevus] = useState([]);
	const [activeComponent, setActiveComponent] = useState('');

	// ? STATE TEMPORAIRE
	const [tempPrime, setTempPrime] = useState('');
	const [tempCompte, setTempCompte] = useState('');
	const [tempEpargne, setTempEpargne] = useState('');
	const [tempSalaireJacques, setTempSalaireJacques] = useState('');
	const [tempSalaireAstrid, setTempSalaireAstrid] = useState('');
	const [tempRevenuCaf, setTempRevenuCaf] = useState('');

	// ! ****** HOOKS ******
	// ! Gestion du message de bienvenue de l'utilisateur
	useEffect(() => {
		const currentHour = new Date().getHours();
		let greeting = '';

		if (currentHour >= 19 || currentHour < 5) {
			greeting = 'Bonsoir';
		} else {
			greeting = 'Bonjour';
		}

		if (currentUser && currentUser.email === 'jacques.poulin64@gmail.com') {
			setUserWelcome(`${greeting}, Jacques !`);
		} else {
			setUserWelcome(`${greeting} Famille PAC !`);
		}
	}, [currentUser]);

	// ! Gestion de la déconnexion automatique (si l'utilisateur n'utilise pas sa souris)
	useEffect(() => {
		let inactivityTimeout;
		let notificationTimeout;

		const resetInactivityTimer = () => {
			clearTimeout(inactivityTimeout);
			clearTimeout(notificationTimeout);
			setShowNotification(false);

			notificationTimeout = setTimeout(() => {
				setShowNotification(true);
			}, 18 * 60 * 1000); // 2 minutes avant déconnexion

			inactivityTimeout = setTimeout(() => {
				console.log('Déconnexion');
				logoutAfterInactivity();
			}, 20 * 60 * 1000); // 20 minutes d'inactivité
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

	useEffect(() => {
		if (currentUser) {
			loadData();
		}
	}, [currentUser, selectedMonth, selectedYear]);

	useEffect(() => {
		if (
			currentUser &&
			prime !== null &&
			compte !== null &&
			epargne !== null &&
			salaireJacques !== null &&
			salaireAstrid !== null &&
			revenuCaf !== null
		) {
			saveData();
		}
	}, [prime, compte, epargne, salaireJacques, salaireAstrid, revenuCaf]);

	// ! ***** FUNCTIONS *****
	// ? Déconnection autimatique après 15 minutes d'inactivité
	const logoutAfterInactivity = () => {
		signOut(auth);
	};

	const toggleComponent = (component) => {
		setActiveComponent((prevComponent) =>
			prevComponent === component ? '' : component
		);
	};

	// ! Sauvegarder les données dans firebase
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
					prime: parseFloat(prime) || 0,
					compte: parseFloat(compte) || 0,
					epargne: parseFloat(epargne) || 0,
					salaireJacques: parseFloat(salaireJacques) || 0,
					salaireAstrid: parseFloat(salaireAstrid) || 0,
					revenuCaf: parseFloat(revenuCaf) || 0,
					courses: courses,
					imprevus: imprevus,
				}
			);
			toast.success('Mise à jour ok !', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		} catch (error) {
			console.error('Erreur lors de la sauvegarde des données : ', error);
			toast.error('Erreur lors de la sauvegarde des données.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	// ! Récupérer les données dans firebase
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
				setSalaireJacques(data.salaireJacques);
				setSalaireAstrid(data.salaireAstrid);
				setRevenuCaf(data.revenuCaf);
				setCourses(data.courses || []);
				setImprevus(data.imprevus || []);
			} else {
				setPrime(null);
				setCompte(null);
				setEpargne(null);
				setSalaireJacques(null);
				setSalaireAstrid(null);
				setRevenuCaf(null);
				setCourses([]);
				setImprevus([]);
			}
		} catch (error) {
			console.error('Erreur lors du chargement des données : ', error);
		}
	};

	// ! Sauvegardes temporaires
	const handleSavePrime = () => {
		if (tempPrime) {
			setPrime(parseFloat(tempPrime) || 0);
			setTempPrime('');
		} else {
			return;
		}
	};
	const handleSaveCompte = () => {
		if (tempCompte) {
			setCompte(parseFloat(tempCompte) || 0);
			setTempCompte('');
		} else {
			return;
		}
	};
	const handleSaveEpargne = () => {
		if (tempEpargne) {
			setEpargne(parseFloat(tempEpargne) || 0);
			setTempEpargne('');
		} else {
			return;
		}
	};
	const handleSaveSalaireJacques = () => {
		if (tempSalaireJacques) {
			setSalaireJacques(parseFloat(tempSalaireJacques) || 0);
			setTempSalaireJacques('');
		} else {
			return;
		}
	};
	const handleSaveSalaireAstrid = () => {
		if (tempSalaireAstrid) {
			setSalaireAstrid(parseFloat(tempSalaireAstrid) || 0);
			setTempSalaireAstrid('');
		} else {
			return;
		}
	};
	const handleSaveRevenuCaf = () => {
		if (tempRevenuCaf) {
			setRevenuCaf(parseFloat(tempRevenuCaf) || 0);
			setTempRevenuCaf('');
		} else {
			return;
		}
	};

	// ! Gestion des imprévus
	const handleAddImprevus = () => {
		setImprevus((prevImprevus) => {
			const nouveauxImprevus = [...prevImprevus, { libelle: '', montant: '' }];
			return nouveauxImprevus;
		});
	};

	const handleImprevuChange = (index, key, value) => {
		const nouvelImprevu = [...imprevus];
		const ancienMontant = parseFloat(nouvelImprevu[index].montant || 0);
		nouvelImprevu[index][key] = value;

		if (key === 'montant') {
			const nouveauMontant = parseFloat(value || 0);
			const difference = nouveauMontant - ancienMontant;
			setCompte((prevCompte) => prevCompte - difference);
		}

		setImprevus(nouvelImprevu);
	};

	const handleSaveImprevus = () => {
		saveData();
	};

	// ! Gestion des courses
	const handleAddCourse = () => {
		setCourses((prevCourses) => {
			const newCourses = [...prevCourses, { label: '', amount: '' }];
			return newCourses;
		});
	};

	const handleCourseChange = (index, key, value) => {
		const newCourses = [...courses];
		const oldAmount = parseFloat(newCourses[index].amount || 0);
		newCourses[index][key] = value;

		if (key === 'amount') {
			const newAmount = parseFloat(value || 0);
			const difference = newAmount - oldAmount;
			setCompte((prevCompte) => prevCompte - difference);
		}

		setCourses(newCourses);
	};

	const handleSaveCourses = () => {
		saveData();
	};

	const getTotalCourses = () => {
		return courses
			.reduce((total, course) => total + parseFloat(course.amount || 0), 0)
			.toFixed(2);
	};

	// const getDifferenceCourse = () => {
	// 	return (budgetCourses - parseFloat(getTotalCourses())).toFixed(2);
	// };

	// ! ***** RETURN *****
	return (
		<div className='w-full min-h-screen flex flex-col bg-slate-900 p-4'>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>

			{/* TITRE & LOGOUT */}
			<Header userWelcome={userWelcome} />

			{/* MOIS & ANNÉES */}
			<Navbar
				years={years}
				selectedYear={selectedYear}
				setSelectedYear={setSelectedYear}
				months={months}
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>

			{/* ***** TABLEAU DE BORD ***** */}
			<Dashboard
				prime={prime}
				tempPrime={tempPrime}
				setTempPrime={setTempPrime}
				handleSavePrime={handleSavePrime}
				compte={compte}
				tempCompte={tempCompte}
				setTempCompte={setTempCompte}
				handleSaveCompte={handleSaveCompte}
				epargne={epargne}
				tempEpargne={tempEpargne}
				setTempEpargne={setTempEpargne}
				handleSaveEpargne={handleSaveEpargne}
			/>

			{/* Barre de navigation pour les composants */}
			<ComponentNavbar toggleComponent={toggleComponent} />

			{/* Affichage des composants en fonction de l'état */}
			{/* ***** ENTRÉES ***** */}
			{activeComponent === 'entries' && (
				<Entries
					prime={prime}
					salaireJacques={salaireJacques}
					tempSalaireJacques={tempSalaireJacques}
					setTempSalaireJacques={setTempSalaireJacques}
					handleSaveSalaireJacques={handleSaveSalaireJacques}
					salaireAstrid={salaireAstrid}
					tempSalaireAstrid={tempSalaireAstrid}
					setTempSalaireAstrid={setTempSalaireAstrid}
					handleSaveSalaireAstrid={handleSaveSalaireAstrid}
					revenuCaf={revenuCaf} // Pass the revenuCaf state
					tempRevenuCaf={tempRevenuCaf} // Pass the tempRevenuCaf state
					setTempRevenuCaf={setTempRevenuCaf} // Pass the setTempRevenuCaf function
					handleSaveRevenuCaf={handleSaveRevenuCaf} // Pass the handleSaveRevenuCaf function
				/>
			)}

			{/* ***** COURSES ***** */}
			{activeComponent === 'courses' && (
				<Courses
					budgetCourses={budgetCourses}
					getTotalCourses={getTotalCourses}
					handleAddCourse={handleAddCourse}
					courses={courses}
					handleCourseChange={handleCourseChange}
					handleSaveCourses={handleSaveCourses}
				/>
			)}

			{/* ***** IMPRÉVUS ***** */}
			{activeComponent === 'imprevus' && (
				<Imprevu
					imprevus={imprevus}
					handleAddImprevus={handleAddImprevus}
					handleImprevuChange={handleImprevuChange}
					handleSaveImprevus={handleSaveImprevus}
				/>
			)}

			{/* *** FOOTER *** */}
			<footer className='text-center text-gray-300 sticky top-full mt-8'>
				<p>Family bank application - © {currentYear}</p>
			</footer>
			{showNotification && (
				<Notification
					message='ÊTES-VOUS TOUJOURS LÀ ? (dans 2 minutes vous serez déconnecté).'
					onClose={() => setShowNotification(false)}
				/>
			)}
		</div>
	);
}

export default Home;

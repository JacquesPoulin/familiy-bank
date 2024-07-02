import React, { useState, useEffect, useCallback } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import debounce from 'lodash.debounce';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Notification from './globals/Notification';
import Header from './Header';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Entries from './Entries';
import Depenses from './Depenses';
import Imprevu from './Imprevu';
import Loisirs from './Loisirs';
import Maison from './Maison';
import Shopping from './Shopping';
import Courses from './Courses';
import ComponentNavbar from './ComponentNavbar';
import Statistics from './Statistics';
import ExpenseChart from './ExpenseChart';
import Recommendations from './Recommendations';

import { months } from '../utils/mois';
import depensesList from '../data/depensesList';

// ! ****** VARIABLES ******
const currentYear = new Date().getFullYear();
const years = Array.from(
	new Array(2),
	(val, index) => new Date().getFullYear() - index
);

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
	const [depenses, setDepenses] = useState([]);
	const [imprevus, setImprevus] = useState([]);
	const [loisirs, setLoisirs] = useState([]);
	const [maison, setMaison] = useState([]);
	const [shopping, setShopping] = useState([]);
	const [activeComponent, setActiveComponent] = useState('');
	const [budgetCourses, setBudgetCourses] = useState(450);
	const [budgetImprevus, setBudgetImprevus] = useState(100);
	const [budgetLoisirs, setBudgetLoisirs] = useState(200);
	const [budgetMaison, setBudgetMaison] = useState(100);
	const [budgetShopping, setBudgetShopping] = useState(100);
	const [isLoading, setIsLoading] = useState(true);

	// ? STATE TEMPORAIRE
	const [tempPrime, setTempPrime] = useState('');
	const [tempCompte, setTempCompte] = useState('');
	const [tempEpargne, setTempEpargne] = useState('');
	const [tempSalaireJacques, setTempSalaireJacques] = useState('');
	const [tempSalaireAstrid, setTempSalaireAstrid] = useState('');
	const [tempRevenuCaf, setTempRevenuCaf] = useState('');
	const [tempBudgetCourses, setTempBudgetCourses] = useState('');
	const [tempBudgetImprevus, setTempBudgetImprevus] = useState('');
	const [tempBudgetLoisirs, setTempBudgetLoisirs] = useState('');
	const [tempBudgetMaison, setTempBudgetMaison] = useState('');
	const [tempBudgetShopping, setTempBudgetShopping] = useState('');
	const [totalEntrees, setTotalEntrees] = useState('');

	// ! ****** HOOKS ******
	// ! Gestion du message de bienvenue de l'utilisateur
	useEffect(() => {
		const currentHour = new Date().getHours();
		let greeting = '';
		if (currentHour >= 19 || currentHour < 5) {
			greeting = 'Bonsoir !';
		} else {
			greeting = 'Bonjour !';
		}

		if (currentUser && currentUser.email === 'jacques.poulin64@gmail.com') {
			setUserWelcome(`${greeting}`);
		} else {
			setUserWelcome(`${greeting}`);
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

	// ! Gestion de la connexion & du loading
	useEffect(() => {
		const checkAuthAndLoadData = async () => {
			if (currentUser) {
				await loadData();
			}
			setIsLoading(false);
		};

		checkAuthAndLoadData();
	}, [currentUser, selectedMonth, selectedYear]);

	useEffect(() => {
		const calculateTotalEntries = () => {
			const total =
				(parseFloat(salaireJacques) || 0) +
				(parseFloat(salaireAstrid) || 0) +
				(parseFloat(revenuCaf) || 0);
			setTotalEntrees(total);
		};

		calculateTotalEntries();
	}, [salaireJacques, salaireAstrid, revenuCaf, selectedMonth, selectedYear]);

	useEffect(() => {
		if (
			currentUser &&
			prime !== null &&
			compte !== null &&
			epargne !== null &&
			salaireJacques !== null &&
			salaireAstrid !== null &&
			revenuCaf !== null &&
			budgetCourses !== null &&
			budgetImprevus !== null &&
			depenses !== null &&
			budgetLoisirs !== null &&
			budgetMaison !== null &&
			budgetShopping
		) {
			debouncedSaveData();
		}
	}, [
		prime,
		compte,
		epargne,
		salaireJacques,
		salaireAstrid,
		revenuCaf,
		budgetCourses,
		budgetImprevus,
		budgetLoisirs,
		budgetMaison,
		budgetShopping,
		depenses,
	]);

	// ! ***** FUNCTIONS *****
	// ? Déconnection automatique après 15 minutes d'inactivité
	const logoutAfterInactivity = useCallback(() => {
		signOut(auth)
			.then(() => {
				console.log("Déconnexion automatique après 30 minutes d'inactivité");
			})
			.catch((error) => {
				console.error('Erreur lors de la déconnexion automatique : ', error);
			});
	}, []);

	// ? Copier les dépenses du mois précédent
	const copyPreviousMonthDepenses = async (currentMonth, currentYear) => {
		let previousMonth = currentMonth - 1;
		let previousYear = currentYear;

		if (previousMonth < 0) {
			previousMonth = 11;
			previousYear = currentYear - 1;
		}

		const previousMonthName = months[previousMonth];
		const previousDocRef = doc(
			db,
			'users',
			currentUser.uid,
			'years',
			String(previousYear),
			'months',
			previousMonthName
		);

		try {
			const previousDocSnap = await getDoc(previousDocRef);
			if (previousDocSnap.exists()) {
				const previousData = previousDocSnap.data();
				return previousData.depenses || [];
			} else {
				return [];
			}
		} catch (error) {
			console.error(
				'Erreur lors de la copie des dépenses du mois précédent : ',
				error
			);
			return [];
		}
	};

	const toggleComponent = (component) => {
		setActiveComponent((prevComponent) =>
			prevComponent === component ? '' : component
		);
	};

	// ? Débouncer saveData
	const debouncedSaveData = useCallback(
		debounce(() => {
			saveData();
		}, 1000)
	);

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
					prime: parseFloat(prime) || 0.0,
					compte: parseFloat(compte) || 0.0,
					epargne: parseFloat(epargne) || 0.0,
					salaireJacques: parseFloat(salaireJacques) || 0.0,
					salaireAstrid: parseFloat(salaireAstrid) || 0.0,
					revenuCaf: parseFloat(revenuCaf) || 0.0,
					imprevus: imprevus,
					loisirs: loisirs,
					maison: maison,
					shopping: shopping,
					courses: courses,
					budgetCourses: parseFloat(budgetCourses) || 450,
					budgetImprevus: parseFloat(budgetImprevus) || 100,
					budgetLoisirs: parseFloat(budgetLoisirs) || 200,
					budgetMaison: parseFloat(budgetMaison) || 100,
					budgetShopping: parseFloat(budgetShopping) || 100,
					depenses: depenses,
				}
			);
			// toast.success('Mise à jour ok !', {
			// 	position: 'bottom-right',
			// 	autoClose: 2000,
			// 	hideProgressBar: false,
			// 	closeOnClick: true,
			// 	pauseOnHover: true,
			// 	draggable: false,
			// 	progress: undefined,
			// 	theme: 'dark',
			// });
		} catch (error) {
			toast.error('Erreur lors de la sauvegarde des données.', {
				position: 'top-right',
				autoClose: 8000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
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
				setImprevus(data.imprevus || []);
				setLoisirs(data.loisirs || []);
				setMaison(data.maison || []);
				setShopping(data.shopping || []);
				setCourses(data.courses || []);
				setBudgetCourses(data.budgetCourses || 450);
				setBudgetImprevus(data.budgetImprevus || 100);
				setBudgetLoisirs(data.budgetLoisirs || 200);
				setBudgetMaison(data.budgetMaison || 100);
				setBudgetShopping(data.budgetShopping || 100);
				setDepenses(data.depenses || []);
			} else {
				// Initialiser les données pour le mois courant sans écraser les futures mises à jour
				const previousDepenses = await copyPreviousMonthDepenses(
					selectedMonth,
					selectedYear
				);
				setPrime(null);
				setCompte(null);
				setEpargne(null);
				setSalaireJacques(null);
				setSalaireAstrid(null);
				setRevenuCaf(null);
				setBudgetCourses(450);
				setBudgetImprevus(100);
				setBudgetLoisirs(200);
				setBudgetMaison(100);
				setBudgetShopping(100);
				setCourses([]);
				setImprevus([]);
				setLoisirs([]);
				setShopping([]);
				setDepenses(
					previousDepenses.length > 0 ? previousDepenses : depensesList
				);
			}
		} catch (error) {
			console.error('Erreur lors du chargement des données : ', error);
		}
	};

	// ! Gérer le montant du compte (en fonction du mois en cours)
	const updateFutureMonthsAccounts = async (
		currentMonthIndex,
		currentYear,
		newAccountValue
	) => {
		for (let i = currentMonthIndex + 1; i < months.length; i++) {
			const month = months[i];
			const docRef = doc(
				db,
				'users',
				currentUser.uid,
				'years',
				String(currentYear),
				'months',
				month
			);

			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					await setDoc(docRef, { compte: newAccountValue }, { merge: true });
				} else {
					await setDoc(docRef, { compte: newAccountValue });
				}
			} catch (error) {
				console.error(
					'Erreur lors de la mise à jour des comptes des mois suivants : ',
					error
				);
			}
		}
	};

	// ! Sauvegardes temporaires : comptes, epargne, salaires, caf ...
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
			const newAccountValue = parseFloat(tempCompte) || 0;
			setCompte(newAccountValue);
			updateFutureMonthsAccounts(selectedMonth, selectedYear, newAccountValue);
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
	const handleSaveBudgetCourses = () => {
		if (tempBudgetCourses) {
			setBudgetCourses(parseFloat(tempBudgetCourses) || 0);
			setTempBudgetCourses('');
		} else {
			return;
		}
	};
	const getTotalEntries = () => {
		return (
			parseFloat(prime || 0) +
			parseFloat(salaireJacques || 0) +
			parseFloat(salaireAstrid || 0) +
			parseFloat(revenuCaf || 0)
		);
	};

	// ! Gestion des imprévus
	const handleAddImprevus = () => {
		setImprevus((prevImprevus) => {
			// Trouver le plus grand identifiant actuel et ajouter 1 pour le nouvel identifiant
			const newId =
				prevImprevus.length > 0
					? Math.max(...prevImprevus.map((imprevu) => imprevu.id)) + 1
					: 1;
			const newImprevus = [
				...prevImprevus,
				{ id: newId, libelle: '', montant: '' },
			];
			return newImprevus;
		});
	};
	const handleImprevuChange = (id, key, value) => {
		setImprevus((prevImprevus) => {
			const nouvelImprevus = prevImprevus.map((imprevu) => {
				if (imprevu.id === id) {
					const ancienMontant = parseFloat(imprevu.montant || 0);
					const updatedImprevu = { ...imprevu, [key]: value };

					if (key === 'montant') {
						const nouveauMontant = parseFloat(value || 0);
						const difference = nouveauMontant - ancienMontant;
						setCompte((prevCompte) => prevCompte - difference);
					}

					return updatedImprevu;
				}
				return imprevu;
			});

			return nouvelImprevus;
		});
		setTimeout(() => {
			saveData();
		}, 500);
	};
	const handleDeleteImprevu = (id) => {
		console.log(`L'ID à effacer : ${id}`);
		setImprevus((prevImprevus) => {
			const newImprevus = prevImprevus.filter((imprevu) => imprevu.id !== id);
			const imprevuToRemove = prevImprevus.find((imprevu) => imprevu.id === id);
			if (imprevuToRemove) {
				setCompte(
					(prevCompte) => prevCompte + parseFloat(imprevuToRemove.montant || 0)
				); // Ajuster le compte
			}
			setTimeout(() => {
				saveData(newImprevus); // Pass the updated imprevus to saveData
			}, 500); // Utilisation de setTimeout pour donner le temps à l'état de se mettre à jour avant de sauvegarder
			return newImprevus;
		});
	};
	const handleSaveBudgetImprevus = () => {
		if (tempBudgetImprevus) {
			setBudgetImprevus(parseFloat(tempBudgetImprevus) || 0);
			setTempBudgetImprevus('');
		} else {
			return;
		}
	};
	const handleSaveImprevus = () => {
		saveData();
	};
	const getTotalImprevus = () => {
		return imprevus.reduce(
			(total, imprevu) => total + parseFloat(imprevu.montant || 0),
			0
		);
	};

	// ! Gestion des dépenses
	const generateNewId = (depenses) => {
		const ids = depenses.map((depense) => depense.id);
		return ids.length ? Math.max(...ids) + 1 : 1;
	};
	const handleAddDepense = () => {
		setDepenses((prevDepenses) => [
			...prevDepenses,
			{
				id: generateNewId(prevDepenses),
				libelle: '',
				montant: 0.0,
				compte: '',
				categorie: '',
				depose: false,
				paye: false,
				fixe: false,
			},
		]);
	};
	const handleDeleteDepense = (id) => {
		setDepenses((prevDepenses) =>
			prevDepenses.filter((depense) => depense.id !== id)
		);
		setTimeout(() => {
			saveData();
		}, 500); // Utilisation de setTimeout pour donner le temps à l'état de se mettre à jour avant de sauvegarder
	};
	const handleDepenseChange = (id, key, value) => {
		setDepenses((prevDepenses) =>
			prevDepenses.map((depense) =>
				depense.id === id ? { ...depense, [key]: value } : depense
			)
		);
		saveData();
	};
	const handleSaveDepenses = () => {
		setTimeout(() => {
			saveData();
		}, 500); // Utilisation de setTimeout pour donner le temps à l'état de se mettre à jour avant de sauvegarder
	};
	const getTotalDepenses = () => {
		return depenses
			.reduce((total, depense) => total + parseFloat(depense.montant || 0.0), 0)
			.toFixed(2);
	};

	// ! Gestion des courses
	const handleAddCourse = () => {
		setCourses((prevCourses) => {
			// Trouver le plus grand identifiant actuel et ajouter 1 pour le nouvel identifiant
			const newId =
				prevCourses.length > 0
					? Math.max(...prevCourses.map((course) => course.id)) + 1
					: 1;
			const newCourses = [...prevCourses, { id: newId, label: '', amount: '' }];
			return newCourses;
		});
	};
	const handleDeleteCourse = (id) => {
		setCourses((prevCourses) => {
			const newCourses = prevCourses.filter((course) => course.id !== id);
			const courseToRemove = prevCourses.find((course) => course.id === id);
			if (courseToRemove) {
				setCompte(
					(prevCompte) => prevCompte + parseFloat(courseToRemove.amount || 0)
				); // Ajuster le compte
			}
			return newCourses;
		});
		saveData();
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

	// ! Gestion des loisirs
	const handleAddLoisirs = () => {
		setLoisirs((prevLoisirs) => {
			const newId =
				prevLoisirs.length > 0
					? Math.max(...prevLoisirs.map((loisir) => loisir.id)) + 1
					: 1;
			const newLoisirs = [
				...prevLoisirs,
				{ id: newId, libelle: '', montant: '' },
			];
			return newLoisirs;
		});
	};
	const handleLoisirChange = (id, key, value) => {
		setLoisirs((prevLoisirs) => {
			const nouveauLoisirs = prevLoisirs.map((loisir) => {
				if (loisir.id === id) {
					const ancienMontant = parseFloat(loisir.montant || 0);
					const updatedLoisir = { ...loisir, [key]: value };

					if (key === 'montant') {
						const nouveauMontant = parseFloat(value || 0);
						const difference = nouveauMontant - ancienMontant;
						setCompte((prevCompte) => prevCompte - difference);
					}

					return updatedLoisir;
				}
				return loisir;
			});

			return nouveauLoisirs;
		});
		setTimeout(() => {
			saveData();
		}, 500);
	};
	const handleDeleteLoisir = (id) => {
		setLoisirs((prevLoisirs) => {
			const newLoisirs = prevLoisirs.filter((loisir) => loisir.id !== id);
			const loisirToRemove = prevLoisirs.find((loisir) => loisir.id === id);
			if (loisirToRemove) {
				setCompte(
					(prevCompte) => prevCompte + parseFloat(loisirToRemove.montant || 0)
				); // Ajuster le compte
			}
			setTimeout(() => {
				saveData(newLoisirs); // Pass the updated loisirs to saveData
			}, 500); // Utilisation de setTimeout pour donner le temps à l'état de se mettre à jour avant de sauvegarder
			return newLoisirs;
		});
	};
	const handleSaveBudgetLoisirs = () => {
		if (tempBudgetLoisirs) {
			setBudgetLoisirs(parseFloat(tempBudgetLoisirs) || 0);
			setTempBudgetLoisirs('');
		} else {
			return;
		}
	};
	const handleSaveLoisirs = () => {
		saveData();
	};
	const getTotalLoisirs = () => {
		return loisirs.reduce(
			(total, loisir) => total + parseFloat(loisir.montant || 0),
			0
		);
	};

	// ! Gestion des dépenses de la maison
	const handleAddMaison = () => {
		setMaison((prevMaison) => {
			const newId =
				prevMaison.length > 0
					? Math.max(...prevMaison.map((m) => m.id)) + 1
					: 1;
			const newMaison = [
				...prevMaison,
				{ id: newId, libelle: '', montant: '' },
			];
			return newMaison;
		});
	};
	const handleMaisonChange = (id, key, value) => {
		setMaison((prevMaison) => {
			const nouveauMaison = prevMaison.map((m) => {
				if (m.id === id) {
					const ancienMontant = parseFloat(m.montant || 0);
					const updatedMaison = { ...m, [key]: value };

					if (key === 'montant') {
						const nouveauMontant = parseFloat(value || 0);
						const difference = nouveauMontant - ancienMontant;
						setCompte((prevCompte) => prevCompte - difference);
					}

					return updatedMaison;
				}
				return maison;
			});

			return nouveauMaison;
		});
		setTimeout(() => {
			saveData();
		}, 500);
	};
	const handleDeleteMaison = (id) => {
		setMaison((prevMaison) => {
			const newMaison = prevMaison.filter((m) => m.id !== id);
			const maisonToRemove = prevMaison.find((m) => m.id === id);
			if (maisonToRemove) {
				setCompte(
					(prevCompte) => prevCompte + parseFloat(maisonToRemove.montant || 0)
				); // Ajuster le compte
			}
			setTimeout(() => {
				saveData(newMaison); // Pass the updated loisirs to saveData
			}, 500); // Utilisation de setTimeout pour donner le temps à l'état de se mettre à jour avant de sauvegarder
			return newMaison;
		});
	};
	const handleSaveBudgetMaison = () => {
		if (tempBudgetMaison) {
			setBudgetMaison(parseFloat(tempBudgetMaison) || 0);
			setTempBudgetMaison('');
		} else {
			return;
		}
	};
	const handleSaveMaison = () => {
		saveData();
	};
	const getTotalMaison = () => {
		return maison.reduce((total, m) => total + parseFloat(m.montant || 0), 0);
	};

	// ! Gestion des dépenses de shopping
	const handleAddShopping = () => {
		setShopping((prevShopping) => {
			const newId =
				prevShopping.length > 0
					? Math.max(...prevShopping.map((shopping) => shopping.id)) + 1
					: 1;
			const newShopping = [
				...prevShopping,
				{ id: newId, libelle: '', montant: '' },
			];
			return newShopping;
		});
	};
	const handleShoppingChange = (id, key, value) => {
		setShopping((prevShopping) => {
			const nouveauShopping = prevShopping.map((shopping) => {
				if (shopping.id === id) {
					const ancienMontant = parseFloat(shopping.montant || 0);
					const updatedShopping = { ...shopping, [key]: value };

					if (key === 'montant') {
						const nouveauMontant = parseFloat(value || 0);
						const difference = nouveauMontant - ancienMontant;
						setCompte((prevCompte) => prevCompte - difference);
					}

					return updatedShopping;
				}
				return shopping;
			});

			return nouveauShopping;
		});
		setTimeout(() => {
			saveData();
		}, 500);
	};
	const handleDeleteShopping = (id) => {
		setShopping((prevShopping) => {
			const newShopping = prevShopping.filter((shopping) => shopping.id !== id);
			const shoppingToRemove = prevShopping.find(
				(shopping) => shopping.id === id
			);
			if (shoppingToRemove) {
				setCompte(
					(prevCompte) => prevCompte + parseFloat(shoppingToRemove.montant || 0)
				); // Ajuster le compte
			}
			setTimeout(() => {
				saveData(newShopping); // Pass the updated loisirs to saveData
			}, 500); // Utilisation de setTimeout pour donner le temps à l'état de se mettre à jour avant de sauvegarder
			return newShopping;
		});
	};
	const handleSaveBudgetShopping = () => {
		if (tempBudgetShopping) {
			setBudgetShopping(parseFloat(tempBudgetShopping) || 0);
			setTempBudgetShopping('');
		} else {
			return;
		}
	};
	const handleSaveShopping = () => {
		saveData();
	};
	const getTotalShopping = () => {
		return shopping.reduce(
			(total, shopping) => total + parseFloat(shopping.montant || 0),
			0
		);
	};

	// ! Calculer le reste d'argent disponible
	const getReste = () => {
		const totalEntries = getTotalEntries();
		const totalDepenses = getTotalDepenses();

		const resteTotal =
			totalEntries -
			totalDepenses -
			budgetCourses -
			budgetImprevus -
			budgetLoisirs -
			budgetMaison -
			budgetShopping;
		return resteTotal.toFixed(2);
	};

	// ! ***** VARIABLES *****
	const reste = getReste();

	const totalEntries = getTotalEntries();
	const totalDepenses = getTotalDepenses();
	const totalImprevus = getTotalImprevus();
	const totalCourses = getTotalCourses();
	const totalLoisirs = getTotalLoisirs();
	const totalMaison = getTotalMaison();
	const totalShopping = getTotalShopping();

	// ! ***** RETURN *****
	if (isLoading) {
		console.log('LOADING...');
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<p className='text-white text-2xl'>Chargement...</p>
			</div>
		);
	}
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
			<Header userWelcome={userWelcome} currentUser={currentUser} />

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
				reste={reste}
				getTotalEntries={getTotalEntries}
				getTotalDepenses={getTotalDepenses}
				getTotalImprevus={getTotalImprevus}
				getTotalCourses={getTotalCourses}
				budgetCourses={budgetCourses}
				totalEntrees={totalEntrees}
			/>

			{/* Barre de navigation pour les composants */}
			<ComponentNavbar
				activeComponent={activeComponent}
				toggleComponent={toggleComponent}
			/>

			{/* ----- Affichage des composants en fonction de l'état ----- */}

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

			{/* ***** DÉPENSES ***** */}
			{activeComponent === 'depenses' && (
				<Depenses
					depenses={depenses}
					handleDepenseChange={handleDepenseChange}
					handleSaveDepenses={handleSaveDepenses}
					handleDeleteDepense={handleDeleteDepense}
					handleAddDepense={handleAddDepense}
					getTotalDepenses={getTotalDepenses}
				/>
			)}

			{/* ***** COURSES ***** */}
			{activeComponent === 'courses' && (
				<Courses
					budgetCourses={budgetCourses}
					tempBudgetCourses={tempBudgetCourses}
					setTempBudgetCourses={setTempBudgetCourses}
					handleSaveBudgetCourses={handleSaveBudgetCourses}
					getTotalCourses={getTotalCourses}
					handleAddCourse={handleAddCourse}
					courses={courses}
					handleCourseChange={handleCourseChange}
					handleSaveCourses={handleSaveCourses}
					handleDeleteCourse={handleDeleteCourse}
				/>
			)}

			{/* ***** IMPRÉVUS ***** */}
			{activeComponent === 'imprevus' && (
				<Imprevu
					imprevus={imprevus}
					handleAddImprevus={handleAddImprevus}
					handleImprevuChange={handleImprevuChange}
					handleSaveImprevus={handleSaveImprevus}
					budgetImprevus={budgetImprevus}
					tempBudgetImprevus={tempBudgetImprevus}
					setTempBudgetImprevus={setTempBudgetImprevus}
					handleSaveBudgetImprevus={handleSaveBudgetImprevus}
					getTotalImprevus={getTotalImprevus}
					handleDeleteImprevu={handleDeleteImprevu}
				/>
			)}

			{/* ***** LOISIRS ***** */}
			{activeComponent === 'loisirs' && (
				<Loisirs
					loisirs={loisirs}
					handleAddLoisirs={handleAddLoisirs}
					handleLoisirChange={handleLoisirChange}
					handleSaveLoisirs={handleSaveLoisirs}
					budgetLoisirs={budgetLoisirs}
					tempBudgetLoisirs={tempBudgetLoisirs}
					setTempBudgetLoisirs={setTempBudgetLoisirs}
					handleSaveBudgetLoisirs={handleSaveBudgetLoisirs}
					getTotalLoisirs={getTotalLoisirs}
					handleDeleteLoisir={handleDeleteLoisir}
				/>
			)}

			{/* ***** MAISON ***** */}
			{activeComponent === 'maison' && (
				<Maison
					maison={maison}
					handleAddMaison={handleAddMaison}
					handleMaisonChange={handleMaisonChange}
					handleSaveMaison={handleSaveMaison}
					budgetMaison={budgetMaison}
					tempBudgetMaison={tempBudgetMaison}
					setTempBudgetMaison={setTempBudgetMaison}
					handleSaveBudgetMaison={handleSaveBudgetMaison}
					getTotalMaison={getTotalMaison}
					handleDeleteMaison={handleDeleteMaison}
				/>
			)}

			{/* ***** SHOPPING ***** */}
			{activeComponent === 'shopping' && (
				<Shopping
					shopping={shopping}
					handleAddShopping={handleAddShopping}
					handleShoppingChange={handleShoppingChange}
					handleSaveShopping={handleSaveShopping}
					budgetShopping={budgetShopping}
					tempBudgetShopping={tempBudgetShopping}
					setTempBudgetShopping={setTempBudgetShopping}
					handleSaveBudgetShopping={handleSaveBudgetShopping}
					getTotalShopping={getTotalShopping}
					handleDeleteShopping={handleDeleteShopping}
				/>
			)}

			{/* ***** SEPARATOR ***** */}
			<div className='mt-10 mb-5 h-1 bg-zinc-500'></div>

			{/* ***** STATS ***** */}
			<Statistics
				depenses={depenses}
				imprevus={imprevus}
				loisirs={loisirs}
				courses={courses}
				maison={maison}
				totalEntries={totalEntries}
			/>

			{/* ***** GRAPHIQUES ***** */}
			<ExpenseChart
				depenses={depenses}
				imprevus={imprevus}
				loisirs={loisirs}
				courses={courses}
				maison={maison}
				shopping={shopping}
			/>

			{/* ***** CONSEILS ***** */}
			<Recommendations
				savings={reste}
				totalDepenses={totalDepenses}
				totalImprevus={totalImprevus}
				totalLoisirs={totalLoisirs}
				totalCourses={totalCourses}
				totalMaison={totalMaison}
				totalShopping={totalShopping}
			/>

			{/* *** FOOTER *** */}
			<footer className='text-center text-gray-300 sticky top-full mt-40'>
				<p>Family Budget - © {currentYear}</p>
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

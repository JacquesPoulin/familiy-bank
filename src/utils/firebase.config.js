// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ! Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ! Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAxa2P85xK9i9eiu7IFaRaKiw6sEpPkcZU',
	authDomain: 'family-budget64.firebaseapp.com',
	projectId: 'family-budget64',
	storageBucket: 'family-budget64.appspot.com',
	messagingSenderId: '986732562192',
	appId: '1:986732562192:web:450642d7c324e4b7478795',
};

// ! Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

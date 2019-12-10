import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA89B1S9K3459_88GKqgzzhS9DzTzvqoeU",
  authDomain: "online-react-store.firebaseapp.com",
  databaseURL: "https://online-react-store.firebaseio.com",
  projectId: "online-react-store",
  storageBucket: "online-react-store.appspot.com",
  messagingSenderId: "580325357828",
  appId: "1:580325357828:web:93b8298b21b231239cf851",
  measurementId: "G-707Y9PT438"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

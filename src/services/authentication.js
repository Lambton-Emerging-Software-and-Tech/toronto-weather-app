import { fireApp } from '../firebase';
import {getAuth , signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'

const auth = getAuth(); 
onAuthStateChanged(auth, (user) => {
    console.log("Auth state has changed", user)
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      localStorage.setItem('access_token', JSON.stringify(user?.accessToken));
      localStorage.setItem('refresh_token', JSON.stringify(user.refreshToken))
      localStorage.setItem('displayName', JSON.stringify(user.displayName))

      // ...
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('displayName')
    }
  });

export const userLogout = () => {
  return signOut(auth)
}
export const registerUserwithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const logInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const updateUserDisplayName = (user, updatedName) => {
  return updateProfile(user, {
    displayName: updatedName, photoURL: ""
  });
}


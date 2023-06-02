import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const auth = getAuth(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mange user by email password
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const addNamePhoto = (currentUser, name, photo)=>{
        return updateProfile(currentUser,{
            displayName: name,
            photoURL: photo || 'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png'
        })
    }
    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email,password);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    // Social
    
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const signInWithFacebook = () =>{
        setLoading(true)
        return signInWithPopup(auth, facebookProvider);
    }


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current User', currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }

    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        addNamePhoto,
        signInWithGoogle,
        signInWithFacebook
    }

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
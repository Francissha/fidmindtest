
import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword } from "firebase/auth";

const AuthContext =  createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email,password) => {

        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login the user
    const loginUser = async (email, password) => {
    
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sing up with google
    const signInWithGoogle = async () => {
     
        return await signInWithPopup(auth, googleProvider)
         //result.user
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

     // password reset
     const doPasswordReset = async (email) => {
        return await sendPasswordResetEmail(auth , email);
     }

     // password change
     const doPasswordChange = async (password) => {
        return await updatePassword(auth.currentUser, password);
     }

     // email verification

     const doSendEmailVerification = async () =>{
        return await doSendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/home`
        })
     }


    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])


    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        doPasswordReset,
        doPasswordChange,
        doSendEmailVerification
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

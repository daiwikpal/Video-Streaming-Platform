"use client";

import { useState } from 'react';
import styles from './SignInPage.module.css'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebase';
import { getDatabase, ref, set } from 'firebase/database';


export default function Signin(){
    const [formMode, setFormMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
   

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (formMode === 'signup') {
            
            let initApp = app;
            const auth = getAuth(initApp);
            const database = getDatabase(initApp);

            if (password == confirmPassword) {
                createUserWithEmailAndPassword(auth,email,password)
                    .then(userCredential => {
                        // declare user variable
                        const user = userCredential.user;
                        // add user to firebase database
                        var database_ref = ref(database, 'users/' + user.uid);
                        // creating user data
                        var user_data = {
                            email : email,
                            last_login : Date.now()
                        }

                        set(database_ref,user_data);
                        alert("User Created!");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        alert(errorMessage);
                    });
            }
            else {
                alert("Passwords do not match.");
            }

            console.log('Signing up with', email, password, confirmPassword);
            // Assume signup is successful and switch to login mode or directly log the user in
        } else {
            // Implement  sign-in logic here.
            console.log('Signing in with', email, password);
            // Redirect to home page after login
        }
    };

    const toggleFormMode = () => {
        setFormMode(formMode === 'login' ? 'signup' : 'login');
    };

    return (
        <div className={styles.signInContainer}>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {formMode === 'signup' && (
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className={styles.signInButton}>
                    {formMode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
                <button type="button" onClick={toggleFormMode} className={styles.toggleFormModeButton}>
                    {formMode === 'login' ? 'Need an account? Sign Up' : 'Have an account? Sign In'}
                </button>
            </form>
        </div>
    );
}
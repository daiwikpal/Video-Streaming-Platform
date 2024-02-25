"use client";

import { useState } from 'react';
import styles from './SignInPage.module.css'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Signin(){
    const [formMode, setFormMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
   

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (formMode === 'signup') {
            // Implement  sign-up logic here.
            // Make sure to include validation, for example, check if the passwords match.
            const auth = getAuth();
            createUserWithEmailAndPassword(auth,email,password)
            .then(userCredential => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

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
"use client";

import { useState } from 'react';
import styles from './SignInPage.module.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebase';
import { getDatabase, ref, set } from 'firebase/database';


export default function Signin(){
    const [formMode, setFormMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [username, setUsername] = useState(''); 
    const [dateOfBirth, setDOB] = useState('');
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

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
                            username : username,
                            dateOfBirth : dateOfBirth,
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
            // Implement sign-in logic here.
            let initApp = app;
            const auth = getAuth(initApp);
            try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            // signed in
            alert("user successfully logged in")
            const user = userCredential.user;
            console.log('Signed in as', user.email);
            // <script type="text/javascript">
            //     document.getElementById("signInButton").onclick = function () {
            //         location.href = "http://localhost:3000/myCourses"
            //     };
            // </script>
            } catch (error) {
                alert("Error signing in with email and password")
                console.error('Error signing in with email and password');
            }
            console.log('Signing in with', email, password);
            // redirect to home page after sign in
        }
    };

    const toggleFormMode = () => {
        setFormMode(formMode === 'login' ? 'signup' : 'login');
    };

    return (
        
        <div className={styles.signInContainer}>
            <div className={styles.description}>
            <h2 className={styles.formTitle}>{formMode === 'login' ? 'Sign into your Account' : 'Create a New Account'}</h2>
            </div>
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
                {formMode === 'signup' && (
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                {formMode === 'signup' && (
                    <div className={styles.formGroup}>
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDOB(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={passwordVisible}
                            onChange={togglePasswordVisibility}
                        /> Show Password
                    </label>
                                        
                </div>
                {formMode === 'signup' && (
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
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
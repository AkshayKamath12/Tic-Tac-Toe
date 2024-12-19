import React, { useState } from 'react';
import { createUser, signIn } from './firebase';
import './Auth.css';

export default function HandleAuth() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        if (isSignUp) {
            // Handle sign-up logic
            console.log('Signing up:', { email, password });
            await createUser("Gandharva Naveen", email, password)
        } else {
            // Handle sign-in logic
            console.log('Signing in:', { email, password });
            const success = await signIn(email, password);
            if (!success) {
                alert("Unable to sign in. Check your email and/or password!")
            }
        }
    }

    return (
        <div className="auth-holder">
            <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <p className="auth-toggle">
                {isSignUp
                    ? 'Already have an account? '
                    : "Don't have an account? "}
                <span onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
            </p>
        </div>
    );
}

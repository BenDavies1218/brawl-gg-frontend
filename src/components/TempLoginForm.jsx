import { useState } from 'react';
import { useAuth } from '../data/AuthProvider'; // Ensure correct import path
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth(); // Get the login function from the context
    const navigate = useNavigate();

    function handleForm(event) {
        event.preventDefault();
        console.log('Submitting form with', { email, password });

        const userData = { 
            email: email,
            password: password };

        fetch("https://brawl-gg-backend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            if (data.jwt) {
                login(data.jwt); // Save the JWT
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                console.error('No token received in the response.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return (
        <form onSubmit={handleForm}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input type="submit" value="Login" />
        </form>
    );
}

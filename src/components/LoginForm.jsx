import React, { useState } from 'react';
import { useUserDispatch } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { makeLoginRequest } = useUserDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await makeLoginRequest(email, password);
      setSuccess('Login successful! You will be redirected shortly.');
      console.log('Login successful');
      setTimeout(() => { 
        navigate('/dashboard'); 
      }, 2000); 
    } catch (error) {
      if (error.message == 'Account not found') {
        setError('Account does not exist. Please create an account or try again.');
      } else {
        setError('Error occured while logging in');
      }
    }
  };

  return (
    <form
      className="flex flex-col justify-center bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto z-10 border-temp-black border-2"
      onSubmit={handleSubmit}
    >
      <h4 className="text-[#fbae3c] font-extrabold text-2xl mb-6 text-center">
        Login
      </h4>

      <label className="text-left text-lg font-bold mb-4">
        <span className="text-white">Email:</span>
        <input
          className="mt-2 w-full px-4 py-2 bg-black border border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
      </label>

      <label className="text-left text-lg font-bold mb-6">
        <span className="text-white">Password:</span>
        <input
          className="mt-2 w-full px-4 py-2 bg-black border border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
      </label>

      <div className="flex justify-between text-sm text-[#fbae3c] mb-6">
        <a href="/forgot-password" className="hover:underline">
          Forgot password?
        </a>
        <a href="/signup" className="hover:underline">
          Create account
        </a>
      </div>

      {error && <p className="text-red-500 font-bold mb-4 text-center">{error}</p>}
      {success && <p className="text-[#fbae3c] font-bold mb-4 text-center">{success}</p>}

      <button
        className="mx-auto w-full px-5 py-2 rounded-md bg-[#fbae3c] text-white font-bold hover:bg-[#f8a32a] active:bg-[#e89c1b] transition-colors duration-300"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
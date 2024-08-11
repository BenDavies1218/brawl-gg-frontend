import React, { useState } from 'react';
import { useUserDispatch } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const { makeForgotPasswordRequest } = useUserDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await makeForgotPasswordRequest(email.toString());
      console.log(result);
      setSuccess("Password reset email sent successfully! Check email for recovery code");
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      if (error.message === "Email not found") {
        setError("Email not found. Please try again.");
      } else {
        setError("Error occurred while sending password recovery code.");
      }
    }
  };

  return (
    <form className='flex flex-col justify-center bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto z-10 border-temp-black border-2' onSubmit={handleSubmit}>
      <label className='text-left text-lg font-bold mb-4'>
        Email:
        <input className='mt-2 w-full px-4 py-2 bg-black border border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none' size="100" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </label>

      {error && <p className="text-red-500 font-bold">{error}</p>}
      {success && <p className="text-highlight font-bold">{success}</p>}

      <button className='mx-auto w-full px-5 py-2 rounded-md bg-[#fbae3c] text-white font-bold hover:bg-[#f8a32a] active:bg-[#e89c1b] transition-colors duration-300' type="submit">
        Send Email
      </button>
    </form>
  );
};

export default ForgotPassword;
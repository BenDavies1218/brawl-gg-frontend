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
    <form className='flex flex-col justify-evenly bg-amber-400 content-center h-full w-1/2 text-center' onSubmit={handleSubmit}>
      <h4 className='text-black font-bold text-xl'>Forgot Password</h4>

      <label className='mx-auto text-black text-left text-lg font-bold'>
        Email:
        <input className='text-black rounded border-black border-2 w-full' size="100" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </label>

      {error && <p className="text-red-500 font-bold">{error}</p>}
      {success && <p className="text-black font-bold">{success}</p>}

      <button className='mx-auto w-fit px-5 py-2 rounded-md text-white font-bold relative bg-black' type="submit">
        Send Password Reset Email
      </button>
    </form>
  );
};

export default ForgotPassword;
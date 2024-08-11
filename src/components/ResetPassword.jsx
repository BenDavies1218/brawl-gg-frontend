import React, { useState } from 'react';
import { useUserDispatch } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [passcode, setPasscode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { makeResetPasswordRequest } = useUserDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before making a request
    setSuccess(false); // Reset success message before making a request
  
    if (!passcode || !newPassword) {
      setError("Passcode and new password cannot be empty.");
      return;
    }
  
    try {
      const result = await makeResetPasswordRequest(passcode, newPassword);
      setSuccess(true);
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.message); // Display the error message
    }
  };

  return (
    <form className='flex flex-col justify-evenly bg-amber-400 content-center h-full w-1/2 text-center' onSubmit={handleSubmit}>
      <h4 className='text-black font-bold text-xl'>Reset Password</h4>

      <label className='mx-auto text-black text-left text-lg font-bold'>
        Passcode:
        <input
          className='text-black rounded border-black border-2 w-full'
          size="100"
          type="text"
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
        />
      </label>

      <label className='mx-auto text-black text-left text-lg font-bold'>
        New Password:
        <input
          className='text-black rounded border-black border-2 w-full'
          size="100"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </label>

      <div className="flex justify-around">
        <a href="/login" className="text-violet-900 font-bold text-l">Back to login</a>
      </div>

      {error && <p className="text-red-500 font-bold">{error}</p>}
      {success && <p className="text-highlight font-bold">Password reset successfully! Redirecting to login page...</p>}

      <button className='mx-auto w-fit px-5 py-2 rounded-md text-white font-bold relative bg-black' type="submit">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
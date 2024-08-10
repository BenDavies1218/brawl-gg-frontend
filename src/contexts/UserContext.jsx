/* eslint-disable no-useless-catch */
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserDataContext = createContext({
  userJwt: "",
  decodedUserJwt: {},
});

const UserDispatchContext = createContext({
  makeSignupRequest: () => {},
  makeLoginRequest: () => {},
  makeForgotPasswordRequest: () => {},
  makeResetPasswordRequest: () => {},
  logout: () => {}
});

export function useUserData() {
  return useContext(UserDataContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

export default function UserProvider({ children }) {
  const [userJwt, setUserJwt] = useState("");
  const [decodedUserJwt, setDecodedUserJwt] = useState({});

  const makeSignupRequest = async (username, email, password) => {
    try {
      const bodyData = { username, email, password };
      const response = await fetch("https://brawl-gg-backend.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const signUpResult = await response.json();
      setUserJwt(signUpResult.jwt);
      setDecodedUserJwt(signUpResult.decodedJwt);
    } catch (error) {
      // console.error(error);
    }
  };

  const makeLoginRequest = async (email, password) => {
    try {
      const response = await fetch("https://brawl-gg-backend.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Account not found');
        } else if (response.status === 400) {
          throw new Error('Incorrect details');
        } else {
          throw new Error('Error occurred while logging in');
        }
      }

      const loginResult = await response.json();
      setUserJwt(loginResult.jwt);
      setDecodedUserJwt(loginResult.decodedJwt);
    } catch (error) {
      throw error;
    }
  };

  const makeForgotPasswordRequest = async (email) => {
    try {
      const response = await fetch("https://brawl-gg-backend.onrender.com/login/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      // Store recoveryId and email in localStorage
      localStorage.setItem('recoveryId', result.recoveryId);
      localStorage.setItem('email', email);
      // console.log('localStorage values set:', localStorage.getItem('recoveryId'), localStorage.getItem('email'));
      return result;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  };

  const makeResetPasswordRequest = async (passcode, newPassword) => {
    try {
      const email = localStorage.getItem('email');
      const recoveryId = localStorage.getItem('recoveryId');
      // console.log('Retrieved values:', email, recoveryId, passcode, newPassword);
  
      if (!email || !recoveryId) {
        throw new Error("User data is not available");
      }
  
      const requestBody = { email, recoveryId, passcode, newPassword };
      // console.log('Request body:', requestBody);
  
      const response = await fetch(
        "https://brawl-gg-backend.onrender.com/login/new-password",
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // console.log(response); 
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }
  
      const result = await response.json();
      // console.log(result); 
  
      // Check if the response contains an error message
      if (result.message && result.message !== 'Password updated successfully.') {
        throw new Error(result.message);
      }
  
      // Clear localStorage values after successful password reset
      localStorage.removeItem('recoveryId');
      localStorage.removeItem('email');
  
      return result;
    } catch (error) {
      // console.error(error); 
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUserJwt(null);
    location.reload();
  };

  return (
    <UserDataContext.Provider value={{ userJwt, decodedUserJwt }}>
      <UserDispatchContext.Provider value={{ makeSignupRequest, makeLoginRequest, makeForgotPasswordRequest, makeResetPasswordRequest, logout }}>
        {children}
      </UserDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserDispatchContext);
  if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
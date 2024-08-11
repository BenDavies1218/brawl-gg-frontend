import React, { createContext, useState, useContext } from 'react';
import { useUserData } from './UserContext';

const TournamentStateContext = createContext();
const TournamentDispatchContext = createContext({
  createTournament: () => {},
});

export function useTournamentDispatch() {
    return useContext(TournamentDispatchContext);
}


const TournamentProvider = ({ children }) => {
  const { userJwt } = useUserData(); // Get userJwt from UserContext
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = (action) => {
    switch (action.type) {
      case 'CREATE_TOURNAMENT':
        makeCreateTournamentRequest(action.payload);
        break;
      case 'CLEAR_ERROR':
        clearError();
        break;
      case 'CLEAR_SUCCESS':
        clearSuccess();
        break;
      default:
        console.error('Unknown action type:', action.type);
    }
  };

  const makeCreateTournamentRequest = async (tournamentData) => {
    // console.log('userJwt:', userJwt);

    try {
      const response = await fetch('https://brawl-gg-backend.onrender.com/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          jwt: userJwt
        },
        body: JSON.stringify(tournamentData),
      });

      if (response.ok) {
        setSuccess('Tournament created successfully!');
        console.log('Tournament created successfully:', await response.json());
        // Redirect to tournament list or other page
      } else {
        setError('Error occurred while creating tournament');
        console.error('Error creating tournament:', await response.text());
      }
    } catch (error) {
      setError('Error occurred while creating tournament');
      console.error('Error creating tournament:', error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };

  return (
    <TournamentStateContext.Provider value={{ error, success }}>
      <TournamentDispatchContext.Provider value={{ dispatch, createTournament: makeCreateTournamentRequest, clearError, clearSuccess }}>
        {children}
      </TournamentDispatchContext.Provider>
    </TournamentStateContext.Provider>
  );
};

export { TournamentProvider, TournamentStateContext, TournamentDispatchContext };
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import UserProvider from './contexts/UserContext.jsx';
import { TournamentProvider } from './contexts/TournamentContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TournamentProvider>
        <App />

        </TournamentProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
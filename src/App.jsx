import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivacyPage from './pages/PrivacyPage';
import TosPage from './pages/TosPage'
import './App.css'
import Template from './pages/_Template';
import PageNotFound from './pages/PageNotFound';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPassword';
import TournamentPage from "./pages/TournamentPage";
import TournamentCreationPage from './pages/TournamentCreationPage';

function App() {
  
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/" element={<Template />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/tos" element={<TosPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path="/tournament/:id" element={<TournamentPage />} />
          <Route path ="/tournament-creation" element={<TournamentCreationPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivacyPage from "./pages/PrivacyPage";
import TosPage from "./pages/TosPage";
import "./App.css";
import Template from "./pages/_Template";
import PageNotFound from "./pages/PageNotFound";
import TournamentPage from "./pages/TournamentPage";

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
          <Route path="/tournament/:id" element={<TournamentPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
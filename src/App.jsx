import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layouts/Layout";

import LoggedOutUser from "./navigation/LoggedOutUser";
import LoggedInUser from "./navigation/LoggedInUser";

import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FoundPetPage from "./pages/FoundPetPage";
import LostPetPage from "./pages/LostPetPage";
import FoundPetFormPage from "./pages/FoundPetFormPage";
import LostPetFormPage from "./pages/LostPetFormPage";
import OneLostPetPage from "./pages/OneLostPetPage.jsx";
import OneFoundPetPage from "./pages/OneFoundPetPage.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* The conversations routes should be accessible only if a user */}
            {/* is Logged in */}
            <Route element={<LoggedInUser />}>
              <Route path="/my-profil" element={<ProfilPage />} />
              <Route path="/found-pet" element={<FoundPetPage />} />
              <Route path="/found-pet/:id" element={<OneFoundPetPage />} />
              {/* </Route> */}
              <Route path="/found-pet-form" element={<FoundPetFormPage />} />
              <Route path="/lost-pet" element={<LostPetPage />} />
              <Route path="/lost-pet/:id" element={<OneLostPetPage />} />
              {/* </Route> */}
              <Route path="/lost-pet-form" element={<LostPetFormPage />} />
            </Route>
            {/* Login / Signup routes should be accessible to Logged out users */}

            <Route element={<LoggedOutUser />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<h2>Error page</h2>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

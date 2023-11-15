import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layouts/Layout.jsx";

import LoggedOutUser from "./navigation/LoggedOutUser.jsx";
import LoggedInUser from "./navigation/LoggedInUser.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProfilPage from "./pages/ProfilPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FoundPetPage from "./pages/FoundPetPage.jsx";
import LostPetPage from "./pages/LostPetPage.jsx";
import FoundPetFormPage from "./pages/FoundPetFormPage.jsx";
import LostPetFormPage from "./pages/LostPetFormPage.jsx";
import OneLostPetPage from "./pages/OneLostPetPage.jsx";
import OneFoundPetPage from "./pages/OneFoundPetPage.jsx";
import UpdateLostFormPage from "./pages/UpdateLostFormPage.jsx";
import UpdateFoundFormPage from "./pages/UpdateFoundFormPage.jsx";

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
              <Route
                path="/found-pet-form-update/:id"
                element={<UpdateFoundFormPage />}
              />

              <Route path="/lost-pet" element={<LostPetPage />} />
              <Route path="/lost-pet/:id" element={<OneLostPetPage />} />
              {/* </Route> */}
              <Route path="/lost-pet-form" element={<LostPetFormPage />} />
              <Route
                path="/lost-pet-form-update/:id"
                element={<UpdateLostFormPage />}
              />
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

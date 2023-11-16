import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layouts/Layout.jsx";

import LoggedOutUser from "./navigation/LoggedOutUser.jsx";
import LoggedInUser from "./navigation/LoggedInUser.jsx";

import HomePage from "./pages/HomePage/HomePage.jsx";
import ProfilPage from "./pages/ProfilPage/ProfilPage.jsx";

import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

import FoundPetPage from "./pages/ReportsPages/FoundPetPage/FoundPetPage.jsx";
import LostPetPage from "./pages/ReportsPages/LostPetPage/LostPetPage.jsx";

import FoundPetFormPage from "./pages/Forms/FoundPetFormPage/FoundPetFormPage.jsx";
import LostPetFormPage from "./pages/Forms/LostPetFormPage/LostPetFormPage.jsx";

import UpdateLostFormPage from "./pages/Forms/UpdateLostFormPage/UpdateLostFormPage.jsx";
import UpdateFoundFormPage from "./pages/Forms/UpdateFoundFormPage/UpdateFoundFormPage.jsx";

import OneLostPetPage from "./pages/OneReportPages/OneLostPetPage/OneLostPetPage.jsx";
import OneFoundPetPage from "./pages/OneReportPages/OneFoundPetPage/OneFoundPetPage.jsx";

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

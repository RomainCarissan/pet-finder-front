import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layouts/Layout";

import LoggedOutUser from "./navigation/LoggedOutUser";
import LoggedInUser from "./navigation/LoggedInUser";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FoundPetPage from "./pages/FoundPetPage";
import LostPetPage from "./pages/LostPetPage";
import FoundPetFormPage from "./pages/FoundPetFormPage";
import LostPetFormPage from "./pages/LostPetFormPage";
import OnePetPage from "./pages/OnePetPage.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* The conversations routes should be accessible only if a user */}
            {/* is Logged in */}
            <Route element={<LoggedInUser />}>
              <Route path="/found-pet" element={<FoundPetPage />}>
                <Route path=":id" element={<OnePetPage />} />
              </Route>
              <Route path="/found-pet-form" element={<FoundPetFormPage />} />
              <Route path="/lost-pet" element={<LostPetPage />}>
                <Route path=":id" element={<OnePetPage />} />
              </Route>
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

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/NavBar.jsx";
function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

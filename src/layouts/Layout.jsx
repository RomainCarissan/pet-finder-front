import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/NavBar";
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

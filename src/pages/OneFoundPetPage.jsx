import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import myApi from "../service/service";

function OneFoundPetPage() {
  const [lossReports, setLossReports] = useState(null);

  async function fetchAllLossReports() {
    try {
      const response = await myApi.get("/api/lostpets");
      setLossReports(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllLossReports();
  }, []);

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <p>
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }

  return <h1>OnePetPage</h1>;
}

export default OneFoundPetPage;

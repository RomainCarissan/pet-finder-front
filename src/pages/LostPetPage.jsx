import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import myApi from "../service/service";
function LostPetPage() {
  const [lossReports, setLossReports] = useState(null);

  //fetch all the loss report so the founder can see if there is any reports about the pet he found
  async function fetchAllLossReports() {
    try {
      const response = await myApi.get("/api/lostpets");
      setLossReports(response.data); //I can add filter to is lost = true
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
  return (
    <>
      <div>
        <Link to="/found-pet-form">
          <button>Report a found</button>
        </Link>
      </div>
      <div>
        <h2>Lastly lost pets</h2>
      </div>
      <div className="container">
        {lossReports &&
          lossReports.map((lostPet) => {
            return (
              <Link
                key={lostPet._id}
                to={`/lost-pet/${lostPet._id}`}
                //data-hidden={lostPet.data_hidden ? lostPet.data_hidden : "false"}
              >
                <div className="lostPet">
                  <div className="lostPet-img">
                    <img
                      src={lostPet.picture}
                      style={{ height: "10rem" }}
                      alt={`${lostPet._id} Image`}
                    />
                  </div>
                  <div className="lostPet-info">
                    <h3>{lostPet.petName}</h3>
                    <h4>lost around: {lostPet.lossPlace}</h4>
                    {/* <h4>{lostPet.lossDate}</h4> */}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default LostPetPage;

import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import myApi from "../../../service/service.js";
import "../PetFormPage.css";
import SearchPlaceInput from "../../../components/SearchPlaceInput/SearchPlaceInput.jsx";
import {
  DogFormBreeds,
  DogFormColors,
} from "../../../components/FormTypes/DogFormType.jsx";
import {
  CatFormBreeds,
  CatFormColors,
} from "../../../components/FormTypes/CatFormType.jsx";
import ExoticFormBreeds from "../../../components/FormTypes/ExoticFormType.jsx";

function UpdateLostFormPage() {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);
  const [petData, setPetData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await myApi.get(`/api/lostpets/${id}`);
        setPetData(response.data);
      } catch (error) {
        console.log(error.response);
        setError("Failed to fetch previous pet data");
      }
    };

    fetchPetData();
  }, [id]);

  const petNameInput = useRef();
  const lossDateInput = useRef();
  const [petTypeInput, setPetTypeInput] = useState("");
  const petSexInput = useRef();
  const sterilizedInput = useRef();
  const identificationInput = useRef();
  const mixedInput = useRef();
  const colorsInput = useRef();
  const breedInput = useRef();
  const ageInput = useRef();
  const ageUnitInput = useRef();
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const reportPlaceInput = useRef();
  const [coordonates, setCoordinates] = useState(null); //the 2 states are getting their value through the componant
  const [defaultPlace, setDefaultPlace] = useState(null); //it allows to get back previous data or update it

  // Ensure that petData is available before setting the value of petTypeInput/retrieve default value of place
  useEffect(() => {
    if (petData) {
      setPetTypeInput(petData["petType"]);
      setDefaultPlace(petData["lossPlace"]);
    }
  }, [petData]);

  // Update the coordonates when they are changed in the the componant searchPlaceInput
  const updateCoordinates = (coord) => {
    setCoordinates(coord);
  };
  // Update the list of breeds and colors depending on the petType chosen
  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  async function handleUpdateSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const petName = petNameInput.current.value;
    const lossDate = lossDateInput.current.value;
    const petSex = petSexInput.current.value;
    const sterilized = sterilizedInput.current.value;
    const identification = identificationInput.current.value;
    const breed = breedInput.current.value;
    const mixed = mixedInput.current.value;
    const colors = colorsInput.current.value;
    const age = ageInput.current.value;
    const ageUnit = ageUnitInput.current.value;
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const reportPlace = reportPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    fd.append("sterilized", sterilized);
    fd.append("identification", identification);
    fd.append("breed", breed);
    fd.append("mixed", mixed);
    fd.append("colors", colors);
    fd.append("age", age);
    fd.append("ageUnit", ageUnit);
    fd.append("description", description);
    fd.append("lossPlace", reportPlace);
    if (lossDate) {
      fd.append("lossDate", lossDate);
    }
    if (coordonates) {
      fd.append("latLon", coordonates);
    }
    if (picture) {
      fd.append("picture", picture);
    }

    try {
      const response = await myApi.put(`/api/lostpets/${id}`, fd);
      console.log("lost-pet updated", response);
      navigate(`/lost-pet/${id}`);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <p className="loginPrompt">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!petData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="reportPetFormContainer">
        <h1>Edit my loss report</h1>
        <form onSubmit={handleUpdateSubmit} className="reportPetForm">
          <div className="formField">
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              required="required"
              defaultValue={petData["petName"]}
              placeholder="The name of your pet"
            />
          </div>

          <div className="formField">
            <label htmlFor="lossDate">Loss Date: </label>
            <input
              type="date"
              ref={lossDateInput}
              id="lossDate"
              defaultValue={petData["lossDate"]}
            />
          </div>

          <div className="formField">
            <label htmlFor="petType">Type of Pet: </label>
            <select
              value={petTypeInput}
              id="petType"
              required="required"
              onChange={handlePetTypeChange}
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Exotic">Exotic</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="petSex">Pet Sex: </label>
            <select
              ref={petSexInput}
              id="petSex"
              required="required"
              defaultValue={petData["petSex"]}
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="sterilized">Sterilized: </label>
            <select
              ref={sterilizedInput}
              id="sterilized"
              required="required"
              defaultValue={petData["sterilized"]}
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="identification">Identification: </label>
            <input
              type="text"
              ref={identificationInput}
              id="identification"
              defaultValue={petData["identification"]}
              placeholder="Tatoo or Chip number"
            />
          </div>

          <div className="formField">
            <label htmlFor="breed">Breed: </label>
            <select
              type="text"
              ref={breedInput}
              id="breed"
              required="required"
              defaultValue={petData["breed"]}
            >
              {petTypeInput === "" && (
                <option value="" disabled>
                  Select the type of pet first
                </option>
              )}
              {petTypeInput === "Cat" && <CatFormBreeds></CatFormBreeds>}
              {petTypeInput === "Dog" && <DogFormBreeds></DogFormBreeds>}
              {petTypeInput === "Exotic" && (
                <ExoticFormBreeds></ExoticFormBreeds>
              )}
            </select>
          </div>

          <div className="formField">
            <label htmlFor="mixed">Mixed Breed: </label>
            <select
              ref={mixedInput}
              id="mixed"
              required="required"
              defaultValue={petData["mixed"]}
            >
              <option value="" disabled>
                Select your response
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="colors">Colors: </label>
            <select
              type="text"
              ref={colorsInput}
              id="colors"
              required="required"
              defaultValue={petData["colors"]}
            >
              {petTypeInput === "" && (
                <option value="" disabled>
                  Select the type of pet first
                </option>
              )}
              {petTypeInput === "Cat" && <CatFormColors></CatFormColors>}
              {petTypeInput === "Dog" && <DogFormColors></DogFormColors>}
              {petTypeInput === "Exotic" && <option value="None">None</option>}
            </select>
          </div>

          <div className="formField">
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              ref={ageInput}
              id="age"
              required="required"
              defaultValue={petData["age"]}
              placeholder="The age of your pet"
            />

            <label htmlFor="ageUnit"></label>
            <select
              ref={ageUnitInput}
              id="ageUnit"
              required="required"
              defaultValue={petData["ageUnit"]}
            >
              <option value="" disabled>
                Y/M ?
              </option>
              <option value="year(s)">Year(s)</option>
              <option value="month(s)">Month(s)</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="picture">Picture: </label>
            <input type="file" ref={pictureInput} id="picture" multiple />
          </div>

          <div className="formField">
            <label htmlFor="description">Description: </label>
            <textarea
              rows="3"
              cols="25"
              ref={descriptionInput}
              id="description"
              defaultValue={petData["description"]}
              placeholder="Add additional informations you would like to provide"
            ></textarea>
          </div>

          <div className="formField">
            <label htmlFor="reportPlace">Found Place: </label>
            <SearchPlaceInput
              placeInput={reportPlaceInput} //get the address on the input to store it/update-it
              updateCoordinates={updateCoordinates} //get coordonates if the address is updated/created
              defaultValue={defaultPlace} //retrieve default value to the address
            ></SearchPlaceInput>
          </div>

          <div className="formField">
            <button type="submit" className="submitBtn">
              Save Changes
            </button>
            <button onClick={goBack} className="cancelBtn">
              Cancel
            </button>
          </div>
          <p className="error">{error}</p>
        </form>
      </div>
    </>
  );
}

export default UpdateLostFormPage;

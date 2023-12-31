import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import myApi from "../../../service/service.js";
import "../PetFormPage.css";
import {
  DogFormBreeds,
  DogFormColors,
} from "../../../components/FormTypes/DogFormType";
import {
  CatFormBreeds,
  CatFormColors,
} from "../../../components/FormTypes/CatFormType";
import ExoticFormBreeds from "../../../components/FormTypes/ExoticFormType";
import SearchPlaceInput from "../../../components/SearchPlaceInput/SearchPlaceInput";

function LostPetFormPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const petNameInput = useRef();
  const lossDateInput = useRef();
  const [petTypeInput, setPetTypeInput] = useState("-1");
  const petSexInput = useRef();
  const sterilizedInput = useRef();
  const identificationInput = useRef();
  const mixedInput = useRef();
  /*const colorsInput = useRef(); 
  const breedInput = useRef();*/
  const [colors, setColors] = useState("-1");
  const [breed, setBreed] = useState("-1");
  const ageInput = useRef();
  const ageUnitInput = useRef();
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const reportPlaceInput = useRef(); //the 2 states are getting their value through the componant
  const [coordonates, setCoordinates] = useState(null);

  // Update the coordonates when they are changed in the the componant searchPlaceInput
  const updateCoordinates = (coord) => {
    setCoordinates(coord);
  };

  // Update the list of breeds and colors depending on the petType chosen
  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  const handleColorsChange = (e) => {
    setColors(e.target.value);
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const petName = petNameInput.current.value;
    const lossDate = lossDateInput.current.value;
    const petSex = petSexInput.current.value;
    const sterilized = sterilizedInput.current.value;
    const identification = identificationInput.current.value;
    /* const breed = breedInput.current.value;
    const colors = colorsInput.current.value; */
    const mixed = mixedInput.current.value;
    const age = ageInput.current.value;
    const ageUnit = ageUnitInput.current.value;
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const reportPlace = reportPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("lossDate", lossDate);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    fd.append("sterilized", sterilized);
    fd.append("identification", identification);
    fd.append("breed", breed);
    fd.append("colors", colors);
    fd.append("mixed", mixed);
    fd.append("age", age);
    fd.append("ageUnit", ageUnit);
    fd.append("picture", picture);
    fd.append("description", description);
    fd.append("lossPlace", reportPlace);
    fd.append("latLon", coordonates);

    try {
      const response = await myApi.post("/api/lostpets", fd);
      console.log("lost-pet added", response);
      navigate("/lost-pet");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
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
  return (
    <>
      <div className="reportPetFormContainer">
        <h1>Report a missing pet</h1>
        <form onSubmit={handleSubmit} className="reportPetForm">
          <div className="formField">
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              required="required"
              placeholder="The name of your pet"
            />
          </div>

          <div className="formField">
            <label htmlFor="lossDate">Loss Date: </label>
            <input
              type="date"
              ref={lossDateInput}
              id="lossDate"
              required="required"
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
              <option value="-1" disabled>
                Select your response
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Exotic">Exotic</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="petSex">Pet Sex: </label>
            <select ref={petSexInput} id="petSex" required="required">
              <option selected disabled>
                Select your response
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="I don't know">I don't know</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="sterilized">Sterilized: </label>
            <select ref={sterilizedInput} id="sterilized" required="required">
              <option selected disabled>
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
              placeholder="Tatoo or Chip number"
            />
          </div>

          <div className="formField">
            <label htmlFor="breed">Breed: </label>
            <select
              type="text"
              /* ref={breedInput} */ value={breed}
              onChange={handleBreedChange}
              id="breed"
            >
              {petTypeInput === "-1" && (
                <option value="-1" disabled>
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
            <select ref={mixedInput} id="mixed" required="required">
              <option value="default" disabled>
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
              /* ref={colorsInput} */
              value={colors}
              onChange={handleColorsChange}
              id="colors"
              required="required"
            >
              {petTypeInput === "-1" && (
                <option value="-1" disabled>
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
              placeholder="The age of your pet"
            />

            <label htmlFor="ageUnit"></label>
            <select ref={ageUnitInput} id="ageUnit" required="required">
              <option selected disabled>
                Y/M ?
              </option>
              <option value="year(s)">Year(s)</option>
              <option value="month(s)">Month(s)</option>
            </select>
          </div>

          <div className="formField">
            <label htmlFor="picture">Picture: </label>
            <input type="file" ref={pictureInput} id="picture" />
          </div>

          <div className="formField">
            <label htmlFor="description">Description: </label>
            <textarea
              rows="3"
              cols="25"
              ref={descriptionInput}
              id="description"
              placeholder="Add additional informations you would like to provide"
            ></textarea>
          </div>

          <div className="formField">
            <label htmlFor="reportPlace">Loss Place: </label>
            <SearchPlaceInput
              placeInput={reportPlaceInput} //get the address on the input to store it
              updateCoordinates={updateCoordinates} //get coordonates when the input is changed
            ></SearchPlaceInput>
          </div>

          <div className="formField">
            <button type="submit" className="submitBtn">
              Submit
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

export default LostPetFormPage;

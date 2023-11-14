import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import myApi from "../service/service.js";
import {
  DogFormBreeds,
  DogFormColors,
} from "../components/FormTypes/DogFormType";
import {
  CatFormBreeds,
  CatFormColors,
} from "../components/FormTypes/CatFormType";
import ExoticFormBreeds from "../components/FormTypes/ExoticFormType";

function LostPetFormPage() {
  const islostState = useState("true");
  const petNameInput = useRef();
  const lossDateInput = useRef();
  /* const petTypeInput = useRef(); */
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
  const lossPlaceInput = useRef();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePetTypeChange = (event) => {
    setPetTypeInput(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const petName = petNameInput.current.value;
    const lossDate = lossDateInput.current.value;
    /* const petType = petTypeInput.current.value; */
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
    const lossPlace = lossPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("lossDate", lossDate);
    fd.append("petType", petTypeInput);
    fd.append("petSex", petSex);
    fd.append("sterilized", sterilized);
    fd.append("identification", identification);
    fd.append("breed", breed);
    fd.append("mixed", mixed);
    fd.append("colors", colors);
    fd.append("age", age);
    fd.append("ageUnit", ageUnit);
    fd.append("picture", picture);
    fd.append("description", description);
    fd.append("lossPlace", lossPlace);

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
      <h1>lostPetFormPage</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              placeholder="The name of your pet"
            />
          </div>

          <div>
            <label htmlFor="lossDate">Loss Date: </label>
            <input type="date" ref={lossDateInput} id="lossDate" />
          </div>

          <div>
            <label htmlFor="petType">Type of Pet: </label>
            <select
              value={petTypeInput}
              id="petType"
              required="required"
              onChange={handlePetTypeChange}
            >
              <option value="">Select your response</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Exotic">Exotic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="petSex">Pet Sex: </label>
            <select ref={petSexInput} id="petSex" required="required">
              <option value="">Select your response</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="sterilized">Sterilized: </label>
            <select ref={sterilizedInput} id="sterilized" required="required">
              <option value="">Select your response</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="identification">Identification: </label>
            <input
              type="text"
              ref={identificationInput}
              id="identification"
              placeholder="Tatoo or Chip number"
            />
          </div>

          <div>
            <label htmlFor="breed">Breed: </label>
            <select type="text" ref={breedInput} id="breed">
              {petTypeInput === "" && (
                <option value="">Select the type of pet first</option>
              )}
              {petTypeInput === "Cat" && <CatFormBreeds></CatFormBreeds>}
              {petTypeInput === "Dog" && <DogFormBreeds></DogFormBreeds>}
              {petTypeInput === "Exotic" && (
                <ExoticFormBreeds></ExoticFormBreeds>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="mixed">Mixed Breed: </label>
            <select ref={mixedInput} id="mixed" required="required">
              <option value="">Select your response</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="colors">Colors: </label>
            <select
              type="text"
              ref={colorsInput}
              id="colors"
              required="required"
            >
              {petTypeInput === "" && (
                <option value="">Select the type of pet first</option>
              )}
              {petTypeInput === "Cat" && <CatFormColors></CatFormColors>}
              {petTypeInput === "Dog" && <DogFormColors></DogFormColors>}
              {petTypeInput === "Exotic" && <option value="">None</option>}
            </select>
          </div>

          <div>
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
              <option value="">Y/M ?</option>
              <option value="year(s)">Year(s)</option>
              <option value="month(s)">Month(s)</option>
            </select>
          </div>

          <div>
            <label htmlFor="picture">Picture: </label>
            <input type="file" ref={pictureInput} id="picture" />
          </div>

          <div>
            <label htmlFor="description">Description: </label>
            <textarea
              rows="3"
              cols="25"
              ref={descriptionInput}
              id="description"
              placeholder="Add additional informations you would like to provide"
            ></textarea>
          </div>

          <div>
            <label htmlFor="lossPlace">Loss Place: </label>
            <input type="text" ref={lossPlaceInput} id="lossPlace" />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
          <p className="error">{error}</p>
        </form>

        {/*         {errorMessage && <p className="error-message">{errorMessage}</p>}
         */}
      </div>
    </>
  );
}

export default LostPetFormPage;

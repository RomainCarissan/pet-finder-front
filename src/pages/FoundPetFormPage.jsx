import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import myApi from "../service/service";
import SearchPlaceInput from "../components/SearchPlaceInput/SearchPlaceInput";

function FoundPetFormPage() {
  const islostState = useState("true");
  const petNameInput = useRef();
  const foundDateInput = useRef();
  const petTypeInput = useRef();
  const petSexInput = useRef();
  const identificationInput = useRef();
  const colorsInput = useRef();
  const pictureInput = useRef();
  const descriptionInput = useRef();
  const foundPlaceInput = useRef();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const petName = petNameInput.current.value;
    const foundDate = foundDateInput.current.value;
    const petType = petTypeInput.current.value;
    const petSex = petSexInput.current.value;
    const identification = identificationInput.current.value;
    const colors = colorsInput.current.value;
    const picture = pictureInput.current.files[0];
    const description = descriptionInput.current.value;
    const foundPlace = foundPlaceInput.current.value;

    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("foundDate", foundDate);
    fd.append("petType", petType);
    fd.append("petSex", petSex);
    fd.append("identification", identification);
    fd.append("colors", colors);
    fd.append("picture", picture);
    fd.append("description", description);
    fd.append("foundPlace", foundPlace);

    try {
      const response = await myApi.post("/api/foundpets", fd);
      console.log("found-pet added", response);
      navigate("/found-pet");
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
      <h1>foundPetFormPage</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="petName">Name of the Pet: </label>
            <input
              type="text"
              ref={petNameInput}
              id="petName"
              placeholder="The name of the pet"
            />
          </div>

          <div>
            <label htmlFor="foundDate">Found Date: </label>
            <input type="date" ref={foundDateInput} id="foundDate" />
          </div>

          <div>
            <label htmlFor="petType">Type of Pet: </label>
            <select ref={petTypeInput} id="petType" required="required">
              <option value="" disabled>
                Select your response
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="NAC">NAC</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="petSex">Pet Sex: </label>
            <select ref={petSexInput} id="petSex" required="required">
              <option value="" disabled>
                Select your response
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="I don't know">I don't know</option>
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
            <label htmlFor="colors">Colors: </label>
            <input
              type="text"
              ref={colorsInput}
              id="colors"
              required="required"
            />
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

          {/* <div>
            <label htmlFor="foundPlace">Found Place: </label>
            <input type="text" ref={foundPlaceInput} id="foundPlace" />
          </div> */}
          <div>
            <SearchPlaceInput></SearchPlaceInput>
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

export default FoundPetFormPage;

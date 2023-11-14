import { useState } from "react";
import myApi from "../service/service.jsx";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleAdress = (e) => setAdress(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleDepartment = (e) => setDepartment(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      password,
      email,
      name,
      surname,
      adress,
      phone,
      department,
    };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    myApi
      .post("/auth/signup", requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="off"
          />
        </div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
          autoComplete="off"
        />
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={surname}
            onChange={handleSurname}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={handlePhone}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="adress">Adress</label>
          <input
            type="text"
            name="adress"
            id="adress"
            value={adress}
            onChange={handleAdress}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <input
            type="text"
            list="departments"
            name="department"
            id="department"
            value={department}
            onChange={handleDepartment}
          />
          <datalist id="departments">
            <option value="01 Ain"></option>
            <option value="02 Aisne" />
            <option value="03 Allier" />
            <option value="04 Alpes-de-Haute-Provence" />
            <option
              value="05
            Hautes-Alpes"
            />
            <option value="06 Alpes-Maritimes" />
            <option value="07 Ardèche" />
            <option value="08 Ardennes" />
            <option value="09 Ariège" />
            <option value="10 Aube" />
            <option value="11 Aude" />
            <option value="12 Aveyron" />
            <option
              value="13
            Bouches-du-Rhône"
            />
            <option value="14 Calvados" />
            <option value="15 Cantal" />
            <option value="16 Charente" />
            <option
              value="17
            Charente-Maritime"
            />
            <option value="18 Cher" />
            <option value="19 Corrèze" />
            <option value="2A Corse-du-Sud" />
            <option
              value="2B
            Haute-Corse"
            />
            <option value="21 Côte-d'Or" />
            <option value="22 Côtes-d'Armor" />
            <option value="23 Creuse" />
            <option
              value="24
            Dordogne"
            />
            <option value="25 Doubs" />
            <option value="26 Drôme" />
            <option value="27 Eure" />
            <option value="28 Eure-et-Loir" />
            <option
              value="29
            Finistère"
            />
            <option value="30 Gard" />
            <option value="31 Haute-Garonne" />
            <option value="32 Gers" />
            <option value="33 Gironde" />
            <option value="34 Hérault" />
            <option value="35 Ille-et-Vilaine" />
            <option value="36 Indre" />
            <option value="37 Indre-et-Loire" />
            <option value="38 Isère" />
            <option value="39 Jura" />
            <option value="40 Landes" />
            <option value="41 Loir-et-Cher" />
            <option value="42 Loire" />
            <option value="43 Haute-Loire" />
            <option value="44 Loire-Atlantique" />
            <option value="45 Loiret" />
            <option value="46 Lot" />
            <option
              value="47
            Lot-et-Garonne"
            />
            <option value="48 Lozère" />
            <option value="49 Maine-et-Loire" />
            <option value="50 Manche" />
            <option
              value="51
            Marne"
            />
            <option value="52 Haute-Marne" />
            <option value="53 Mayenne" />
            <option value="54 Meurthe-et-Moselle" />
            <option
              value="55
            Meuse"
            />
            <option value="56 Morbihan" />
            <option value="57 Moselle" />
            <option value="58 Nièvre" />
            <option value="59 Nord" />
            <option
              value="60
            Oise"
            />
            <option value="61 Orne" />
            <option value="62 Pas-de-Calais" />
            <option value="63 Puy-de-Dôme" />
            <option
              value="64
            Pyrénées-Atlantiques"
            />
            <option value="65 Hautes-Pyrénées" />
            <option
              value="66
            Pyrénées-Orientales"
            />
            <option value="67 Bas-Rhin" />
            <option value="68 Haut-Rhin" />
            <option value="69 Rhône" />
            <option
              value="70
            Haute-Saône"
            />
            <option value="71 Saône-et-Loire" />
            <option value="72 Sarthe" />
            <option value="73 Savoie" />
            <option
              value="74
            Haute-Savoie"
            />
            <option value="75 Paris" />
            <option value="76 Seine-Maritime" />
            <option value="77 Seine-et-Marne" />
            <option value="78 Yvelines" />
            <option value="79 Deux-Sèvres" />
            <option value="80 Somme" />
            <option value="81 Tarn" />
            <option
              value="82
            Tarn-et-Garonne"
            />
            <option value="83 Var" />
            <option value="84 Vaucluse" />
            <option value="85 Vendée" />
            <option value="86 Vienne" />
            <option value="87 Haute-Vienne" />
            <option value="88 Vosges" />
            <option value="89 Yonne" />
            <option
              value="90 Territoire de
            Belfort"
            />
            <option value="91 Essonne" />
            <option value="92 Hauts-de-Seine" />
            <option value="93 Seine-Saint-Denis" />
            <option value="94 Val-de-Marne" />
            <option value="95 Val-d'Oise" />
          </datalist>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Already have an account?</p>
      <Link to={"/login"}> Log in</Link>
    </div>
  );
}

/* function SignupPage() {
  const emailInput = useRef();
  const nameInput = useRef();
  const surnameInput = useRef();
  const adressInput = useRef();
  const phoneInput = useRef();
  const departmentInput = useRef();
  const passwordInput = useRef();
  //const pictureInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailInput.current.value;
    const name = nameInput.current.value;
    const surname = surnameInput.current.value;
    const adress = adressInput.current.value;
    const phone = phoneInput.current.value;
    const department = departmentInput.current.value;
    const password = passwordInput.current.value;
    //const picture = pictureInput.current.files[0];

    const fd = new FormData();
    fd.append("email", email);
    fd.append("name", name);
    fd.append("surname", surname);
    fd.append("adress", adress);
    fd.append("phone", phone);
    fd.append("department", department);
    fd.append("password", password);
    //fd.append("picture", picture);

    try {
      const response = await myApi.signup(fd);
      console.log("success", response);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" ref={emailInput} id="email" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" ref={nameInput} id="name" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="surname">Surname: </label>
        <input type="text" ref={surnameInput} id="surname" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="adress">Adress: </label>
        <input type="text" ref={adressInput} id="adress" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="phone">Phone: </label>
        <input type="text" ref={phoneInput} id="phone" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="department">Department: </label>
        <input
          type="text"
          ref={departmentInput}
          id="department"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" ref={passwordInput} id="password" />
      </div>
      <div></div>
      <div>
        <label htmlFor="picture">Picture</label>
        <input ref={pictureInput} type="file" name="" id="picture" />
      </div> 
      <button>Signup</button>
      <p className="error">{error}</p>
    </form>
  );
} */

export default SignupPage;

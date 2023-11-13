import { useRef, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";
function SearchPlaceInput() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  // const handleSelect = async (value) => {
  //   const result = await geocodeByAddress(value);
  //   const ll = await getLatLng(result[0]);
  //   console.log(ll);
  //   setAddress(value);
  //   setCoordinates(ll);
  // };
  const handleChange = (e) => {
    axios
      .get("https://geocode.maps.co/search?q=" + e.target.value)
      .then((res) => {
        console.log(res.data[0]);
        /* const latLong = [res.data[0].lat, res.data[0].lon];
        setAddress(res.data[0].display_name);
        console.log(res.data[0].display_name);
        console.log(latLong); */
      })
      .catch(console.log);
  };
  return (
    <>
      <div>
        <input type="text" value={address} onChange={handleChange} />

        {/* <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div key={suggestions}>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={suggestion}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete> */}
      </div>
    </>
  );
}

export default SearchPlaceInput;

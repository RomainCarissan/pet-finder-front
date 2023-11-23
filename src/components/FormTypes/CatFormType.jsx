function CatFormBreeds() {
  const catBreeds = [
    "Abyssinian",
    "American Bobtail",
    "American Curl",
    "American Shorthair",
    "American Wirehair",
    "Turkish Angora",
    "Balinese",
    "Bengal",
    "Russian Blue",
    "Bombay",
    "British Shorthair",
    "Burmese",
    "Burmilla",
    "Ceylon",
    "Chartreux",
    "Chausie",
    "Cornish Rex",
    "Devon Rex",
    "Donskoy",
    "European Shorthair",
    "Exotic Shorthair",
    "German Rex",
    "Havana Brown",
    "Highland Lynx",
    "Japanese Bobtail",
    "Javanese",
    "Korat",
    "Kurilian Bobtail",
    "LaPerm",
    "Maine Coon",
    "Manx",
    "Egyptian Mau",
    "Munchkin",
    "Norwegian Forest",
    "Ocicat",
    "Oriental Shorthair",
    "Persian",
    "Peterbald",
    "Pixie-Bob",
    "Ragdoll",
    "Birman",
    "Savannah",
    "Scottish Fold",
    "Siamese",
    "Siberian",
    "Singapura",
    "Norwegian Forest Cat",
    "Snowshoe",
    "Somali",
    "Sphynx",
    "Thai",
    "Tiffany",
    "Tonkinese",
    "Toyger",
    "Turkish Van",
  ];

  return (
    <>
      <option value="-1" disabled>
        Select the cat breed
      </option>
      {catBreeds.map((breed) => {
        return (
          <option key={breed} value={breed}>
            {breed}
          </option>
        );
      })}
    </>
  );
}

function CatFormColors() {
  const catColors = [
    "Black",
    "Blue",
    "Blue Point",
    "Brown",
    "Chinchilla",
    "Chocolate",
    "Color Point",
    "Cream",
    "Diluted",
    "Gray",
    "Hare",
    "Marbled",
    "Red",
    "Red Point",
    "Red Tabby",
    "Seal Point",
    "Silver",
    "Smoke",
    "Tabby",
    "Tiger",
    "Tortie Tabby",
    "Tortoiseshell",
    "Tricolor",
    "White",
  ];

  return (
    <>
      <option value="-1" disabled>
        Select the cat color
      </option>
      {catColors.map((color) => {
        return (
          <option key={color} value={color}>
            {color}
          </option>
        );
      })}
    </>
  );
}

export { CatFormBreeds, CatFormColors };

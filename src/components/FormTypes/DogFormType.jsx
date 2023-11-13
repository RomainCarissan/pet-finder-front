function DogFormBreeds() {
  const dogBreeds = [
    "Afghan Hound",
    "Airedale Terrier",
    "Akita Inu",
    "Alaskan Malamute",
    "American Akita",
    "American Bulldog",
    "American Cocker Spaniel",
    "American Staffordshire Terrier",
    "Anatolian Shepherd",
    "Anglo-French Hound",
    "Ariegeois",
    "Australian Bouvier",
    "Australian Shepherd",
    "Australian Water Spaniel",
    "Austrian Black and Tan Hound",
    "Austrian Shorthaired Pinscher",
    "Bernese Mountain Dog",
    "Bichon Bolognese",
    "Bichon Frise",
    "Biewer Yorkshire",
    "Black and Tan Austrian Brachet",
    "Bloodhound",
    "Bobtail",
    "Bolognese Bichon",
    "Bordeaux Mastiff",
    "Borzoi",
    "Boston Terrier",
    "Bouledogue Français",
    "Boxer",
    "Brabant Griffon",
    "Brussels Griffon",
    "Bull Terrier",
    "Bullmastiff",
    "Cairn Terrier",
    "Cana de Castro Laboreiro",
    "Canaan Dog",
    "Cane Corso",
    "Cardigan Welsh Corgi",
    "Catalan Sheepdog",
    "Cavalier King Charles Spaniel",
    "Central Asian Shepherd",
    "Chesapeake Bay Retriever",
    "Chihuahua",
    "Chinese Crested",
    "Chinook",
    "Chow Chow",
    "Clumber Spaniel",
    "Curly Coated Retriever",
    "Czech Terrier",
    "Czechoslovakian Wolfdog",
    "Dachshund",
    "Dalmatian",
    "Dandie Dinmont Terrier",
    "Danish Pointer",
    "Doberman",
    "Dogue Argentin",
    "Dutch Smous",
    "Dutch Shepherd",
    "English Bulldog",
    "English Cocker Spaniel",
    "English Foxhound",
    "English Mastiff",
    "English Setter",
    "English Springer Spaniel",
    "English Toy Terrier",
    "Eurasier",
    "Faroese Sheepdog",
    "Finnish Courser",
    "Finnish Lapphund",
    "Flat Coated Retriever",
    "Flanders Bouvier",
    "French Bouledogue",
    "French Bulldog",
    "French Greyhound",
    "French Mastiff",
    "French Pointer",
    "French Spaniel",
    "German Brachet",
    "German Mastiff",
    "German Shepherd",
    "German Shorthaired Pointer",
    "German Spitz",
    "German Wirehaired Pointer",
    "Giant Schnauzer",
    "Golden Retriever",
    "Gordon Setter",
    "Grand Basset Griffon Vendeen",
    "Great Swiss Mountain Dog",
    "Greenland Dog",
    "Greyhound",
    "Hare",
    "Havanese",
    "Hovawart",
    "Hungarian Greyhound",
    "Hungarian Pointer",
    "Icelandic Sheepdog",
    "Irish Greyhound",
    "Irish Red Setter",
    "Irish Setter",
    "Irish Terrier",
    "Italian Pointer",
    "Jack Russell Terrier",
    "Japanese Akita",
    "Japanese Chin",
    "Japanese Spitz",
    "Japanese Terrier",
    "Karst Shepherd",
    "King Charles Spaniel",
    "Kishu",
    "Komondor",
    "Kooikerhondje",
    "Labrador Retriever",
    "Lakeland Terrier",
    "Landseer",
    "Leonberger",
    "Lhasa Apso",
    "Majorca Mastiff",
    "Maltese Bichon",
    "Maremma and Abruzzes Shepherd",
    "Marled",
    "Mastiff",
    "Merle",
    "Miniature Pinscher",
    "Miniature Schnauzer",
    "Neapolitan Mastiff",
    "Newfoundland",
    "Nivernais Griffon",
    "Norfolk Terrier",
    "Norwegian Elkhound",
    "Norwich Terrier",
    "Old Danish Pointer",
    "Old German Shepherd Dog",
    "Old Welsh Sheepdog",
    "Otterhound",
    "Papillon",
    "Parson Russell Terrier",
    "Pekingese",
    "Pharaoh Hound",
    "Picard Spaniel",
    "Picardy Shepherd",
    "Pointer",
    "Polish Brachet",
    "Polish Greyhound",
    "Polish Lowland Sheepdog",
    "Polish Tatra Shepherd",
    "Poodle",
    "Portuguese Sheepdog",
    "Portuguese Water Dog",
    "Pyrenean Mastiff",
    "Pyrenean Mountain Dog",
    "Pyrenean Spaniel",
    "Quail",
    "Ratonero Bodeguero Andaluz",
    "Red and White Setter",
    "Red Setter",
    "Red Tabby",
    "Redbone Coonhound",
    "Rhodesian Ridgeback",
    "Russian Black Terrier",
    "Saint Bernard",
    "Saint Germain Pointer",
    "Saint Hubert Dog",
    "Samoyed",
    "Saarloos Wolfhound",
    "Sable",
    "Schnauzer",
    "Scottish Deerhound",
    "Scottish Terrier",
    "Seal",
    "Setter",
    "Shetland Sheepdog",
    "Shiba Inu",
    "Shih Tzu",
    "Siberian Husky",
    "Silver",
    "Skye Terrier",
    "Small Brabant Griffon",
    "Smooth Collie",
    "Soft Coated Wheaten Terrier",
    "Spanish Mastiff",
    "Spanish Water Dog",
    "Speckled",
    "Spinone Italiano",
    "Sporting Lucas Terrier",
    "Staffordshire Bull Terrier",
    "Sussex Spaniel",
    "Swedish Lapphund",
    "Swedish Vallhund",
    "Tibetan Terrier",
    "Tyrolean Brachet",
    "Weimaraner Pointer",
    "Welsh Corgi Cardigan",
    "Welsh Corgi Pembroke",
    "West Highland White Terrier",
    "White Swiss Shepherd",
    "Yorkshire Terrier",
    "Yugoslav Shepherd",
  ];

  return (
    <>
      <option value="" disabled>
        Select the dog breed
      </option>
      {dogBreeds.map((breed) => {
        return (
          <option key={breed} value={breed}>
            {breed}
          </option>
        );
      })}
    </>
  );
}

function DogFormColors() {
  const dogColors = [
    "Apricot",
    "Beige",
    "Black",
    "Black Brindle",
    "Blue",
    "Blue Fawn",
    "Brindle Blue",
    "Brown",
    "Champagne",
    "Charred",
    "Chocolate",
    "Cream",
    "Dark Brindle",
    "Fawn",
    "Fire",
    "Golden",
    "Gray",
    "Harlequin",
    "Light Brindle",
    "Liver",
    "Marbled",
    "Merle",
    "Orange",
    "Quail",
    "Red",
    "Sand",
    "Silver",
    "Sable",
    "Speckled",
    "Tricolor",
    "Trout",
    "White",
  ];

  return (
    <>
      <option value="" disabled>
        Select the dog color
      </option>
      {dogColors.map((color) => {
        return (
          <option key={color} value={color}>
            {color}
          </option>
        );
      })}
    </>
  );
}

export { DogFormBreeds, DogFormColors };

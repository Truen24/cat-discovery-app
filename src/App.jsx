import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

function App() {
  const [animal, setAnimal] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchCat = async () => {
    console.log("Fetching cat...");
    let data;

    do {
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?has_breeds=1",
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
      const result = await res.json();
      data = result[0];
    } while (
      !data.breeds[0] ||
      banList.includes(data.breeds[0].name) ||
      banList.includes(data.breeds[0].origin)
    );

    setAnimal(data);
  };

  const toggleBan = (value) => {
    setBanList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="App">
      <h1> Discover Random Cats</h1>
      <button onClick={fetchCat}>Discover New Cat</button>

      {animal && animal.breeds.length > 0 && (
        <div className="card">
          <img src={animal.url} alt={animal.breeds[0].name} width="300" />
          <h2>{animal.breeds[0].name}</h2>

          <p>
            <strong>Origin:</strong> {animal.breeds[0].origin}{" "}
            <button onClick={() => toggleBan(animal.breeds[0].origin)}> Ban</button>
          </p>

          <p>
            <strong>Breed:</strong> {animal.breeds[0].name}{" "}
            <button onClick={() => toggleBan(animal.breeds[0].name)}> Ban</button>
          </p>

          <p>
            <strong>Temperament:</strong> {animal.breeds[0].temperament}
          </p>
          <p>
            <strong>Description:</strong> {animal.breeds[0].description}
          </p>
        </div>
      )}

      <div className="ban-list">
        <h3> Ban List:</h3>
        {banList.map((item, idx) => (
          <span
            key={idx}
            onClick={() => toggleBan(item)}
            className="ban-item"
          >
            {item} ||| 
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;

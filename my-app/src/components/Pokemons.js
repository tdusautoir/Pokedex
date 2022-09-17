import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Pokemons = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [rangeValue, setRangeValue] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // IDLE rien de chargé, donc en chargment
    // Loading à true
    axios
      .post("http://localhost:8080/api/login", {
        username: "pikachu",
        password: "pikachu",
      })
      .then((res) => {
        getAllPokemon(res.data.token);
        sessionStorage["token"] = res.data.token;
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        // Loading à false
      });
  }, []);

  const getAllPokemon = (token) => {
    axios
      .get("http://localhost:8080/api/pokemons", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((pokemons) => {
        setData(pokemons.data.data);
      });
  };

  const specialFilters = Array.from(
    new Set(data.map((pokemons) => [...pokemons.types]).flat())
  );

  //if there isn't error display the pokedex
  return !error ? (
    <div className="pokedex-container">
      <div className="pokemons-filter">
        <input
          type="search"
          name="search"
          value={searchTerm}
          placeholder="Rechercher..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <input
          type="range"
          name="range"
          min={0}
          max={30}
          value={rangeValue}
          onChange={(e) => {
            setRangeValue(e.target.value);
          }}
        />
        <ul className="radio-container">
          {specialFilters.map((type) => (
            <li key={type}>
              <input
                type="radio"
                id={type}
                name="typeRadio"
                //if the type is equal to the value of selectedRadio --> true
                checked={type === selectedRadio}
                onChange={(e) => {
                  setSelectedRadio(e.target.id);
                  //id of the radio, for example : "feu"
                }}
              />
              <label htmlFor={type}>{type}</label>
            </li>
          ))}
        </ul>
        {(selectedRadio || searchTerm) && (
          <button
            onClick={() => {
              setSelectedRadio("");
              setSearchTerm("");
            }}
          >
            <i className="fa fa-mark"></i>
          </button>
        )}
      </div>
      <div className="pokemons-container">
        {selectedRadio
          ? data
              .filter((pokemons) => pokemons.name.includes(searchTerm))
              .filter((pokemons) => pokemons.types.includes(selectedRadio))
              .slice(0, rangeValue)
              .map((pokemons) => (
                <Card
                  key={pokemons.id}
                  pokemons={pokemons}
                  types={specialFilters}
                />
              ))
          : data
              .filter((pokemons) => pokemons.name.includes(searchTerm))
              .slice(0, rangeValue)
              .map((pokemons) => (
                <Card
                  key={pokemons.id}
                  pokemons={pokemons}
                  types={specialFilters}
                />
              ))}
      </div>
    </div>
  ) : (
    <h3 className="error">
      Une erreur est survenue dans la connexion avec l'api.
    </h3>
  );
};

export default Pokemons;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Pokemons = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filter = [];

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/login", {
        username: "pikachu",
        password: "pikachu",
      })
      .then((res) => {
        getAllPokemon(res.data.token);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
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

  //if there isn't error display the pokedex
  return !error ? (
    <div className="pokedex-container">
      <ul className="pokemons-filter">
        {data.map((pokemons) => {
          filter.push(...pokemons.types);
          return "";
        })}
        {filter
          .filter((val, ind, arr) => arr.indexOf(val) === ind)
          .map((type, index) => (
            <li key={index}>
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
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <input
        type="search"
        name="search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="pokemons-container">
        {selectedRadio
          ? data
              .filter((pokemons) => pokemons.name.includes(searchTerm))
              .filter((pokemons) => pokemons.types.includes(selectedRadio))
              .map((pokemons) => <Card key={pokemons.id} pokemons={pokemons} />)
          : data
              .filter((pokemons) => pokemons.name.includes(searchTerm))
              .map((pokemons) => (
                <Card key={pokemons.id} pokemons={pokemons} />
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

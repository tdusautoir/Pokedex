import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Pokemons = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8080/api/login", {
        username: "pikachu",
        password: "pikachu",
      })
      .then((res) => {
        getAllPokemon(res.data.token);
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

  return (
    <div className="pokemons-container">
      {data.map((pokemons) => (
        <Card key={pokemons.id} pokemons={pokemons} />
      ))}
    </div>
  );
};

export default Pokemons;

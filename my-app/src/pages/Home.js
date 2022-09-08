import React from "react";
import Navigation from "../components/Navigation";
import Pokemons from "../components/Pokemons";

const Home = () => {
  return (
    <div className="container">
      <h1>Pokedex</h1>
      <Navigation />
      <Pokemons />
    </div>
  );
};

export default Home;

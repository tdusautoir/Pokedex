import React from "react";
import Navigation from "../components/Navigation";
import Pokemons from "../components/Pokemons";

const Home = () => {
  return (
    <div className="container">
      <h1>Pokedex</h1>
      <Navigation />
      <Pokemons />
      {/* 
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.test.value);
        }}
      >
        <input name="test" type="text" />
        <button type="submit">Envoyer </button>
      </form> */}
    </div>
  );
};

export default Home;

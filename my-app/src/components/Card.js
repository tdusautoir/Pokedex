import React from "react";

const Card = ({ pokemons }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemons.picture} alt={"photo de " + pokemons.name} />
      <p className="name">{pokemons.name}</p>
      <div className="spec">
        <div className="hp">
          <p>pv</p>
          {pokemons.hp}
        </div>
        <div className="separator"></div>
        <div className="cp">
          <p>cp</p>
          {pokemons.cp}
        </div>
      </div>
      <div className="type">
        <ul>
          {pokemons.types.map((type, index) => (
            <li className={"color-" + type.toLowerCase()} key={index}>
              {type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;

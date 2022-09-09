import React from "react";
import { useState } from "react";

const Card = ({ pokemons }) => {
  const [disabled, setDisabled] = useState(true);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(pokemons.name);

  const SendChange = () => {
    setEditable(false);
    setDisabled(true);
    console.log("modif : " + name);
  };

  return (
    <div className="pokemon-card">
      {editable ? (
        <button
          onClick={() => {
            SendChange();
          }}
        >
          Envoyer
        </button>
      ) : (
        <button
          onClick={() => {
            setEditable(true);
            setDisabled(false);
          }}
        >
          Modifier
        </button>
      )}
      <img src={pokemons.picture} alt={"photo de " + pokemons.name} />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        className="name"
        value={name}
        disabled={disabled}
      />
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

import React, { useEffect } from "react";
import { useState } from "react";

const Card = ({ pokemons }, types) => {
  const [disabled, setDisabled] = useState(true);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(pokemons.name);
  const [hp, setHp] = useState(pokemons.hp);
  const [cp, setCp] = useState(pokemons.cp);

  const SendChange = () => {
    setEditable(false);
    setDisabled(true);
    console.log("modif : " + name);
    console.log("hp : " + hp);
    //need to check error
    if (cp > 30) {
      console.error("cp must be under 30.");
    } else {
      console.log("cp : " + cp);
    }
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
        maxLength={20}
        value={name}
        disabled={disabled}
      />
      <div className="spec">
        <div className="hp">
          <p>hp</p>
          <input
            onChange={(e) => {
              setHp(e.target.value);
            }}
            max={30}
            type="number"
            value={hp}
            disabled={disabled}
          />
        </div>
        <div className="separator"></div>
        <div className="cp">
          <p>cp</p>
          <input
            onChange={(e) => {
              setCp(e.target.value);
            }}
            type="number"
            max={30}
            value={cp}
            disabled={disabled}
          />
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

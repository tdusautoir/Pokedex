import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Card = ({ pokemons, types }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(pokemons.name);
  const [hp, setHp] = useState(pokemons.hp);
  const [cp, setCp] = useState(pokemons.cp);
  const [select, setSelect] = useState(true);
  const [type, setType] = useState(pokemons.types);

  const toDelete = type.map((name) => name);

  useEffect(() => {});

  const SendChange = () => {
    console.log(sessionStorage);
    setSelect(true);
    setEditable(false);

    let url = "http://localhost:8080/api/pokemons/" + pokemons.id;
    let token = sessionStorage.token;
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(
        url,
        {
          name: name,
          hp: hp,
          cp: cp,
          picture: pokemons.picture,
          types: type,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        //need to display error
        console.error(err.response.data.message);
        sessionStorage.error = err.response.data.message;
      });
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
        disabled={!editable}
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
            disabled={!editable}
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
            disabled={!editable}
          />
        </div>
      </div>
      <div className="type">
        <ul>
          {type.map((type) => (
            <li className={"color-" + type.toLowerCase()} key={type}>
              {type}
            </li>
          ))}
          {editable && select && (
            <select
              onChange={(e) => {
                setSelect(false);
                setType([...type, e.target.value]);
              }}
              name="type"
              defaultValue={"type"}
            >
              <option value={"type"} disabled>
                type
              </option>
              {types
                .filter((item) => !toDelete.includes(item))
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Card;

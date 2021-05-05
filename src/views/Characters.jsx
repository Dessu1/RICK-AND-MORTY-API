import React, { useState, useEffect } from "react";
import axios from "axios";

const Characters = () => {
  const [next, setNext] = useState("");
  const [characters, setCharacters] = useState([]);
  const [prev, setPrev] = useState("");

  const getCharacters = async () => {
    if (localStorage.getItem("characters0")) {
      const data = JSON.parse(localStorage.getItem("characters0"));
      setNext(data.info.next);
      setCharacters(data.results);
      setPrev(data.info.prev);

      return;
    }

    const res = await axios.get("https://rickandmortyapi.com/api/character");
    const nextPage = await res.data.info.next;
    const charactersCurrent = await res.data.results;
    const prevCurrent = await res.data.info.prev;

    localStorage.setItem("characters0", JSON.stringify(res.data));

    setNext(await nextPage);
    setCharacters(await charactersCurrent);
    setPrev(await prevCurrent);
  };

  const nextCharacters = async () => {
    if (localStorage.getItem(next)) {
      const data = JSON.parse(localStorage.getItem(next));

      setNext(data.info.next);
      setCharacters(data.results);
      setPrev(data.info.prev);

      return;
    }

    const res = await axios.get(next);
    const nextPage = await res.data.info.next;
    const charactersCurrent = await res.data.results;
    const prevCurrent = await res.data.info.prev;

    localStorage.setItem(next, JSON.stringify(res.data));

    setNext(await nextPage);
    setCharacters(await charactersCurrent);
    setPrev(await prevCurrent);
  };

  const prevCharacters = async () => {
    if (localStorage.getItem(prev)) {
      const data = JSON.parse(localStorage.getItem(prev));

      setNext(data.info.next);
      setCharacters(data.results);
      setPrev(data.info.prev);

      return;
    }

    const res = await axios.get(prev);
    const nextPage = await res.data.info.next;
    const charactersCurrent = await res.data.results;
    const prevCurrent = await res.data.info.prev;

    localStorage.setItem(prev, JSON.stringify(res.data));

    setNext(await nextPage);
    setCharacters(await charactersCurrent);
    setPrev(await prevCurrent);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div id='characters'>
      <div className='container-content'>
        <div className='container-buttons'>
          {prev && <button onClick={() => prevCharacters()}>Previous</button>}
          <button onClick={() => nextCharacters()}>Next</button>
        </div>

        <div className='container-characters'>
          {characters.map((item) => {
            return (
              <div className='card' key={item.id}>
                <div className='title-name'>
                  <p>{item.name}</p>
                </div>
                <div className='image-character'>
                  <img src={item.image} alt='character' />
                </div>
                <div className='status'>
                  <p>
                    Status:{" "}
                    <span
                      className={(item.status = "alive" ? "alive" : "dead")}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>
                <div className='specie'>
                  <p>
                    Especie: <span>{item.species}</span>
                  </p>
                  <p>
                    Genero: <span>{item.gender}</span>
                  </p>
                </div>

                <div className='descripcion'>
                  <div className='origin'>
                    <p>
                      Origen: <span>{item.origin.name}</span>
                    </p>
                  </div>
                  <div className='location'>
                    <p>
                      Ubicaion: <span>{item.location.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;

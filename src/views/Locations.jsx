import axios from "axios";
import React, { useEffect, useState } from "react";

const Locations = () => {
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [results, setResults] = useState([]);

  const getData = async () => {
    if (localStorage.getItem("locations0")) {
      const data = JSON.parse(localStorage.getItem("locations0"));
      setNext(data.info.next);
      setResults(data.results);
      setPrev(data.info.prev);

      return;
    }

    const res = await axios.get("https://rickandmortyapi.com/api/location");

    const nextPage = await res.data.info.next;
    const prevPage = await res.data.info.prev;
    const results = await res.data.results;

    localStorage.setItem("locations0", JSON.stringify(res.data));

    setNext(nextPage);
    setPrev(prevPage);
    setResults(results);
  };

  const getNext = async () => {
    if (localStorage.getItem(next)) {
      const data = JSON.parse(localStorage.getItem(next));

      setNext(data.info.next);
      setResults(data.results);
      setPrev(data.info.prev);

      return;
    }

    const res = await axios.get(next);
    const nextPage = await res.data.info.next;
    const locationsCurrent = await res.data.results;
    const prevCurrent = await res.data.info.prev;

    localStorage.setItem(next, JSON.stringify(res.data));

    setNext(await nextPage);
    setResults(await locationsCurrent);
    setPrev(await prevCurrent);
  };

  const getPrevious = async () => {
    if (localStorage.getItem(prev)) {
      const data = JSON.parse(localStorage.getItem(prev));

      setNext(data.info.next);
      setResults(data.results);
      setPrev(data.info.prev);

      return;
    }

    const res = await axios.get(prev);
    const nextPage = await res.data.info.next;
    const locationsCurrent = await res.data.results;
    const prevCurrent = await res.data.info.prev;

    localStorage.setItem(prev, JSON.stringify(res.data));

    setNext(await nextPage);
    setResults(await locationsCurrent);
    setPrev(await prevCurrent);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id='locations'>
      <div className='container-buttons'>
        {prev && <button onClick={() => getPrevious()}>Previous</button>}
        <button onClick={() => getNext()}>Next</button>
      </div>
      <div className='container-locations'>
        {results.map((item) => {
          return (
            <div className='card' key={item.id}>
              <div className='title-name'>{item.name}</div>
              <div className='type-location'>Tipo: {item.type}</div>
              <div className='dimension'>Dimension: {item.dimension}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Locations;

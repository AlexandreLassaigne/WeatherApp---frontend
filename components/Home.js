import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Card from "./Card";

function Home() {
  const [name, setName] = useState("");
  const [card, setCard] = useState([]);

/*   const handleSearch = () => {
    fetch(`http://localhost:3000/cities/new`)
      .then((response) => response.json())
      .then((data) => {
        setCard(data.citie);
      });
  }; */

  useEffect(() => {
    fetch(`http://localhost:3000/cities/all`)
    .then(response => response.json())
    .then(data => {   
      setCard(data.weather)
    })

  }, [])
  const city = card.map((data, i) => {
    return (
      <Card
        key={i}
        name={data.name}
        main={data.main}
        description={data.description}
        tempMin={data.tempMin}
        tempMax={data.tempMax}
      />
    );
  });

  return (
    <div>
      <div className={styles.header}>
        <img src="/logo.svg" className={styles.logo} />
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={styles.input}
          />
          <button className={styles.search}/*  onClick={handleSearch} */>
            <img src="/glass.png" />
          </button>
        </div>
      </div>
      <div className={styles.cityContainer}>{city}</div>
    </div>
  );
}

export default Home;

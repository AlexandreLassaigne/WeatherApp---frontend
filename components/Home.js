import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Card from "./Card";

function Home() {
  const [name, setName] = useState("");
  const [card, setCard] = useState([]);
  const [likedCity, setLikedCity] = useState([]);
  const [newCard, setNewCard] = useState([]);

  const handleSearch = () => {
    fetch(`http://localhost:3000/cities/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewCard([data.city])
        setName("");
      });
  };



  // Liked city (inverse data flow)
  const updateLikedCity = (cityName) => {
    if (likedCity.find((city) => city === cityName)) {
      setLikedCity(likedCity.filter((city) => city !== cityName));
    } else {
      setLikedCity([...likedCity, cityName]);
    }
  };

/*   useEffect(() => {
    fetch(`http://localhost:3000/cities/all`)
      .then((response) => response.json())
      .then((data) => {
        setCard(data.weather);
      });
  }, []); */

/*   const city = card.map((data, i) => {
    const isLiked = likedCity.some((city) => city === data.name);
    return (
      <Card
        key={i}
        name={data.name}
        main={data.main}
        description={data.description}
        tempMin={data.tempMin}
        tempMax={data.tempMax}
        updateLikedCity={updateLikedCity}
        isLiked={isLiked}
      />
    );
  }); */

  const New = newCard.map((data, i) => {
    const isLiked = likedCity.some((city) => city === data.name);
    return (
      <Card
        key={i}
        name={data.name}
        main={data.main}
        description={data.description}
        tempMin={data.tempMin}
        tempMax={data.tempMax}
        updateLikedCity={updateLikedCity}
        isLiked={isLiked}
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
            placeholder="City"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={styles.input}
          />
          <img
            className={styles.search}
            src="/glass.png"
            onClick={handleSearch}
          />
        </div>
        <img className={styles.search} src="/user.png" />
      </div>
      {/* <div className={styles.cityContainer}>{city}</div> */}
      <div className={styles.cityContainer}>{New}</div>
    </div>
  );
}

export default Home;

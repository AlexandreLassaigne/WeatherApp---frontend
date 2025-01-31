import styles from "../styles/Home.module.css";
import { useState } from "react";
import Card from "./Card";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSelector, useDispatch } from "react-redux";
import { logout} from '../reducers/user';
import { addHistory, removeAllHistory } from "../reducers/history";

function Home() {

  const [name, setName] = useState("");
  const [likedCity, setLikedCity] = useState([]);
  const [newCard, setNewCard] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)

  const handleSearch = () => {
    if(!user || !user.token) {
      return
    }
      fetch(`http://localhost:3000/cities/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, userToken : user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.city)
        setNewCard([data.city]);
        setName("");
        dispatch(addHistory(data.city))
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

  const [open, setOpen] = useState(false);

  const handleOpen = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(logout())
    dispatch(removeAllHistory())
    router.push('/')
  }

  const drawerList = (
    <Box
      sx={{ width: 250, height: "100vh", fontSize: 34, background: "#225A86" }}
      role="presentation"
      onClick={() => handleOpen(false)}
    >
      <List>
        <ListItem className={styles.list} disablePadding>
          <span
            className={styles.lien}
            onClick={() => router.push("/bookmarks")}
          >
            Bookmarks
          </span>
          <span className={styles.lien} onClick={() => router.push("/history")}>
            History
          </span>
          <span
            className={styles.lien}
            onClick={() => router.push("/settings")}
          >
            Settings
          </span>
          <span
            className={styles.lien}
            onClick={handleLogout}
          >
            Logout
          </span>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div className={styles.header}>
        <img src="/logo.svg" className={styles.logo} />
        <p>Hello {user.firstName}</p>
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
        <img
          className={styles.search}
          src="/user.png"
          onClick={() => handleOpen(true)}
        />
        <Drawer
          open={open}
          onClose={() => handleOpen(false)}
          sx={{ backgroundColor: "transparent" }}
        >
          {drawerList}
        </Drawer>
      </div>
      <div className={styles.cityContainer}>{New}</div>
    </div>
  );
}

export default Home;

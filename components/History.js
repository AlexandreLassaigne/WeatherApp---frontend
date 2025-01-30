import styles from "../styles/History.module.css";
import Card from "./Card";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { removeAllHistory } from "../reducers/history";

export default function History() {

  const [likedCity, setLikedCity] = useState([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const history = useSelector((state) => state.history.value);
  const dispatch = useDispatch();

  const handleOpen = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllHistory())
    router.push("/");
  };

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
          <span className={styles.lien} onClick={handleLogout}>
            Logout
          </span>
        </ListItem>
      </List>
    </Box>
  );

  // Liked city (inverse data flow)
  const updateLikedCity = (cityName) => {
    if (likedCity.find((city) => city === cityName)) {
      setLikedCity(likedCity.filter((city) => city !== cityName));
    } else {
      setLikedCity([...likedCity, cityName]);
    }
  };

  const city = history.map((data, i) => {
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
        <img
          src="/logo.svg"
          className={styles.logo}
          onClick={() => router.push("/home")}
        />
        <h1>History</h1>
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
      <div className={styles.cityContainer}>{city}</div>
    </div>
  );
}

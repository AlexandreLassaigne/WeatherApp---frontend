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
  const [newCard, setNewCard] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const bookmark = useSelector(state => state.bookmarks.value)

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


  const New = newCard.map((data, i) => {
    const isLiked = bookmark.some((city) => city.name === data.name);
    return (
      <Card
        key={i}
        {...data}
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
        <img src="/logo.svg" className={styles.logo} alt="logo"/>
        <p>Hello {user.firstName}</p>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <img
            className={styles.search}
            src="/glass.png"
            alt="search logo"
            onClick={handleSearch}
          />
        </div>
        <img
          className={styles.search}
          src="/user.png"
          alt="logo user"
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

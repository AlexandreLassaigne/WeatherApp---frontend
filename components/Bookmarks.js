import styles from "../styles/Bookmarks.module.css";
import Card from "./Card";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { removeAllHistory } from "../reducers/history";


export default function Bookmarks() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const bookmark = useSelector((state) => state.bookmarks.value);

  let card = <p>No card</p>;
  if (bookmark.length > 0) {
    card = bookmark.map((data, i) => {
      return <Card key={i} {...data} isLiked />;
    });
  }

  const handleOpen = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllHistory());
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

  return (
    <div>
      <div className={styles.header}>
        <img
          src="/logo.svg"
          alt='logo'
          className={styles.logo}
          onClick={() => router.push("/home")}
        />
        <h1>Bookmarks</h1>
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
      <div className={styles.cityContainer}>{card}</div>
    </div>
  );
}

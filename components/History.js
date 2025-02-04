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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { removeHistory } from "../reducers/history";

export default function History() {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const history = useSelector((state) => state.history.value);
  const histories = history.flat();
  const dispatch = useDispatch();
  const bookmark = useSelector((state) => state.bookmarks.value);
  const historyPage = router.pathname === "/history";

  console.log(histories)

    const removeHistory = () => {
      fetch(`http://localhost:3000/cities/deleteCity/${histories.name}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.deleted > 0) {
            dispatch(removeHistory(histories));
          }
        });
    };

  const cities = histories
    .filter(
      (data, i, self) =>
        //verifie si l'index de la premiere occurence de cette ville est le même que l'index actuel du tableau.
        //Si c'est le cas, c'est la première fois qu'on rencontre cette ville et on la garde, sinon on la supprime
        self.findIndex((city) => city.name === data.name) === i
    )
    .map((data, e) => {
      const isLiked = bookmark.some((city) => city.name === data.name);
      return (
        <div className={styles.card}>
          <Card key={e} {...data} isLiked={isLiked} />{" "}
            {historyPage && (
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={styles.xmark}
                 onClick={removeHistory}
              />
            )}
        </div>
      );
    });

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
      <div className={styles.cityContainer}>{cities}</div>
    </div>
  );
}

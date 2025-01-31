import styles from "../styles/Settings.module.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useRouter } from "next/router";
import { useState } from "react";
import { logout } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { updateFirstName, updateLastName } from "../reducers/user";
import { createPortal } from "react-dom";
import { removeAllHistory } from "../reducers/history";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalFirstNameIsVisible, setModalFirstNameIsVisible] = useState(false);
  const [modalLastNameIsVisible, setModalLastNameIsVisible] = useState(false);
  const [modalPasswordIsVisible, setModalPasswordIsVisible] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);

  const closeModal = (modal) => {
    if (modal === "password") {
      setModalPasswordIsVisible(false);
    } else if (modal === "firstName") {
      setModalFirstNameIsVisible(false);
    } else if (modal === "lastName") {
      setModalLastNameIsVisible(false);
    }
  };

  const changePassword = () => {
    if (!firstName || !lastName || !password || !newPassword) {
      setMessageError("Please complete all fields");
      setError(true);
      return;
    }
    fetch("http://localhost:3000/users/changePassword", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        newPassword,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setMessageError(data.error);
          setError(true);
        } else {
          closeModal("password");
          setFirstName("");
          setLastName("");
          setPassword("");
          setError(false);
        }
      });
  };

  const changeFirstName = () => {
    if (!firstName || !lastName || !password) {
      setMessageError("Please complete all fields");
      setError(true);
      return;
    }
    fetch("http://localhost:3000/users/changeFirstName", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setMessageError(data.error);
          setError(true);
        } else {
          dispatch(updateFirstName(data.newFirstName));
          setError(false);
          closeModal("firstName");
          setFirstName("");
          setLastName("");
          setPassword("");
        }
      });
  };

  const changeLastName = () => {
    if (!firstName || !lastName || !password) {
      setMessageError("Please complete all fields");
      setError(true);
      return;
    }
    fetch("http://localhost:3000/users/changeLastName", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setMessageError(data.error);
          setError(true);
        } else {
          dispatch(updateLastName(data.newLastName));
          setError(false);
          closeModal("lastName");
          setFirstName("");
          setLastName("");
          setPassword("");
        }
      });
  };

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
        <h1>Settings</h1>
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
      <div className={styles.settings}>
        <h2>My profile</h2>
        <div className={styles.profile}>
          <h3 className={styles.title}>FirstName</h3>
          <p>{user.firstName}</p>
          <button
            className={styles.change}
            onClick={() => setModalFirstNameIsVisible(true)}
          >
            Change my FirstName
          </button>
          {modalFirstNameIsVisible &&
            createPortal(
              <div className={styles.containerForm}>
                <div className={styles.changeContainer}>
                  <div className={styles.close}>
                    <span
                      onClick={() => closeModal("firstName")}
                      className={styles.closeButton}
                    >
                      X
                    </span>
                  </div>
                  <p className={styles.textInfo}>
                    You're about to change your FirstName. Make sure it's right
                    for you!
                  </p>
                  <input
                    type="text"
                    placeholder="New FirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="LastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={styles.input}
                  />
                  {error && <p className={styles.error}>{messageError}</p>}
                  <button
                    type="submit"
                    onClick={changeFirstName}
                    className={styles.button}
                  >
                    Confirm
                  </button>
                </div>
              </div>,
              document.body
            )}
          <h3 className={styles.title}>LastName</h3>
          <p>{user.lastName}</p>
          <button
            onClick={() => setModalLastNameIsVisible(true)}
            className={styles.change}
          >
            Change my LastName
          </button>
          {modalLastNameIsVisible &&
            createPortal(
              <div className={styles.containerForm}>
                <div className={styles.changeContainer}>
                  <div className={styles.close}>
                    <span
                      onClick={() => closeModal("lastName")}
                      className={styles.closeButton}
                    >
                      X
                    </span>
                  </div>
                  <p className={styles.textInfo}>
                    You're about to change your LastName. Make sure it's right
                    for you!
                  </p>
                  <input
                    type="text"
                    placeholder="FirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="New LastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={styles.input}
                  />
                  {error && <p className={styles.error}>{messageError}</p>}
                  <button
                    type="submit"
                    onClick={changeLastName}
                    className={styles.button}
                  >
                    Confirm
                  </button>
                </div>
              </div>,
              document.body
            )}
          <button
            onClick={() => setModalPasswordIsVisible(true)}
            className={styles.change}
          >
            Change password
          </button>
          {modalPasswordIsVisible &&
            createPortal(
              <div className={styles.containerForm}>
                <div className={styles.changeContainer}>
                  <div className={styles.close}>
                    <span
                      onClick={() => closeModal("password")}
                      className={styles.closeButton}
                    >
                      X
                    </span>
                  </div>
                  <p className={styles.textInfo}>
                    You're about to change your password. Make sure you remember
                    it!
                  </p>
                  <input
                    type="text"
                    placeholder="FirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="New LastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className={styles.input}
                  />
                  {error && <p className={styles.error}>{messageError}</p>}
                  <button
                    type="submit"
                    onClick={changePassword}
                    className={styles.button}
                  >
                    Confirm
                  </button>
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}

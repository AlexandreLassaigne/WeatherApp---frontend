import styles from "../styles/Signin.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { addHistory } from "../reducers/history";

export default function Signin({ closeModal }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    if (!firstName || !password || !lastName) {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(login(data.user));
            fetch(`http://localhost:3000/cities/${data.user.token}`)
              .then((response) => response.json())
              .then((data) => {
                
                if (data.result) {
                  dispatch(addHistory(data));
                  router.push("/home");
                } else {
                  router.push("/home");
                } 
              });
              
          }
        });
    }
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.signupContainer}>
        <div className={styles.close}>
          <span onClick={closeModal} className={styles.closeButton}>
            X
          </span>
        </div>
        <input
          type="text"
          placeholder="FirstName"
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
        <button type="submit" className={styles.button} onClick={handleSignin}>
          Signin
        </button>
        {emptyFields && (
          <span className={styles.error}>Veuillez remplir tous les champs</span>
        )}
      </div>
    </div>
  );
}

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
  const [messageError, setMessageError] = useState("");

  const handleSignin = () => {
    if (!firstName || !password || !lastName) {
      setEmptyFields(true);
      setMessageError("Champs manquant");
    } else {
      setEmptyFields(false);
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      fetch("https://weatherapp-backend-jade-three.vercel.app/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(login(data.user));
            fetch(
              `https://weatherapp-backend-jade-three.vercel.app/cities/${data.user.token}`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.result) {
                  //pour ajouter chaque ville séparement au reducer history
                  data.city.forEach((city) => {
                    dispatch(addHistory(city));
                  });
                  router.push("/home");
                } else {
                  router.push("/home");
                }
              });
          } else {
            setMessageError("Utilisateur non trouvé");
          }
        });
    }
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.signinContainer}>
        <div className={styles.close}>
          <span onClick={closeModal}>X</span>
        </div>
        <input
          type="text"
          placeholder="FirstName"
          name="FirstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="LastName"
          name="LastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignin();
            }
          }}
        />
        <button type="submit" className={styles.button} onClick={handleSignin}>
          Signin
        </button>
        <span className={styles.error}>{messageError}</span>
      </div>
    </div>
  );
}

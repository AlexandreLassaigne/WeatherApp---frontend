import styles from "../styles/Signup.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function Signup({ closeModal }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstnameSignup, setFirstnameSignup] = useState("");
  const [lastnameSignup, setLastnameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [messageError, setMessageError] = useState("");

  const handleSignup = () => {
    if (!firstnameSignup || !lastnameSignup || !passwordSignup) {
      setEmptyFields(true);
      setMessageError("Champs manquant");
    } else {
      setEmptyFields(false);
      const newUser = {
        firstName: firstnameSignup,
        lastName: lastnameSignup,
        password: passwordSignup,
      };
      fetch("https://weatherapp-backend-jade-three.vercel.app/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(login(data.user));
            router.push("/home");
          } else {
            setMessageError('Utilisateur déjà existant')
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
          name="FirstName"
          onChange={(e) => setFirstnameSignup(e.target.value)}
          value={firstnameSignup}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="LastName"
          name="LastName"
          onChange={(e) => setLastnameSignup(e.target.value)}
          value={lastnameSignup}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          onChange={(e) => setPasswordSignup(e.target.value)}
          value={passwordSignup}
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignup();
            }
          }}
        />
        <button type="submit" className={styles.button} onClick={handleSignup}>
          Signup
        </button>
        <span className={styles.error}>{messageError}</span>
      </div>
    </div>
  );
}

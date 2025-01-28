import styles from "../styles/Signin.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Signin() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !password) {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      const newUser = {
        firstName: firstName,
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
            console.log(data);
            router.push("/home");
          }
        });
    }
  };

  return (
    <div>
      <div className={styles.imageContainer}>
        <img src="/logo.svg" />
      </div>
      <form onSubmit={handleSignin} className={styles.containerForm}>
        <input
          type="text"
          placeholder="FirstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Signin
        </button>
        {emptyFields && (
          <span className={styles.error}>
            Veuillez remplir tous les champrs
          </span>
        )}
        <p onClick={() => router.push("/")} className={styles.texte}>
          Vous n'avez pas de compte ?
        </p>
      </form>
    </div>
  );
}

export default Signin;

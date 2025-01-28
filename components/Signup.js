import styles from "../styles/Signup.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !password) {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      fetch("http://localhost:3000/users/signup", {
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
      <form onSubmit={handleSignup} className={styles.containerForm}>
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
        <button type="submit" className={styles.button}>
          Signup
        </button>
        {emptyFields && (
          <span className={styles.error}>Veuillez remplir tous les champs</span>
        )}
        <p onClick={() => router.push("/signin")} className={styles.texte}>
          Vous avez déjà un compte ?
        </p>
      </form>
    </div>
  );
}

export default Signup;

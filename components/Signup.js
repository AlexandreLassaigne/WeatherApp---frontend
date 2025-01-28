import styles from "../styles/Signup.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSignup = () => {
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
        if(data.result){
        console.log(data.result);
        router.push("/home");
        }

      });
  }};

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="FirstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          type="text"
          placeholder="LastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleSignup}>Signup</button>
      </form>
      <p onClick={() => router.push("/signin")}>Vous avez déjà un compte ?</p>
      {emptyFields && <p>Veuillez remplir tous les champrs</p>}
    </div>
  );
}

export default Signup;

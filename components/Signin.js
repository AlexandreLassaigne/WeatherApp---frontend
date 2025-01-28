import styles from "../styles/Signin.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Signin() {

  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);

  const handleSignin = () => {
    if(!firstName || !lastName || !password){
        setEmptyFields(true)
    } else {
        setEmptyFields(false)
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            password: password,
        }
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then(data => {
        if(data.result){
          console.log(data)
          router.push('/home')
        }
      })

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
        <button onClick={handleSignin}>Signin</button>
      </form>
      <p onClick={() => router.push("/")}>Vous n'avez pas de compte ?</p>
      {emptyFields && (<p>Veuillez remplir tous les champrs</p>)}
    </div>
  );
}

export default Signin;

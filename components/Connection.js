import styles from "../styles/Connection.module.css";
import Signin from "./Signin";
import Signup from "./Signup";
import { createPortal } from "react-dom";
import { useState } from "react";

function Connection() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  return (
    <div>
      <img className={styles.image} src="/meteo.avif" />
      <div className={styles.imageContainer}>
        <img src="/logo.svg" />
      </div>
        <div className={styles.loginDiv}>
          <button
            onClick={() => setShowSignupModal(true)}
            className={styles.signupButton}
          >
            Sign up
          </button>
          {showSignupModal &&
            createPortal(
              <Signup closeModal={() => setShowSignupModal(false)} />,
              document.body
            )}
          <p className={styles.littleText}>Already have an account ?</p>
          <button
            onClick={() => setShowSigninModal(true)}
            className={styles.signinButton}
          >
            Sign in
          </button>
          {showSigninModal &&
            createPortal(
              <Signin closeModal={() => setShowSigninModal(false)} />,
              document.body
            )}
        </div>
    </div>
  );
}

export default Connection;

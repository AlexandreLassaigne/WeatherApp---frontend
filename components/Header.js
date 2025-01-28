import styles from "../styles/Header.module.css";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function Header() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState("2050-11-22T23:59:59");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div>
      <Moment className={styles.date} date={date} format="MMM Do YYYY" />
      <h1 className={styles.title}>Weather App</h1>
    </div>
  );
}

export default Header;

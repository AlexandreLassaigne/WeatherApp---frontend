import styles from "../styles/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {

  return (
    <div className={styles.card} style={{backgroundImage: `url(/${props.main}.gif)`}}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faHeart} className={styles.heart}/>
        <p>{props.name}</p>
        <FontAwesomeIcon icon={faCircleXmark} className={styles.xmark}/>
      </div>
      <span>{props.description}</span>
      <div className={styles.temp}>
        <span>TempMax : {props.tempMax} °C</span>
        <span>TempMin : {props.tempMin} °C</span>
      </div>
    </div>
  );
}

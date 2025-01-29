import styles from "../styles/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {


  let title = {};
  if (props.main === "Rain") {
    title = { color: "#ffffff" };
  }

  const handleLikeCity = () => {
    props.updateLikedCity(props.name)
  }

  let heartStyle = { 'cursor' : 'pointer'}
  if (props.isLiked){
    heartStyle = {'cursor' : 'pointer' , 'color': '#e74c3c'}
  }

  let tempMax = props.tempMax.toFixed(0);
  let tempMin = props.tempMin.toFixed(0);
  let cityName = props.name[0].toUpperCase()+ props.name.slice(1)

  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(/${props.main}.gif)`, height :400}}
    >
      <div className={styles.header}>
        <FontAwesomeIcon icon={faHeart} className={styles.heart}  onClick={handleLikeCity} style={heartStyle}/>
        <p style={title} className={styles.city}>
          {cityName}
        </p>
        <FontAwesomeIcon icon={faCircleXmark} className={styles.xmark} />
      </div>
      <span style={title} className={styles.description}>
        {props.description}
      </span>
      <div className={styles.tempContainer}>
        <span style={title} className={styles.temp}>
          TempMin : {tempMin} °C
        </span>
        <span style={title} className={styles.temp}>
          TempMax : {tempMax} °C
        </span>
      </div>
    </div>
  );
}

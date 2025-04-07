import styles from "../styles/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";

export default function Card(props) {
  console.log("props.main:", props.main);
  console.log("background path:", `/${props.main}.gif`);

  const dispatch = useDispatch();

  let title = {};
  if (props.main === "Rain") {
    title = { color: "#ffffff" };
  }

  const handleLikeCity = () => {
    if (props.isLiked) {
      dispatch(removeBookmark(props));
    } else {
      dispatch(addBookmark(props));
    }
  };

  let heartStyle = { cursor: "pointer" };
  if (props.isLiked) {
    heartStyle = { cursor: "pointer", color: "#e74c3c" };
  }

  let tempMax = props.tempMax.toFixed(0);
  let tempMin = props.tempMin.toFixed(0);
  let city = props.name[0].toUpperCase() + props.name.slice(1);
  let Wind = props.wind.toFixed(0) * 3.6;
  let direction;

  if (22.6 < props.deg && props.deg < 67.5) {
    direction = "NE";
  } else if (67.6 < props.deg && props.deg < 112.5) {
    direction = "E";
  } else if (112.6 < props.deg && props.deg < 157.5) {
    direction = "SE";
  } else if (157.6 < props.deg && props.deg < 202.5) {
    direction = "S";
  } else if (202.6 < props.deg && props.deg < 247.5) {
    direction = "SO";
  } else if (247.6 < props.deg && props.deg < 292.5) {
    direction = "O";
  } else if (292.6 < props.deg && props.deg < 337.5) {
    direction = "NO";
  } else {
    direction = "N";
  }

  const handleRemoveCity = () => {
    props.handleRemove(props.name);
  };

  const backgroundImage = {
    backgroundImage: `url('/${props.main}.gif')`,
    height: 400,
  };

  console.log(props.main);

  return (
    <div className={styles.card}>
      <img src={`/${props.main}.gif`} alt="image de fond" className={styles.imageFond} />
      <div className={styles.header}>
        <FontAwesomeIcon
          icon={faHeart}
          className={styles.heart}
          onClick={handleLikeCity}
          style={heartStyle}
          aria-label="loving the city"
          role="button"
        />
        <p className={styles.city}>{city}</p>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles.xmark}
          onClick={() => handleRemoveCity()}
          aria-label="Delete city"
          role="button"
        />
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
        <span style={title} className={styles.temp}>
          Wind : {Wind} km/h {direction}
        </span>
      </div>
    </div>
  );
}

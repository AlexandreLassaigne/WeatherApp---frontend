import styles from "../styles/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";

export default function Card(props) {

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
  let cityName = props.name[0].toUpperCase() + props.name.slice(1);

  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(/${props.main}.gif)`, height: 400}}
    >
      <div className={styles.header}>
        <FontAwesomeIcon
          icon={faHeart}
          className={styles.heart}
          onClick={handleLikeCity}
          style={heartStyle}
          aria-label="loving the city"
          role="button"
        />
        <p style={title} className={styles.city}>
          {cityName}
        </p>
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

import styles from "../styles/Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
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
  let city = props.name[0].toUpperCase() + props.name.slice(1);

  const handleRemoveCity = () => {
    props.handleRemove(props.name)
  }
  return (
    <div
      className={styles.card}
/*       style={{
        backgroundImage: `url('../public/${props.main}.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 400
      }} */
    >
      <img src={`/${props.main}.gif`} alt="Weather GIF" style={{ width: "100%", height: "100%" }} />
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
          {city}
        </p>
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
      </div>
    </div>
  );
}
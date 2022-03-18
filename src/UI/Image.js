import classes from "./Image.module.css";

const Image = (props) => {
  return <img src={`/survey-app-react${props.url}`} alt={props.alt || ""} className={classes.image} />;
};

export default Image;

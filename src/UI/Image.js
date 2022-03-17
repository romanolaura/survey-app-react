import classes from "./Image.module.css";

const Image = (props) => {
  return <img src={props.url} alt="Calendar pages" className={classes.image} />;
};

export default Image;

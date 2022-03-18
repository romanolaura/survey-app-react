import classes from "./Image.module.css";

const Image = (props) => {
  return <img src={`%PUBLIC_URL%${props.url}`} alt="Calendar pages" className={classes.image} />;
};

export default Image;

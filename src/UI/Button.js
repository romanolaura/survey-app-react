import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button type={props.type || "button"} onClick={props.onClick} className={props.className || classes.button} disabled={props.disabled || false} >
      {props.children}
    </button>
  );
};

export default Button;

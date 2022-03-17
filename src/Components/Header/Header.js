import { useContext } from "react";
import QuestionsCtx from "../../Context/question-context";
import Button from "../../UI/Button";
import classes from "./Header.module.css";

const Header = (props) => {
  const userCtx = useContext(QuestionsCtx);
  const logoutHandler = (e) => {
    localStorage.removeItem("currentUser");
    userCtx.setUserIsLoggedIn();
    e.preventDefault();
  };
  return (
    <div className={classes.header}>
      <h1>O CANADA</h1>
      <Button type="button" onClick={logoutHandler} className={classes.link}>
        Sign out
      </Button>
    </div>
  );
};

export default Header;

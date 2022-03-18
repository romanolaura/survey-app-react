import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import QuestionsCtx from "../../Context/question-context";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Header from "../Header/Header";
import Transition from "../Quiz/Transition";
import classes from "./Login.module.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidAttempt, setInvalidAttempt] = useState(false);

  const userCtx = useContext(QuestionsCtx);

  useEffect(() => {
    setInvalidAttempt(false);
    userCtx.setUserIsLoggedIn();
  }, [setInvalidAttempt, userCtx]);

  const usernameHandler = (e) => {
    setemail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const registerHandler = (e) => {
    e.preventDefault();
  };
  const logInHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        "https://survey-app-laura.herokuapp.com/user?email=" + email + "&password=" + password
      )
      .then((result) => {
        const userData = {
          firstname: result.data[0].firstname,
          lastname: result.data[0].lastname,
          id: result.data[0]._id,
        };
        if (result.data.length > 0) {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          userCtx.setUserIsLoggedIn();
        } else {
          setInvalidAttempt(true);
        }
      })
      .catch(() => {
        setInvalidAttempt(true);
      });
  };

  return !userCtx.userIsLoggedIn ? (
    <Card>
      <form className={classes.login}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" onChange={usernameHandler} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={passwordHandler} />
        </div>
        {invalidAttempt && (
          <p className={classes["invalid-msg"]}>User or password incorrect.</p>
        )}
        <div className={classes.buttons}>
          
          <Button type="submit" onClick={logInHandler}>
            Sign in
          </Button>
          <Button onClick={registerHandler} className={classes.link}>
            Register
          </Button>
        </div>
      </form>
    </Card>
  ) : (
    <Fragment><Header /><Transition welcome={true} /></Fragment>
  );
};

export default Login;

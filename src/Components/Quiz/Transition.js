import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { useState } from "react";
import Question from "./Question";
import Dashboard from "../Charts/Dashboard";
import classes from "./Transition.module.css"

const Transition = (props) => {
  let content = "";
  const currentUser = JSON.parse(localStorage.currentUser);
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const startQuizHandler = (e) => {
    e.preventDefault();
    setEndQuiz(false);
    setStartQuiz(true);
  };
  const endQuizHandler = () => {
    setStartQuiz(false);
    setEndQuiz(true);
  };
  const dashboardHandler = () => {
    setStartQuiz(false);
    setEndQuiz(false);
    setShowDashboard(true);
  };

  const reviewQuizHandler = () => {

  }

  if (props.welcome) {
    content = (
      <Card>
        <div className={classes.transition}>
          <h1>
            Welcome {currentUser.firstname} {currentUser.lastname}
          </h1>
          <Button onClick={startQuizHandler}>Start Quiz</Button>
        </div>
      </Card>
    );
  }

  if (endQuiz) {
    content = (
      <Card>
        <div className={classes.transition}>
          <h1>Congratulations, you finished!</h1>
          <Button onClick={dashboardHandler}>View Statistics</Button>
          <Button onClick={startQuizHandler}>Retry Quiz</Button>
          {/* <Button onClick={reviewQuizHandler}>Review Answers</Button> POSSIBLE FUTURE IMPLEMENTATION */} 
        </div>
      </Card>
    );
  }

  if (startQuiz) {
    content = <Question onEnd={endQuizHandler} />;
  }

  if (showDashboard) {
    content = <Dashboard />;
  }
  return content;
};

export default Transition;

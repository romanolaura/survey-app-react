import { useContext, useEffect, useState } from "react";
import classes from "./Form.module.css";
import Button from "../../UI/Button";
import axios from "axios";
import QuestionsCtx from "../../Context/question-context";
import _ from "lodash";

const SurveyQuestion = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0); // To manage which question is currently viewed by the user
  const [quizAnswers, setQuizAnswers] = useState({
    userId: JSON.parse(localStorage.currentUser).id,
  }); // Collects all user answers to the quiz to be submitted to de DB
  const [buttonBlocked, setButtonBlocked] = useState(true);

  const questionsCtx = useContext(QuestionsCtx);
  const questions = questionsCtx.questions;

  // Gets called when input changes on question - selection or text -
  const onChangeHandler = (e) => {
    // If the type is checked, the answers need to be managed in a array and add or remove them accordingly
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setQuizAnswers((prevQuizAnswers) => {
          return prevQuizAnswers[e.target.name] &&
            prevQuizAnswers[e.target.name].length > 0
            ? {
                ...prevQuizAnswers,
                [e.target.name]: _.uniq([
                  ...prevQuizAnswers[e.target.name],
                  e.target.value,
                ]),
              }
            : { ...prevQuizAnswers, [e.target.name]: [e.target.value] };
        });
      } else {
        setQuizAnswers((prevQuizAnswers) => {
          let temp = prevQuizAnswers;
          _.remove(temp, (val) => val === e.target.value);
          return { ...prevQuizAnswers, [e.target.name]: temp };
        });
      }
    }
    // Any other input type, the answer get added or overwritten
    else {
      setQuizAnswers((prevQuizAnswers) => {
        return { ...prevQuizAnswers, [e.target.name]: e.target.value };
      });
    }
    console.log(e.target.value.trim());
    if (e.target.type === "checkbox" || e.target.type === "radio") {
      setButtonBlocked(false);
    } else if (e.target.type === "text") {
      if (e.target.value.trim() !== "") setButtonBlocked(false);
      else setButtonBlocked(true);
    }
  };

  const goNextHandler = (e) => {
    e.preventDefault();
    setButtonBlocked(true);
    setQuestionIndex((prevIndex) => {
      return ++prevIndex;
    });
    console.log(quizAnswers[questions[questionIndex].name]);
  };

  const goBackHandler = (e) => {
    e.preventDefault();
    setButtonBlocked(true);
    setQuestionIndex((prevIndex) => {
      return --prevIndex;
    });
  };

  //Submits answers to the database
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("https://survey-app-laura.herokuapp.com/create", quizAnswers).then((res) => {
      console.log(res.data);
      props.onEnd();
    });
  };

  const firstQuestion = questionIndex === 0; // To hide "Back" button on first question
  const lastQuestion = questionIndex === questions.length - 1; // To change "Next" button to "Submit" in last question

  //Change question image when the question changes
  useEffect(() => {
    questionsCtx.changeQuestionImage(
      questionsCtx["questions"][questionIndex].url
    );
  }, [questionIndex, questionsCtx]);

  // Reusable Back and Next buttons
  const generateButtons = () => {
    const nextButtonStyle = buttonBlocked
      ? classes["disabled-button"]
      : classes["action-next"];
    const submitButtonStyle = buttonBlocked
      ? classes["disabled-button"]
      : classes["action-submit"];
    return (
      <div className={classes.actions}>
        {!firstQuestion && (
          <div className={classes["action-back"]}>
            <Button type="button" onClick={goBackHandler}>
              Back
            </Button>
          </div>
        )}
        <div className={lastQuestion ? submitButtonStyle : nextButtonStyle}>
          <Button
            type="submit"
            onClick={lastQuestion ? submitHandler : goNextHandler}
            disabled={buttonBlocked}
          >
            {lastQuestion ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    );
  };

  //Generators for each question input type (so far: select -radio and chechbox- and text)
  const generateSelectQuestion = (question) => {
    return (
      <div className={classes.form}>
        <p>{question.question}</p>
        <form>
          {question.options.map((option) => {
            // console.log(option.value === quizAnswers[question.name])
            return (
              <div className={classes["select-group"]} key={option.id}>
                <input
                  type={question.type}
                  name={question.name}
                  id={option.id}
                  value={option.value}
                  onChange={onChangeHandler}
                />
                <label htmlFor={option.id}>{option.value}</label>
              </div>
            );
          })}
          {generateButtons()}
        </form>
      </div>
    );
  };

  const generateTextQuestion = (question) => {
    return (
      <div className={classes.form}>
        <form>
          <div className={classes["select-group"]}>
            <label
              htmlFor={question.id}
              className={classes["text-input-label"]}
            >
              {question.question}
            </label>
            <input
              type={question.type}
              name={question.name}
              id={question.id}
              onChange={onChangeHandler}
            />
          </div>
          {generateButtons()}
        </form>
      </div>
    );
  };

  //Determine which type of question is and call the corresponding generator
  let currentQuestion = "";
  switch (questions[questionIndex].type) {
    case "text":
      currentQuestion = generateTextQuestion(questions[questionIndex]);
      break;
    case "checkbox":
    case "radio":
      currentQuestion = generateSelectQuestion(questions[questionIndex]);
      break;
    default:
      break;
  }

  //Returns question form
  return currentQuestion;
};

export default SurveyQuestion;

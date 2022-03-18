import Card from "../../UI/Card";
import SurveyQuestion from "./Form";
import Image from "../../UI/Image";
import classes from "./Question.module.css";
import { useContext } from 'react';
import QuestionsCtx from '../../Context/question-context';

const Question = (props) => {
  const questionsCtx = useContext(QuestionsCtx);

  return (
    <Card>
      <div className={classes['question-container']}>
        <div className={classes["survey-question"]}>
          <SurveyQuestion onEnd={props.onEnd} />
        </div>
        <div className={classes.image}>
          <Image url={questionsCtx.imageUrl} alt={questionsCtx.imgAlt} />
        </div>
      </div>
    </Card>
  );
};

export default Question;

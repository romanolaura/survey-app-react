import axios from "axios";
import _ from "lodash";
import { useCallback, useEffect, useState, useContext } from "react";
import QuestionsCtx from "../../Context/question-context";
import DoughnutChart from "./DoughnutChart";
import Card from "../../UI/Card";
import classes from "./Dashboard.module.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Dashboard = () => {
  const [dbData, setDbData] = useState(null);
  const [showGeneralStatistics, setShowGeneralStatistics] = useState(false);
  const questionsCtx = useContext(QuestionsCtx);
  const questions = questionsCtx.questions;
  let data = {};

  const getdBData = useCallback(() => {
    axios
      .get("https://survey-app-laura.herokuapp.com/getAllData")
      .then((response) => {
        setDbData(response.data);
      });
  }, []);

  const valuePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  const showGeneralStatisticsHandler = () => {
    setShowGeneralStatistics((prevValue) => !prevValue);
  };

  useEffect(() => {
    getdBData();
  }, [getdBData]);

  let content = [];

  //Creates default object to calculate statistics
  if (dbData) {
    _.forEach(questions, (question, index) => {
      switch (question.type) {
        case "radio":
        case "checkbox":
          data[question.name] = {
            type: question.type,
            title: `Question ${++index}`,
            subtitle: question.question,
            options: _.map(question.options, (option) => {
              return { label: option.value, value: 0 };
            }),
            correct: 0,
            incorrect: 0,
            rightAns: question.rightAns,
            category: question.category,
          };
          break;
        case "text":
          data[question.name] = {
            type: "text",
            title: `Question ${++index}`,
            subtitle: question.question,
            options: [
              {
                label:
                  question.rightAns.charAt(0).toUpperCase() +
                  question.rightAns.slice(1),
                value: 0,
              },
              { label: "Others", value: 0 },
            ],
            correct: 0,
            incorrect: 0,
            rightAns: question.rightAns,
            category: question.category,
          };
          break;
        default:
          break;
      }
    });
    //GENERAL STATISTICS
    // Goes through the DB data to calculate statistics and stores them in the default object
    _.forEach(dbData, (quizEntry) => {
      _.forEach(quizEntry, (quizAnswer, key) => {
        if (data[key]) {
          switch (data[key].type) {
            case "radio":
              const optionIdxRadio = _.findIndex(data[key].options, [
                "label",
                quizAnswer,
              ]); //Gets the option index that the user selected

              if (optionIdxRadio > -1) {
                data[key].options[optionIdxRadio].value += 1;
              }

              quizAnswer === data[key].rightAns
                ? data[key].correct++
                : data[key].incorrect++;

              break;
            case "checkbox":
              _.forEach(quizAnswer, (entry) => {
                // Iterate through all options selected by user in checkbox to find the index option of each one
                const optionIdx = _.findIndex(data[key].options, [
                  "label",
                  entry,
                ]);
                if (optionIdx > -1) {
                  data[key].options[optionIdx].value += 1;
                }
              });
              _.isEqual(quizAnswer.sort(), data[key].rightAns.sort())
                ? data[key].correct++
                : data[key].incorrect++;

              break;
            case "text":
              if (quizAnswer.trim().toLowerCase() === data[key].rightAns) {
                data[key].options[0].value += 1;
                data[key].correct++;
              } else {
                data[key].options[1].value += 1;
                data[key].incorrect++;
              }
              break;
            default:
              break;
          }
        }
      });
    });

    //USER STATISTICS

    let userData = _.filter(dbData, [
      "userId",
      JSON.parse(localStorage.currentUser).id,
    ]).slice(-1)[0];

    let userRightOrWrong = {
      userRight: 0,
      userWrong: 0,
      historian: 0,
      factChaser: 0,
      sportsFan: 0,
      total: 0,
    };

    _.forEach(userData, (entry, key) => {
      if (data[key]) {
        userRightOrWrong.total += 1;
        if ((data[key].type === 'radio' && data[key].rightAns === entry) || (data[key].type === 'checkbox' && _.isEqual(data[key].rightAns.sort(), entry.sort())) || (data[key].type === 'text' && data[key].rightAns === entry.trim().toLowerCase())) {
          userRightOrWrong.userRight += 1;
          switch (data[key].category) {
            case "history":
              userRightOrWrong.historian += 1;
              break;
            case "fact":
              userRightOrWrong.factChaser += 1;
              break;
            case "sports":
              userRightOrWrong.sportsFan += 1;
              break;
            default:
              break;
          }
        } else {
          userRightOrWrong.userWrong += 1;
        }
      }
    });
    //Charts
    const pieChartCorrectVsIncorrect = (
      <div className={classes.pie}>
        <PieChart
          title="Quiz Results"
          subtitle="Correct vs Incorrect Answers Ratio"
          labels={["Correct", "Incorrect"]}
          data={[
            valuePercentage(userRightOrWrong.userRight, userRightOrWrong.total),
            valuePercentage(userRightOrWrong.userWrong, userRightOrWrong.total),
          ]}
          backgroundColors={[
            "rgba(75, 192, 192, 0.8)",
            "rgba(255, 99, 132, 0.8)",
          ]}
          borderColors={["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"]}
        />
      </div>
    );

    const pieChartCategories = (
      <div className={classes.pie}>
        <PieChart
          labels={["History Junkie", "Fact Chaser", "Sports Fan"]}
          subtitle="Categories"
          title="Knowledge Distribution"
          data={[
            valuePercentage(
              userRightOrWrong.historian,
              userRightOrWrong.userRight
            ),
            valuePercentage(
              userRightOrWrong.factChaser,
              userRightOrWrong.userRight
            ),
            valuePercentage(
              userRightOrWrong.sportsFan,
              userRightOrWrong.userRight
            ),
          ]}
          backgroundColors={[
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ]}
          borderColors={[
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ]}
        />
      </div>
    );

    const barChart = (
      <div className={classes.bar}>
        <BarChart
          title="Overview"
          labels={_.map(data, "title")}
          correctAnswers={_.map(data, "correct")}
          incorrectAnswers={_.map(data, "incorrect")}
        />
      </div>
    );

    const doughnutCharts = _.map(data, (questionStatistics, key) => {
      return (
        <div key={key} className={classes.doughnut}>
          <DoughnutChart
            key={key}
            title={questionStatistics.title}
            subtitle={questionStatistics.subtitle}
            labels={_.map(questionStatistics.options, "label")}
            data={_.map(questionStatistics.options, (option) =>
              valuePercentage(
                option.value,
                _.sumBy(questionStatistics.options, "value")
              )
            )}
          />
        </div>
      );
    });
    // console.log(_.map(data,'rightAns'));
    const arrowIcon = showGeneralStatistics ? <FaAngleUp /> : <FaAngleDown />;
    content = (
      <div className={classes.dashboard}>
        <h2>User Statistics</h2>
        {pieChartCorrectVsIncorrect}
        {pieChartCategories}
        <h2>General Statistics</h2>
        {barChart}
        <h3 onClick={showGeneralStatisticsHandler}>
          General answers distribution {arrowIcon}
        </h3>
        {showGeneralStatistics && doughnutCharts}
      </div>
    );
  }
  return <Card>{dbData && content}</Card>;
};

export default Dashboard;

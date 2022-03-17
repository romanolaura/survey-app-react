import { useState } from "react";
import QuestionsCtx from "./question-context";
import _ from 'lodash';
const QuestionsCtxProvider = (props) => {
  const [imageUrl, setImageUrl] = useState("/images/calendar2.jpg");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const defaultCtx = {
    questions: [
      {
        type: "checkbox",
        question: "Canada's official language(s) (select all that apply)",
        name: "officialLanguage",
        options: [
          { id: "french", value: "French", children: null },
          { id: "spanish", value: "Spanish", children: null },
          { id: "german", value: "German", children: null },
          { id: "english", value: "English", children: null },
        ],
        url: "/images/languages.jpg",
        rightAns: ["English", "French"],
        category: "fact",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question: "True or false: Canada is the world's third largest country",
        name: "thirdLargestCountry",
        options: [
          { id: "largestTrue", value: "True", children: null },
          { id: "largestFalse", value: "False", children: null },
        ],
        url: "/images/world.webp",
        rightAns: "False",
        category: "fact",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question:
          "Both men's and women's Canadian hockey teams won gold in Salt Lake City.",
        name: "hocheySaltLake",
        options: [
          { id: "saltLakeTrue", value: "True", children: null },
          { id: "saltLakeFalse", value: "False", children: null },
        ],
        url: "/images/world.webp",
        rightAns: "True",
        category: "sports",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question: "Who were the first to colonize Canada",
        name: "canadaColonizers",
        options: [
          { id: "british", value: "The British", children: null },
          { id: "french", value: "The French", children: null },
          { id: "vikings", value: "The Vikings", children: null },
          { id: "spanish", value: "The Spanish", children: null },
        ],
        url: "/images/vikings.jpg",
        rightAns: "The Vikings",
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "text",
        question: "Canada's national animal",
        name: "nationalAnimal",
        id: "nationalAnimal",
        value: "",
        children: null,
        url: "/images/animals.jpg",
        rightAns: "beaver",
        category: "fact",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question: "The coldest ever recorded temperature in Canada is",
        name: "coldestTemperature",
        options: [
          { id: "temp-63", value: "-63°C", children: null },
          { id: "temp-55", value: "-55°C", children: null },
          { id: "temp-71", value: "-71°C", children: null },
          { id: "temp-67", value: "-67°C", children: null },
        ],
        url: "/images/temperature.jpg",
        rightAns: "-63°C",
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question:
          "True or false: Select true or false: Hockey is the national sport of Canada",
        name: "nationalSport",
        options: [
          { id: "nationalSportTrue", value: "True", children: null },
          { id: "nationalSportFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "False",
        category: "sports",
        next:1,
        back:1,
      },
      // This question triggers the changing questions
      {
        type: "radio",
        question: "What is the Oldest City in Canada",
        name: "oldestCity",
        options: [
          { id: "montreal", value: "St. John's", children: null },
          { id: "trois-Rivieres", value: "Quebec City", children: null },
          { id: "quebec-city", value: "Trois-Rivières", children: null },
          { id: "st-johns", value: "St. John's", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "St. John's",
        category: "history",
        next:1,
        back:1,
      },
      //If user chooses Montreal
      {
        type: "radio",
        question: "Montreal was incorporated as a city in 1832",
        name: "incorporatedMontreal",
        options: [
          { id: "incorporatedMontrealTrue", value: "True", children: null },
          { id: "incorporatedMontrealFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "True",
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question: "Which Summer Olimpic Games were hosted in Montreal",
        name: "olimpicsMontreal",
        options: [
          { id: "olimpicsMontreal2000", value: "2000", children: null },
          { id: "olimpicsMontreal1976", value: "1976", children: null },
          { id: "olimpicsMontreal1992", value: "1992", children: null },
          { id: "olimpicsMontreal1984", value: "1984", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "1976",
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question:
          "In Formula 1, the Canadian Grand Prix has been regularly held at which circuit in Montreal since 1978",
        name: "f1Montreal",
        options: [
          { id: "mosport", value: "Mosport Park", children: null },
          {
            id: "villeneuve",
            value: "Circuit Gilles Villeneuve",
            children: null,
          },
          {
            id: "mon-tremblant",
            value: "Circuit Mon-Tremblant",
            children: null,
          },
          { id: "montmagny", value: "Autodrome Montmagny", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "Circuit Gilles Villeneuve",
        category: "sports",
        next:9,
        back:1,
      },
      //If user chooses Quebec City
      {
        type: "radio",
        question: "Quebec City was founded in 1606",
        name: "foundingQuebecCity",
        options: [
          { id: "foundingQuebecCityTrue", value: "True", children: null },
          { id: "foundingQuebecCityFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "False",
        category: "history",
        next:3,
        back:1,
      },
      {
        type: "radio",
        question:
          "Quebec City is the only remaining _________ city in North America ",
        name: "walledQuebec",
        options: [
          { id: "french-speaking", value: "French Speaking", children: null },
          { id: "military-protected", value: "Military Protected", children: null },
          { id: "walled", value: "Walled", children: null },
          { id: "unpopulated", value: "Unpopulated", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "Walled",
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question:
          "Gaetan Boucher, from Quebec City, was an Olympic gold medallist in which sport?",
        name: "olympicMedallisQC",
        options: [
          { id: "skating", value: "Speed skating", children: null },
          { id: "javelin", value: "Javelin", children: null },
          { id: "snowboarding", value: "Snowboarding", children: null },
          { id: "fencing", value: "Fencing", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "Speed skating",
        category: "sports",
        next:6,
        back:1,
      },
      //If user chooses Trois-Rivières
      {
        type: "radio",
        question: "Trois-Rivières was founded in 1634",
        name: "foundingRivieres",
        options: [
          { id: "foundingRivieresTrue", value: "True", children: null },
          { id: "foundingRivieresFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "True",
        category: "history",
        next:1,
        back:6,
      },
      {
        type: "radio",
        question:
          "Several surrounding communities were merged into Trois-Rivières in",
        name: "mergedRivieres",
        options: [
          { id: "mergedRivieres2000", value: "2000", children: null },
          { id: "mergedRivieres2001", value: "2001", children: null },
          { id: "mergedRivieres2002", value: "2002", children: null },
          { id: "mergedRivieres2003", value: "2003", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "2002",
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question:
          "Name of longest-running street race in North America, hosted in Trois-Rivières",
        name: "streetRaceRivieres",
        options: [
          {
            id: "gpltee",
            value: "Grand Prix Player's Ltee de Trois-Rivières",
            children: null,
          },
          {
            id: "gplabatt",
            value: "Grand Prix Labatt de Trois-Rivières",
            children: null,
          },
          {
            id: "gplolson",
            value: "Grand Prix Molson de Trois-Rivières",
            children: null,
          },
          { id: "gp", value: "Grand Prix de Trois-Rivières", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "Grand Prix de Trois-Rivières",
        category: "sports",
        next:3,
        back:1,
      },
      //If user chooses St. John's
      {
        type: "radio",
        question: "St. John's became incorporated as a city in 1920",
        name: "incorporatedJohns",
        options: [
          { id: "incorporatedJohnsTrue", value: "True", children: null },
          { id: "incorporatedJohnsFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "False",
        category: "history",
        next:1,
        back:9,
      },
      {
        type: "checkbox",
        question:
          "St. John's was ravaged by three fires in (select all that apply)",
        name: "firesJohn",
        options: [
          { id: "firesJohn1816", value: "1816", children: null },
          { id: "firesJohn1831", value: "1831", children: null },
          { id: "firesJohn1846", value: "1846", children: null },
          { id: "firesJohn1892", value: "1892", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: ["1816", "1846", "1892"],
        category: "history",
        next:1,
        back:1,
      },
      {
        type: "radio",
        question: "St. John's has a local professional NHL team",
        name: "nhlTeamJohn",
        options: [
          { id: "nhlTeamJohnTrue", value: "True", children: null },
          { id: "nhlTeamJohnFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        rightAns: "False",
        category: "sports",
        next:1,
        back:1,
      },
      // End of conditional questions
      {
        type: "radio",
        question: "What former NHL player is known as the “Rocket”",
        name: "cityOfChampions",
        options: [
          { id: "richard", value: "Maurice Richard", children: null },
          { id: "orr", value: "Bobby Orr", children: null },
          { id: "gretzky", value: "Wayne Gretzky", children: null },
          { id: "blake", value: "Hector Blake", children: null },
        ],
        url: "/images/canadaMap.png",
        rightAns: "Maurice Richard",
        category: "sports",
      },
      {
        type: "radio",
        question: "What animal is in the 1CAD coin",
        name: "loonieAnimal",
        options: [
          { id: "duck", value: "Duck", children: null },
          { id: "geese", value: "Geese", children: null },
          { id: "grebes", value: "Grebes", children: null },
          { id: "loon", value: "Loon", children: null },
        ],
        url: "/images/coins.jpg",
        rightAns: "Loon",
        category: "fact",
      },
      {
        type: "checkbox",
        question: "Cities in Canada (select all that apply)",
        name: "citiesCanada",
        options: [
          { id: "nelson", value: "Nelson", children: null },
          { id: "churchill", value: "Churchill", children: null },
          { id: "beaufort", value: "Beaufort", children: null },
          { id: "providence", value: "Providence", children: null },
        ],
        url: "/images/canadaMap.png",
        rightAns: ["Nelson", "Churchill"],
        category: "fact",
      },
      {
        type: "radio",
        question: "What Canadian based NBA Team moved to Memphis?",
        name: "nbaMemphis",
        options: [
          { id: "grizzlies", value: "Vancouver Grizzlies", children: null },
          { id: "cowboys", value: "Calgary Cowboys", children: null },
          { id: "icebergs", value: "Montreal Icebergs", children: null },
          { id: "elk", value: "Edmonton Elk", children: null },
        ],
        url: "/images/canadaMap.png",
        rightAns: "Vancouver Grizzlies",
        category: "sports",
      },
    ],
    imageUrl: imageUrl,
    userIsLoggedIn: userIsLoggedIn,
    changeQuestionImage: (url) => setImageUrl(url),
    setUserIsLoggedIn: () => setUserIsLoggedIn(localStorage.currentUser),
  };
  console.log(_.map(defaultCtx.questions, (q) => {return {[q.name]:'String'}}))
  return (
    <QuestionsCtx.Provider value={defaultCtx}>
      {props.children}
    </QuestionsCtx.Provider>
  );
};

export default QuestionsCtxProvider;

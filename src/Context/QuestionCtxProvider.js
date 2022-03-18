import { useState } from "react";
import QuestionsCtx from "./question-context";

const QuestionsCtxProvider = (props) => {
  const [imageUrl, setImageUrl] = useState("/images/calendar2.jpg");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const defaultCtx = {
    questions: [
      { //0
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
        imgAlt: "Hello in different languages",
        rightAns: ["English", "French"],
        category: "fact",
      },
      { //1
        type: "radio",
        question: "True or false: Canada is the world's third largest country",
        name: "thirdLargestCountry",
        options: [
          { id: "largestTrue", value: "True", children: null },
          { id: "largestFalse", value: "False", children: null },
        ],
        url: "/images/world.webp",
        imgAlt: "Globe grabbed with one hand",
        rightAns: "False",
        category: "fact",
      },
      { //2
        type: "radio",
        question:
          "Both men's and women's Canadian hockey teams won gold in Salt Lake City.",
        name: "hocheySaltLake",
        options: [
          { id: "saltLakeTrue", value: "True", children: null },
          { id: "saltLakeFalse", value: "False", children: null },
        ],
        url: "/images/hockey.jpg",
        imgAlt: "People playing hockey",
        rightAns: "True",
        category: "sports",
      },
      { //3
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
        imgAlt: "Colonizers arriving on a boat",
        rightAns: "The Vikings",
        category: "history",
      },
      { //4
        type: "text",
        question: "Canada's national animal",
        name: "nationalAnimal",
        id: "nationalAnimal",
        value: "",
        children: null,
        url: "/images/animals.jpg",
        imgAlt: "Penguins forming a heart",
        rightAns: "beaver",
        category: "fact",
      },
      { //5
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
        imgAlt: "Cold termometer",
        rightAns: "-63°C",
        category: "history",
      },
      { //6
        type: "radio",
        question:
          "True or false: Select true or false: Hockey is the national sport of Canada",
        name: "nationalSport",
        options: [
          { id: "nationalSportTrue", value: "True", children: null },
          { id: "nationalSportFalse", value: "False", children: null },
        ],
        url: "/images/hockey2.jpg",
        imgAlt: "People playing hockey",
        rightAns: "False",
        category: "sports",
      },
      // This question triggers the changing questions
      { //7
        type: "radio",
        question: "What is the Oldest City in Canada",
        name: "oldestCity",
        options: [
          { id: "montreal", value: "Montreal", children: null },
          { id: "quebec-city", value: "Quebec City", children: null },
          { id: "trois-Rivieres", value: "Trois-Rivières", children: null },
          { id: "st-johns", value: "St. John's", children: null },
        ],
        url: "/images/canadaMap.png",
        imgAlt: "Map of Canada",
        rightAns: "St. John's",
        category: "history",
      },
      //If user chooses Montreal
      { //8
        type: "radio",
        question: "Montreal was incorporated as a city in 1832",
        name: "incorporatedMontreal",
        options: [
          { id: "incorporatedMontrealTrue", value: "True", children: null },
          { id: "incorporatedMontrealFalse", value: "False", children: null },
        ],
        url: "/images/montreal.jpg",
        imgAlt: "Montreal aerial view",
        rightAns: "True",
        category: "history",
      },
      { //9
        type: "radio",
        question: "Which Summer Olimpic Games were hosted in Montreal",
        name: "olimpicsMontreal",
        options: [
          { id: "olimpicsMontreal2000", value: "2000", children: null },
          { id: "olimpicsMontreal1976", value: "1976", children: null },
          { id: "olimpicsMontreal1992", value: "1992", children: null },
          { id: "olimpicsMontreal1984", value: "1984", children: null },
        ],
        url: "/images/montreal2.jpg",
        imgAlt: "Montreal street view",
        rightAns: "1976",
        category: "history",
      },
      { //10
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
        url: "/images/montreal3.jpg",
        imgAlt: "Montreal street crossing",
        rightAns: "Circuit Gilles Villeneuve",
        category: "sports",
      },
      //If user chooses Quebec City
      { //11
        type: "radio",
        question: "Quebec City was founded in 1606",
        name: "foundingQuebecCity",
        options: [
          { id: "foundingQuebecCityTrue", value: "True", children: null },
          { id: "foundingQuebecCityFalse", value: "False", children: null },
        ],
        url: "/images/qc.jpg",
        rightAns: "False",
        imgAlt: "Hotel Quebec City",
        category: "history",
      },
      { //12 
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
        url: "/images/qc2.webp",
        imgAlt: "Quebec City aerial view",
        rightAns: "Walled",
        category: "history",
      },
      { //13
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
        url: "/images/qc3.jpg",
        rightAns: "Speed skating",
        imgAlt: "Quebec City street view",
        category: "sports",
      },
      //If user chooses Trois-Rivières
      { //14
        type: "radio",
        question: "Trois-Rivières was founded in 1634",
        name: "foundingRivieres",
        options: [
          { id: "foundingRivieresTrue", value: "True", children: null },
          { id: "foundingRivieresFalse", value: "False", children: null },
        ],
        url: "/images/rivieres.jpg",
        imgAlt: "Trois-Rivières street view",
        rightAns: "True",
        category: "history",
      },
      { //15
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
        url: "/images/rivieres2.jpg",
        imgAlt: "Trois-Rivières fountain",
        rightAns: "2002",
        category: "history",
      },
      { //16
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
        url: "/images/rivieres3.jpg",
        imgAlt: "Trois-Rivières street view",
        rightAns: "Grand Prix de Trois-Rivières",
        category: "sports",
      },
      //If user chooses St. John's
      { //17
        type: "radio",
        question: "St. John's became incorporated as a city in 1920",
        name: "incorporatedJohns",
        options: [
          { id: "incorporatedJohnsTrue", value: "True", children: null },
          { id: "incorporatedJohnsFalse", value: "False", children: null },
        ],
        url: "/images/johns.jpg",
        imgAlt: "St. John's aerial view",
        rightAns: "False",
        category: "history",
      },
      { //18
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
        url: "/images/johns2.png",
        imgAlt: "St. John's aerial view",
        rightAns: ["1816", "1846", "1892"],
        category: "history",
      },
      { //19
        type: "radio",
        question: "St. John's has a local professional NHL team",
        name: "nhlTeamJohn",
        options: [
          { id: "nhlTeamJohnTrue", value: "True", children: null },
          { id: "nhlTeamJohnFalse", value: "False", children: null },
        ],
        url: "/images/johns3.jpeg",
        imgAlt: "St. John's aerial view",
        rightAns: "False",
        category: "sports",
      },
      // End of conditional questions
      { //20
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
        imgAlt: "Map of Canada",
        rightAns: "Maurice Richard",
        category: "sports",
      },
      { //21
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
        imgAlt: "Coin stacks",
        rightAns: "Loon",
        category: "fact",
      },
      { //22
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
        imgAlt: "Map of Canada",
        rightAns: ["Nelson", "Churchill"],
        category: "fact",
      },
      { //23
        type: "radio",
        question: "What Canadian based NBA Team moved to Memphis?",
        name: "nbaMemphis",
        options: [
          { id: "grizzlies", value: "Vancouver Grizzlies", children: null },
          { id: "cowboys", value: "Calgary Cowboys", children: null },
          { id: "icebergs", value: "Montreal Icebergs", children: null },
          { id: "elk", value: "Edmonton Elk", children: null },
        ],
        url: "/images/nba.jpg",
        imgAlt: "NBA ball",
        rightAns: "Vancouver Grizzlies",
        category: "sports",
      },
    ],
    imageUrl: imageUrl,
    userIsLoggedIn: userIsLoggedIn,
    changeQuestionImage: (url) => setImageUrl(url),
    setUserIsLoggedIn: () => setUserIsLoggedIn(localStorage.currentUser),
  };

  return (
    <QuestionsCtx.Provider value={defaultCtx}>
      {props.children}
    </QuestionsCtx.Provider>
  );
};

export default QuestionsCtxProvider;

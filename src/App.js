import "./App.css";
import Login from "./Components/User/Login";
import QuestionsCtxProvider from "./Context/QuestionCtxProvider";

function App() {
  return (
    <QuestionsCtxProvider>
      <Login />
    </QuestionsCtxProvider>
  );
}

export default App;

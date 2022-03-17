import "./App.css";
import Dashboard from "./Components/Charts/Dashboard";
import Login from "./Components/User/Login";
import QuestionsCtxProvider from "./Context/QuestionCtxProvider";

function App() {
  return (
    <QuestionsCtxProvider>
      {/* <Dashboard />  */}
      <Login />
    </QuestionsCtxProvider>
  );
}

export default App;

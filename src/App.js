import Weather from "./components/Weather";
import TodoList from "./components/TodoList";
import News from "./components/News";

// SCSS
import "./variables.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Weather size="large" type="card" />
      <TodoList size="large" type="card" />
      <News size="large" type="card" />
    </div>
  );
}

export default App;

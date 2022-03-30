import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Router from "./Router";

function App() {
  return (
    <div>
      <Nav/>
      {/* <Login /> */}
      {/* <Register /> */}
      <div className="conten flex-1">
              <Router />
      </div>
    </div>
  );
}

export default App;

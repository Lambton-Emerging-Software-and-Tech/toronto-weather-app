import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Router from "./Router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Nav/>
      {/* <Login /> */}
      {/* <Register /> */}
      <div className="conten flex-1">
              <Router />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

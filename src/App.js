import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Alert from "./Component/Alert";
import Navbar from "./Component/Navbar";
import { useState } from "react";
import TextForm from "./Component/TextForm";
import About from "./Component/About";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState("light");

  const showAlert = (message, type) => {
    setAlert({
      type: type,
      msg: message,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      document.body.style.background = "#042743";
      setMode("dark");
      showAlert("Dark mode has been enabled", "success");
    } else {
      document.body.style.background = "white";
      setMode("light");
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title="TextUtils"
          about="About"
          mode={mode}
          toggleMode={toggleMode}
          key={new Date()}
        />
        <Alert alert={alert} />

        <div className="container my-3">
          <Routes>    
            <Route exact path="/" element={<TextForm showAlert={showAlert} mode={mode} />}/>
            <Route exact path="/about" element={<About mode={mode} />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

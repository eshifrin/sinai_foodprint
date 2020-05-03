import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const getTest = async () => {
  const { data } = await axios("/api/test");
  return data;
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getTest().then((data) => setData(data));
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <pre> {JSON.stringify(data)}</pre>
      </header>
    </div>
  );
}

export default App;

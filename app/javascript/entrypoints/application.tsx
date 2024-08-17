import React from "react";
import ReactDOM from "react-dom/client";
import Register from "../components/Register";

const App = () => (
  <>
    <h1>Hello from React!</h1>
    <Register />
  </>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

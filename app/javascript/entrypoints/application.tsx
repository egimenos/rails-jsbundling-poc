import React from "react";
import ReactDOM from "react-dom/client";
import Register from "../components/Register";
import Login from "../components/Login";

const App = () => (
  <>
    <h1>Hello from React!</h1>
    <div>
      <h2>Register</h2>
      <Register />
    </div>
    <div>
      <h2>Login</h2>
      <Login />
    </div>
  </>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

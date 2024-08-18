import React, { useState } from "react";
import { getCSRFToken } from "../utils/getCSRFToken";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    interface FormData {
      email: string;
      password: string;
    }

    const data: FormData = {
      email: login,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCSRFToken(),
        } as HeadersInit,

        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login success:", result);
      } else {
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Login:
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}

export default Login;

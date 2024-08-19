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
      const response = await fetch(`${window.location.origin}/login`, {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Login:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

export default Login;


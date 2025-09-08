import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/context/user";

export default function Login() {
  const navigate = useNavigate();
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-[#606c38] p-8 rounded-2xl shadow-lg w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-[#fefae0] text-[#283618] outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-[#fefae0] text-[#283618] outline-none"
      />
      <button
        onClick={() => user.login(email, password)}
        className="w-full bg-[#dda15e] hover:bg-[#bc6c25] text-[#283618] font-bold py-2 rounded"
      >
        Login
      </button>
      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-[#fefae0] underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

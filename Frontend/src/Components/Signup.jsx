import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/context/user";

export default function Signup() {
  const navigate = useNavigate();
  const user = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-[#606c38] p-8 rounded-2xl shadow-lg w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-[#fefae0] text-[#283618] outline-none"
      />
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
        onClick={() => user.signup(name, email, password)}
        className="w-full bg-[#dda15e] hover:bg-[#bc6c25] text-[#283618] font-bold py-2 rounded"
      >
        Sign Up
      </button>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-[#fefae0] underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}

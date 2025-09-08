import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/context/user";

export default function Home() {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="bg-[#606c38] p-8 rounded-2xl shadow-lg w-96 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome 🎉</h2>
      <p className="mb-6">You are now logged in.</p>
      <button
        onClick={() => user.logout()}
        className="bg-[#dda15e] hover:bg-[#bc6c25] text-[#283618] font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

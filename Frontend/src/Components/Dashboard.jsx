import React, { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";
import { useProfile } from "../lib/context/profile.jsx";

export default function Dashboard() {
  const { logout } = useUser();
  const { createProfile, getProfiles, deleteProfile } = useProfile();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    education: "",
    gender: "",
    age: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProfile(form); // save to DB
    const res = await getProfiles(); // fetch from DB
    if (res && res.length > 0) setProfile(res[0]);
  };

  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfiles();
      if (res && res.length > 0) setProfile(res[0]);
    }
    fetchProfile();
  }, []);

  const handleDelete = () => {
    setProfile(null);
    deleteProfile();
    setForm({
      fullname: "",
      email: "",
      education: "",
      gender: "",
      age: "",
      city: "",
      state: "",
      country: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#283618] text-white flex flex-col overflow-auto">
      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold tracking-wide">📋 Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 flex-1 p-8 gap-8">
        {/* Left - Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#606c38] p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">✍️ Create Profile</h2>

          {Object.keys(form).map((field) => (
            <div key={field} className="mb-5">
              <label className="block font-semibold mb-2 capitalize">
                {field === "education" ? "Current Education" : field}
              </label>
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className="w-full px-4 py-2 rounded bg-[#fefae0] text-[#283618] outline-none"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-4 bg-[#dda15e] hover:bg-[#bc6c25] transition text-[#283618] font-bold py-3 px-4 rounded"
          >
            Save Profile
          </button>
        </form>

        {/* Right - Profile Preview */}
        <div className="bg-[#606c38] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">👤 Profile Preview</h2>

          {profile ? (
            <div className="space-y-5 text-lg">
              <p>
                <strong>Full Name:</strong> {profile.fullname}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Education:</strong> {profile.education}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender}
              </p>
              <p>
                <strong>Age:</strong> {profile.age}
              </p>
              <p>
                <strong>City:</strong> {profile.city}
              </p>
              <p>
                <strong>State:</strong> {profile.state}
              </p>
              <p>
                <strong>Country:</strong> {profile.country}
              </p>

              <button
                onClick={handleDelete}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded font-semibold transition"
              >
                Delete Profile
              </button>
            </div>
          ) : (
            <p className="text-center text-[#fefae0] text-lg opacity-80">
              🚀 No profile submitted yet. Fill the form to see preview here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

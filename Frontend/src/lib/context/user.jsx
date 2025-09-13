import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite.js";

// Context
const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Login
  async function login(email, password) {
    try {
      // Try to get logged-in user first
      const existingUser = await account.get();
      console.log("Already logged in:", existingUser);
      setUser(existingUser);
    } catch {
      // Not logged in → create new session
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      console.log("Login successful:", loggedInUser);
      setUser(loggedInUser);
      window.location.href = "/dashboard"; // redirect after login
    }
  }

  // 🔹 Logout
  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
      window.location.href = "/signup"; // redirect after logout
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  }

  // 🔹 Signup
  async function signup(name, email, password) {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password); // login will setUser
    } catch (err) {
      console.error("Signup failed:", err.message);
    }
  }

  // 🔹 Init on page load (restore session if exists)
  async function init() {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, signup, loading }}>
      {children}
    </UserContext.Provider>
  );
}

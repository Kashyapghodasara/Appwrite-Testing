import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite.js";

// To access data from context in other components
const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider(props) {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try {
            const loggedIn = await account.createEmailPasswordSession(email, password);
            setUser(loggedIn);
            window.location.href = "/dashboard"; // ✅ fixed
        } catch (err) {
            console.error("Login failed:", err.message);
        }
    }

    async function logout() {
        try {
            await account.deleteSession("current");
            setUser(null);
            window.location.href = "/signup"; // ✅ fixed
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    }

    async function signup(name, email, password) {
        try {
            await account.create(ID.unique(), email, password, name); // ✅ fixed
            await login(email, password);
        } catch (err) {
            console.error("Signup failed:", err.message);
        }
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <UserContext.Provider value={{ current: user, login, logout, signup }}>
            {props.children}
        </UserContext.Provider>
    );
}

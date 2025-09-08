import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite.js";
import { useNavigate } from "react-router-dom";

// To access data from context in other components
const UserContext = createContext();
/* const navigate = useNavigate(); */

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider(props) {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        const loggedIn = await account.createEmailPasswordSession({
            email,
            password
        });

        setUser(loggedIn);
        window.location.href("/dashboard");
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
        window.location.href("/signup");

    }

    async function signup(name, email, password) {
        await account.create({
            userId: ID.unique(),
            name,
            email,
            password
        });
        await login(email, password);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch (err) {
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

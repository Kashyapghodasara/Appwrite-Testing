import { databases, account } from "../appwrite";
import { createContext, useContext, useState } from "react";
import { Query } from "appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const [data, setData] = useState(null);

    async function createProfile(profile) {
        try {
            if (!profile) return console.log("No Profile DATA");

            const getUser = await account.get();
            if (!getUser) {
                console.log("No User Logged IN");
                return;
            }

            const res = await databases.createDocument(
                DB_ID,
                COLLECTION_ID,
                "unique()",
                {
                    ...profile,
                    age: parseInt(profile.age, 10),
                    userID: getUser.$id,
                }
            );

            console.log("Profile Created : ", res);
            return res;
        } catch (error) {
            console.log("Profile Creation Failed : ", error.message);
        }
    }

    async function getProfiles() {
        try {
            const getUser = await account.get();
            if (!getUser) {
                console.log("No User Logged IN");
                return;
            }

            const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
                Query.equal("userID", getUser.$id),
            ]);

            console.log("Profiles Retrieved : ", res);

            if (res.total === 0) return [];
            setData(res.documents);
            return res.documents;
        } catch (error) {
            console.log("Get Profiles Failed : ", error.message);
        }
    }

    async function deleteProfile() {
        try {
            const getUser = await account.get();
            if (!getUser) {
                console.log("No User Logged IN");
                return;
            }

            const res = await databases.listDocuments(
                DB_ID,
                COLLECTION_ID,
                [Query.equal("userID", getUser.$id)] // ✅ correct filter
            );

            if (res.total === 0) {
                console.log("No Profile Found to Delete");
                return;
            }

            // delete first profile (you can adjust if multiple profiles exist)
            await databases.deleteDocument(
                DB_ID,
                COLLECTION_ID,
                res.documents[0].$id
            );

            console.log("Profile Deleted Successfully");
            setData(null);

        } catch (error) {
            console.log("Delete Profile Failed : ", error.message);
        }
    }


    return (
        <ProfileContext.Provider value={{ createProfile, getProfiles, data, deleteProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

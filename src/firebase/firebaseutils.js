import { collection, getDocs, addDoc, doc, setDoc, getDoc, deleteDoc, updateDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/initFirebase";

export const createNewUser = async (userId) => {
    // Create a new user document in the "users" collection
    await setDoc(doc(db, "users", userId), {
        uid: userId,
        email: email,
    });
}
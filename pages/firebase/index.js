import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../helper/firebase";
import { collection, doc, setDoc, getDoc, query, getDocs } from "firebase/firestore";


export default function Firebase() {


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Simple state
    const [state, setstate] = useState('');

    // All users
    const [users, setUsers] = useState([]);

    async function getUsers() {
        // console.log(db);
        const colRef = collection(db, "users");

        // console.log(userTable);

        // const docRef = doc(db, "users");
        const q = query(colRef);

        // tags[] // calories>250

        const res = await getDocs(q);

        var a = [];

        res.docs.forEach((doc) => {
            console.log(doc.data());
            a.push(doc.data())
            // users.push({ ...doc.data(), id: doc.id });
        });

        setUsers(a)

        // console.log(users)

        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     console.log("No such document!");
        // }

    }

    return (
        <div className="bg-white w-full h-100">
            <div>Firebase</div>

            <button>Add data</button>

            <button onClick={getUsers} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Get users</button>


            {/* <button className="button" onClick={getUsers}>Get data</button> */}

            {
                users.map((user) => (<div>{user.name}</div>))
            }
        </div>);
}
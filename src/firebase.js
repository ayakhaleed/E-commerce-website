// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoS1HjilTaSGGxWgLvw2ROupSeAWLSGiY",
  authDomain: "prods-b3100.firebaseapp.com",
  projectId: "prods-b3100",
  storageBucket: "prods-b3100.appspot.com",
  messagingSenderId: "350566708620",
  appId: "1:350566708620:web:7c87bb527a5ad4978b12a9",
  measurementId: "G-W8T3JSQEGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);  
axios.post("https://prods-b3100-default-rtdb.firebaseio.com/users/users.json", {
  username: "ahmed",
  email: "ahmed@a.com",
  password: 12,
  cPassword: 12,
  role: "user",
}).then(res=>console.log("ارحم امى بقى")).catch(err=>console.log(err,"افهمنى بقى"))

export { database };


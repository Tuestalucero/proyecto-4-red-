// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js" 

import {getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js" //para CRUD

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIdu0-GhnTl7wIZf0m3Q1YAk2B5vqaJ6Y",
  authDomain: "adicional-aa82d.firebaseapp.com",
  projectId: "adicional-aa82d",
  storageBucket: "adicional-aa82d.appspot.com",
  messagingSenderId: "479383923210",
  appId: "1:479383923210:web:85b8749da0271581e24df3"
};
 // Initialize Firebase
export const app = initializeApp(firebaseConfig); //recordar export es para poder importar app en otros archivos
//console.log(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

//CRUD
export const db = getFirestore();
export const saveTask = (title, description, userMail) =>{
  addDoc(collection(db, "tasks"), { title, description, userMail})
}
export const getTasks = () => getDocs(collection(db, 'tasks')) //sirvio para recolectar todos los datos

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

//export const deleteTask = (id) => console.log(id);
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);

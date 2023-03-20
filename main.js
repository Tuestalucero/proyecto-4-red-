//import "./app/firebase.js";
//console.log("hello world")

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth, onGetTasks } from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";
//import { setupPosts } from "./app/postList.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/logout.js'
import './app/postList.js'

import {getFirestore, collection} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js" //para CRUD
import { saveTask, getTasks, deleteTask, getTask, updateTask} from "./app/firebase.js";

let editStatus = false;
let id = '';
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
   const correo = user.email;
   //console.log(correo)
  
    try {

      //Ingresa titulo, descripcion y usuario a firesetore:
      const taskForm = document.getElementById("task-form");
      taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = taskForm["task-title"];
        const description = taskForm["task-description"];
       
        
        if(editStatus){
            updateTask(id, {
              title: title.value,
              description: description.value,
              userMail: user.email
            });
            editStatus = false;
            id = "";
          taskForm["btn-task-form"].innerText = "Save";

        }else{
          saveTask(title.value, description.value, user.email);
        }   
        taskForm.reset()
      });


    } catch (error){
      console.log(error)
    }

    console.log(correo)
    
    const tasksContainer = document.getElementById("tasks-container");
    //
    onGetTasks((querySnapshot)=>{
    let html = '';   
    querySnapshot.forEach(doc => {
    //console.log(doc.data()); 
    const task = doc.data();   
    if (task.userMail == correo){
    html += `
          <li class="list-group-item list-group-item-action mt-2">
          <h5>${task.title}</h5>
          <p>${task.description}</p>
          <div>
           <button class="btn btn-primary btn-delete" data-id="${doc.id}">
           Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            Edit
          </button>
          </div>

          </li>
          `;
    }  
    });
    tasksContainer.innerHTML = html;
   
   //eliminar
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
    //console.log(btnsDelete); //se uso para probar
    btnsDelete.forEach(btn =>{
        btn.addEventListener('click', (event) =>{
          deleteTask(event.target.dataset.id)
        })

    })

    //editar:
    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach(btn =>{
      //console.log(btn)
      btn.addEventListener('click', async (event) =>{ 
       const doc = await getTask(event.target.dataset.id);
       const task = doc.data()
       const taskForm2 = document.getElementById("task-form");
       taskForm2['task-title'].value = task.title;
       taskForm2['task-description'].value = task.description; 
       editStatus = true;
       //console.log(editStatus);
       id = doc.id
       taskForm2['btn-task-form'].innerText = 'Update';
      })

    })  
});


  }else{
    const vacio = "";
    //setupPosts(vacio);
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = '<h3 class="text-white">Inicia sesion para ver tus publicaciones</h1>'
    loginCheck(user);
  }

});










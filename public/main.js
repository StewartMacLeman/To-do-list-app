"use strict";

// console.log("This is a test from main.js!");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
   let updatedText = prompt("Update the task!");
   // Using the axios CDN.
   axios.post("/update-task", {text: updatedText, id: e.target.getAttribute("data-id")}).then(() => {
     
   }).catch(() => {
     console.log("Please re-try later!");
   });
  }
});

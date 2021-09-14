"use strict";

document.addEventListener( "click", (e) => {
  // Deleting an item.
  if (e.target.classList.contains("delete")) {
    if (confirm("Do you want to delete this task?")) {
      axios.post("/delete-task", {id: e.target.getAttribute("data-id")} ).then(() => {
        e.target.parentElement.parentElement.remove();
      }).catch(() => {
        console.log("Please try again later!");
      });
    }
  }
  // Updating an item.
  if (e.target.classList.contains("edit")) {

      let userInput = prompt("Enter the amendments!", e.target.parentElement.previousElementSibling.textContent);

      if (userInput) {
        axios.post("/update-task", {text: userInput, id: e.target.getAttribute("data-id")} ).then(() => {
          e.target.parentElement.previousElementSibling.textContent = userInput;
        }).catch(() => {
          console.log("Please try again later!");
        });
      }
  }
});

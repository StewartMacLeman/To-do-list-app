"use strict";

document.addEventListener( "click", (e) => {
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

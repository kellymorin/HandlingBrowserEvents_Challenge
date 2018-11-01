/*
The learning objective for this challenge is to practice event listeners for click events. You will also practice adding elements to the DOM, and removing elements from the DOM with the removeChild() method. You will even need to use the split() method on a string.

Create an HTML page that contains a text area and a button labeled Create.

When the user enters in text into the text area and then clicks the create button, use a factory function that creates a new DOM component that has a border, and includes it's own delete button.

Insert that new component into the DOM.

When the user clicks the Delete button, the containing card, and no other cards, should then be removed from the DOM. Not just made invisible, actually removed from the DOM.

Pro tip: The card's id attribute, and the button's id attribute should share some common value. Then, when the button is clicked, find the corresponding parent DOM component. Remember the split() method on a string? That will be helpful.
*/

let elementFactory = (el, attributesObj, content, ...children) =>{
  let element = document.createElement(el);
  // Set attributes
  for(let attr in attributesObj){
    element.setAttribute(attr, attributesObj[attr]);
  }
  element.textContent = content || null
  children.forEach(child =>{
    element.appendChild(child);
  })
  return element;
}

let makeNewCard = (input , number) =>{
  let fragment = document.createDocumentFragment()
  let body = document.querySelector("body")
  let textDiv = elementFactory("div", {}, input)
  let button = elementFactory("button", {id: `delete--${number}`}, "Delete This Card")
  let buttonDiv = elementFactory("div", {}, null, button);
  let containerArticle = elementFactory("article", {id: `card--${number}`, class: "card"}, null, textDiv, buttonDiv)
  fragment.appendChild(containerArticle)
  body.appendChild(fragment)
  addDeleteButtonListener()
}

let number = 3
document.querySelector("#create--button").addEventListener("click", ()=>{
  number += 1;
  let input = document.querySelector("#create--input").value;
  makeNewCard(input, number);
})
let buttonDetails = ""
let cardDetails = ""

function addDeleteButtonListener (){
  let deleteButton = document.querySelectorAll("button")
  deleteButton.forEach((button)=>{
    button.addEventListener("click", (event)=>{
      let eventDetails = event.target.id.split("--")
      buttonDetails = eventDetails.shift()
      cardDetails = eventDetails.pop()
    if(buttonDetails === "delete"){
      let deletedSection = document.querySelector(`#card--${cardDetails}`)
      deletedSection.remove();
    }
    })
  })
}

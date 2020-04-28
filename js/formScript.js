const header1 = document.querySelector("#header1");
const allInputs = document.querySelectorAll("input");
const allLabels = document.querySelectorAll("label");
const nameInput = document.querySelector("#name");
const phoneNumberInput = document.querySelector("#phone-number");
const emailAddressInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subjects");
const timeDiv = document.querySelector("#time-div");
const locationDiv = document.querySelector("#location-div");
const submitButton = document.querySelector("#submitButton");
const textbox = document.querySelector("#textbox");

const nameRegex = /^[a-zA-Z][a-zA-Z ]+/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

let step = 0;
let name = "";

function nextStep() {
  event.preventDefault();
  if (step === 0 && nameRegex.test(nameInput.value)) {
    step = 1;
  }
  console.log(step);
  if ( step === 1 ) {
    step = 2;
    hide(nameInput);
    name = nameInput.value;
    header1.innerHTML = name + ", if you’re in a hurry we’ll just take a phone number and/or an email at this point,<br>but it would be nice if you could tell us what’s going on. (Just 4 more questions)";
    show(phoneNumberInput);
    show(emailAddressInput);
    showInline(submitButton);
  } else if ( (step === 2 && emailRegex.test(emailAddressInput.value)) || (step === 2 && phoneRegex.test(phoneNumberInput.value)) ) {
    step = 3;
    header1.innerHTML = "We can help you learn lots of different things!<br>What subject(s) would you like tutoring in?";
    hide(phoneNumberInput);
    hide(emailAddressInput);
    show(subjectInput);
 } else if ( step === 3 ) {
    step++;
    header1.innerHTML = "When are you available for tutoring?<br>(Please give us several options)";
    hide(subjectInput);
    for (let i=1; i<timeDiv.children.length; i++){
      showInline(timeDiv.children[i].children[0]);
      showInline(timeDiv.children[i].children[0].children[0]);
    }
  } else if ( step === 4 ) {
    step++;
    header1.innerHTML = "Are you interested in online or in person tutoring?<br>If in person, approximately where would you like your sessions to be located?";
    for (let i=1; i<timeDiv.children.length; i++){
      hide(timeDiv.children[i]);
    }
    for (let i=1; i<locationDiv.children.length; i++){
      if ( locationDiv.children[i].classList.contains("w-checkbox") ) {
        show(locationDiv.children[i]);
      }
    }
    showInline(document.querySelector("#in-person-tutoring"));
    showInline(document.querySelector("#online-tutoring"));
  } else if (step === 5) {
    step++;
    header1.innerHTML = "Leave us anything else you’d like to tell us.<br>We’re listening to you?";
    for (let i=1; i<locationDiv.children.length; i++){
      hide(locationDiv.children[i]);
    }
    show(textbox);
  } else if (step === 6) {
    step++;
    header1.innerHTML = "Great!<br>Does all this look correct to you?";
    hide(button);
    hide(textbox);
    for (let i=0; i<allInputs.length; i++){
      if (allInputs[i].classList.contains("time-input") !== true && allInputs[i].disabled === false){
        allInputs[i].style.display = "block";
      }
    }
    for (let i=1; i<timeDiv.children.length; i++){
      console.log(i);
      timeDiv.children[i].style.display = "inline-block";
    }
    for (let i=0; i<document.querySelectorAll("label").length; i++){
      document.querySelectorAll("label")[i].style.display = "block";
    }
    show(submitButton);
  }
}

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

function showInline(element) {
  element.style.display = "inline-block";
}

function confirm() {
	hide(header1);
}

for (let i=0; i<allInputs.length; i++){
  allInputs[i].style.display = "none";
}
for (let i=0; i<document.querySelectorAll("label").length; i++){
  document.querySelectorAll("label")[i].style.display = "none";
}
header1.innerHTML = "Thanks for reaching out to us. <br> What's your name?"
show(header1);
show(nameInput);
locationDiv.children[3].disabled = true;
document.querySelector("form").appendChild(document.createElement("button"));
const button = document.querySelector("button");
button.setAttribute("type", "button");
button.classList.add("submit-button");
button.classList.add("w-button");
document.querySelector("button").textContent = "Next";

locationDiv.children[2].addEventListener("click", () => {

  if (locationDiv.children[2].children[0].checked){
    show(locationDiv.children[3]);
    locationDiv.children[3].disabled = false;
  } else {
    hide(locationDiv.children[3]);
    locationDiv.children[3].disabled = true;
    locationDiv.children[3].value = "";
  }

});

button.addEventListener("click", () => { nextStep() });
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      event.preventDefault();
      nextStep();
    }
});

for (let i=1; i<timeDiv.children.length; i++){
  timeDiv.children[i].children[0].children[0].addEventListener("click", () => {
    if(event.target.checked === true) {
      show(event.target.parentElement.parentElement.lastElementChild);
      event.target.parentElement.parentElement.lastElementChild.disable = false;
    } else {
      event.target.parentElement.parentElement.lastElementChild.value = "";
      hide(event.target.parentElement.parentElement.lastElementChild);
      event.target.parentElement.parentElement.lastElementChild.disable = true;
    }
  });
}

submitButton.addEventListener("click", () => {

  if ((nameRegex.test(nameInput.value) && emailRegex.test(emailAddressInput.value)) || (nameRegex.test(nameInput.value) && phoneRegex.test(phoneNumberInput.value))) {
    confirm();
  } else {
    event.preventDefault();
  }

});

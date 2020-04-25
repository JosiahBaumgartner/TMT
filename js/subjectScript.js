const header = document.getElementById("subjectHeader");
const list = document.getElementById("subjectList");
const grid = document.getElementById("subjectGrid");
const subjects = ["Math", "Sciences", "English", "Standardized Tests"]
const math = {subjectName: "Math", subjectTypes: ["5th Grade Math","6th Grade Math","7th Grade Math","8th Grade Math","Pre-Algebra","Algebra 1", "Geometry", "Algebra 2", "Trigonometry", "Precalculus", "Calculus", "AP Calculus AB", "AP Calculus BC", "IB Math SL", "IB Math HL"]};
const sciences = {subjectName: "Sciences", subjectTypes: ["General Science","Physics","Chemistry","Honor Physics","Honor Chemistry","AP Physics 1", "AP Physics 2", "AP Physics C Mechanics", "AP Physics C E&M", "IB Physics SL", "IB Physics HL", "AP Chemistry", "IB Chemistry SL", "IB Chemistry HL"]};
const english = {subjectName: "English", subjectTypes: ["Critical Reading","Writing","ESL","College Application Essays","AP English Literature and Composition","IB Literature"]};
const standardizedtests = {subjectName: "Standardized Tests", subjectTypes: ["PSAT","ACT","SAT","SAT Subject Math 1","SAT Subject Math 2","SAT Subject Chemistry", "SAT Subject Physics", "SAT Essay Writing"]};

function swapHeader(subject){

header.textContent = subject;

}

function clearList(){
  list.innerHTML="";
}

function appendBackButton(){
  list.appendChild(document.createElement("li"));
  list.lastElementChild.innerHTML = "Back to Subjects";
}

function swapList(subject, nested){
  if(header ==! "Subjects Taught"){
    clearList();
  } else {
    clearList(true);
  }
  for (i = 0; i < subject.length; i++) {
    list.appendChild(document.createElement("li"));
    list.lastElementChild.innerHTML = subject[i];
  }

}

grid.addEventListener("click", function() {

  if (event.target.textContent === "Math"){
    swapHeader(event.target.textContent);
    swapList(math.subjectTypes);
    appendBackButton();
  } else if (event.target.textContent === "Sciences") {
    swapHeader(event.target.textContent);
    swapList(sciences.subjectTypes);
    appendBackButton();
  } else if (event.target.textContent === "English") {
    swapHeader(event.target.textContent);
    swapList(english.subjectTypes);
    appendBackButton();
  } else if (event.target.textContent === "Standardized Tests") {
    swapHeader(event.target.textContent);
    swapList(standardizedtests.subjectTypes);
    appendBackButton();
  } else if (event.target.textContent === "Back to Subjects") {
    swapHeader("Subjects Taught");
    swapList(subjects);
  }

});

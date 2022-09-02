// Js code goes here
let fetchBtn = document.getElementById("start-button");
document.getElementById("loader-view").style.display = "none"
document.getElementById("quiz").style.display = "none";
let submitBtn = document.getElementById("submit-button")
submitBtn.setAttribute("disabled", "true")
fetchBtn.addEventListener("click", buttoneventlistener)
let flag = true;
function optionEventListerner(e) {
  let submitBtn = document.getElementById("submit-button")
  if(flag == true){
   flag = false 
   submitBtn.disabled = false 
  }
  let children = document.getElementById("options-container").children
  for (child of children) {
    child.classList.remove('user-answer')
  }
  
  e.target.classList.add('user-answer')
}
var completeloadGlobal;

async function buttoneventlistener() {

  document.getElementById("start-button").style.display = "none"
  document.getElementById("pre-quiz-instructions").style.display = "none";
  document.getElementById("loader-view").style.display = "block"

  let questionid = document.getElementById('current-question-id').value
  let completeload = await fetch(`https://jsonmock.hackerrank.com/api/questions/${questionid}`)

  completeload = await completeload.json()
  completeloadGlobal = JSON.parse(JSON.stringify(completeload));
  if(!!completeloadGlobal){
    optionsCreator(questionid)
  }
} 
function optionsCreator(questionid){
  document.getElementById("loader-view").style.display = "none"
  if(questionid == 5){
    document.getElementById("question").innerHTML = "What is the correct JavaScript syntax to change the content of the HTML element below?\n\n" + "&#60;p id=\"demo\"&#62;This is a demonstration.&#60;/p&#62";
  } else{
    document.getElementById('question').innerText = completeloadGlobal.data.question;
  }
  let optionsContainer = document.getElementById("options-container")
  let options = completeloadGlobal.data.options
  options.map((option) => {
    let optionHtml = document.createElement("div")
    optionHtml.addEventListener("click", optionEventListerner)
    optionHtml.innerText = option
    optionsContainer.appendChild(optionHtml)
  })
  document.getElementById("quiz").style.display = "block";
}
document.getElementById("submit-button").addEventListener("click", submitListener)
function submitListener() {
  let i = -1
  let flag=0;
  let children = document.getElementById("options-container").children
  for (child of children) {
    i += 1

    if (completeloadGlobal.data.answer == i) {
      child.classList.add("correct-answer")
      
    }
    if(child.classList.contains("user-answer")){
      if(completeloadGlobal.data.answer != i){
        child.classList.add("wrong-answer")
      }
    }
    
  }
  
  document.getElementById("submit-button").disabled = true;
 }
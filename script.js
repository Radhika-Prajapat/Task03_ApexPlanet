async function getJoke(){
document.getElementById("jokeBox").style.display = "block";


let response = await fetch("https://official-joke-api.appspot.com/random_joke");

let data = await response.json();

document.getElementById("joke").innerHTML = data.setup + "<br><br>" + data.punchline;

}

let questions = [];
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let submitBtn = document.getElementById("submitBtn");
let current = 0;
let userAnswers = [];
if(document.getElementById("question")){
    loadQuiz();
}



async function loadQuiz(){

let response = await fetch(
"https://opentdb.com/api.php?amount=10&category=18&type=multiple"
);

let data = await response.json();

questions = data.results;

showQuestion();
}


function showQuestion(){

let q = questions[current];

document.getElementById("question")
.innerHTML =
(current+1)+". " + q.question;

let options = [
...q.incorrect_answers,
q.correct_answer
];

options.sort(()=>Math.random()-0.5);

let html = "";

options.forEach((option,index)=>{

html += `

<label>

<input
type="radio"
name="option"
value="${option}"

${userAnswers[current]==option ?
"checked" : ""}

>

${option}

</label>

<br><br>

`;

});

document.getElementById("options")
.innerHTML = html;


prevBtn.style.display =
current==0 ?
"none":"inline-block";


nextBtn.style.display =
current==9 ?
"none":"inline-block";


submitBtn.style.display =
current==9 ?
"inline-block":"none";

}

if(nextBtn){

nextBtn.onclick = ()=>{

let selected =
document.querySelector(
'input[name="option"]:checked'
);

if(selected)
{
userAnswers[current] =
selected.value;
}

current++;

showQuestion();

};

}
if(prevBtn){
    prevBtn.onclick = ()=>{
        let selected =
document.querySelector(
'input[name="option"]:checked'
);

if(selected)
{
userAnswers[current] =
selected.value;
}

current--;

showQuestion();
    };
}
if(submitBtn){
    submitBtn.onclick = ()=>{

let selected =
document.querySelector(
'input[name="option"]:checked'
);

if(selected)
{
userAnswers[current] =
selected.value;
}

let score = 0;

questions.forEach((q,index)=>{

if(
userAnswers[index]
=== q.correct_answer
)
{
score++;
}

});

let msg = "";

if(score>=8)
msg =
"Excellent!";

else if(score>=5)
msg =
"Good Job!";

else
msg =
"Keep Practicing!";


document.getElementById("result")
.innerHTML =

`
Your Score:
${score}/10

<br><br>

${msg}
`;

}
}






function validateForm(){

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let message =
document.getElementById("message").value;

if(name=="" || email=="" || message=="")
{
    alert("Please fill all fields");
    return false;
}

document.getElementById("successMsg").innerHTML="Form Submitted Successfully";

return false;
}

let images=[
"https://picsum.photos/900/400?1",
"https://picsum.photos/900/400?2",
"https://picsum.photos/900/400?3"
];

let i=0;

setInterval(()=>{

i++;

if(i>=images.length)
{
i=0;
}

let slide =
document.getElementById("slide");

if(slide)
slide.src=images[i];

},3000);




function darkMode(){

    document.body.classList.toggle("dark");

    let btn =
    document.getElementById("modeBtn");

    if(document.body.classList.contains("dark"))
    {
        localStorage.setItem(
            "theme",
            "dark"
        );

        btn.innerHTML =
        "Light Mode";
    }
    else
    {
        localStorage.setItem(
            "theme",
            "light"
        );

        btn.innerHTML =
        "Dark Mode";
    }
}



window.onload = function(){

    let theme =
    localStorage.getItem("theme");

    let btn =
    document.getElementById("modeBtn");

    if(theme === "dark")
    {
        document.body.classList.add("dark");

        if(btn){
            btn.innerHTML =
            "Light Mode";
        }
    }
    else
    {
        document.body.classList.remove("dark");

        if(btn){
            btn.innerHTML =
            "Dark Mode";
        }
    }
}
index = 0
maxValue = 0
playerValue= 0
var data;
var res;
var bg = document.body;
var side_pictures = document.querySelectorAll(".sidePic");
var finHeader = document.getElementById("finHeader");
var finPara = document.getElementById("finPara");
var finImg = document.getElementById("finImg");
var radio = document.getElementById("radio");
var header = document.getElementById("qh");
var button = document.getElementById("FinishButton");
var finish = document.getElementById("finish");
var dark = document.getElementById("dark");


async function init() {
    const response = await fetch('./questions.json');
    data = await response.json();
    console.log("Adat betöltve:", data, "\nHossz:", data.questions.length);
    const res_response = await fetch('./results.json');
    res = await res_response.json();
    console.log(res);
    showQuestions();
    maxValue = data.questions.length * 5;
}

const buttonPush = () =>{

    if(index < data.questions.length){
        var selected = document.querySelector('input[name="choice"]:checked');
        playerValue += parseInt(selected.value);
    }

    if(index == data.questions.length -1){
        CalcRes()

    } else {
        index++;
        showQuestions();
    }
}


function randomiseImage(){
    randNum = Math.floor(Math.random() * 14) + 1;
    side_pictures.forEach(pic=>{
    pic.src = "gifs/" + randNum + ".gif"
    })
}

function randomisedBG(){
    var bgVar = Math.floor(Math.random() * 14) + 1;
    newUrl = 'url("bgs/' + bgVar + '.png")';
    bg.style.setProperty('background-image', newUrl);
}

function showQuestions(){
    randomiseImage();
    randomisedBG();
    radio.innerHTML = "";
    header.innerText = data.questions[index].title;
    data.questions[index].choices.forEach(choice => {
        var input = document.createElement("input");
        var breakLine = document.createElement("br");
        input.type = "radio";
        input.name = "choice";
        input.value = choice.value;
        radio.appendChild(input);
        var text = document.createTextNode(choice.text);
        radio.appendChild(text);
        radio.appendChild(breakLine);
        
    })
}

function CalcRes(){
    button.style.display = "none";
    dark.style.display = "block";
    finish.style.display = "flex";
    playerPercent = (playerValue / maxValue)*100
    console.log("Player percent:", playerPercent)

if (playerPercent < 10) {
    setEndPalette(0);
} else if (playerPercent >= 10 && playerPercent < 20) {
    setEndPalette(1);
} else if (playerPercent >= 20 && playerPercent < 30) {
    setEndPalette(2);
} else if (playerPercent >= 30 && playerPercent < 40) {
    setEndPalette(3);
} else if (playerPercent >= 40 && playerPercent < 50) {
    setEndPalette(4);
} else if (playerPercent >= 50 && playerPercent < 60) {
    setEndPalette(5);
} else if (playerPercent >= 60 && playerPercent < 70) {
    setEndPalette(6);
} else if (playerPercent >= 70 && playerPercent < 80) {
    setEndPalette(7);
} else if (playerPercent >= 80 && playerPercent < 90) {
    setEndPalette(8);
} else if (playerPercent >= 90) {
    setEndPalette(9);
}
}

function setEndPalette(number){
    finHeader.innerText = res.res[number].Title;
    finPara.innerText = res.res[number].Value;
    finImg.src = "gyroses/"+res.res[number].img_num + ".png";
    

}

const restart = () =>{
    index = 0;
    playerValue = 0;
    showQuestions();
    button.style.display = "block";
    dark.style.display = "none";
    finish.style.display = "none";
}

init();

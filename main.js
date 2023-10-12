let words = [
    "Hello",
    "Programming",
    "Code",
    "JavaScript",
    "Count",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "GitHub",
    "LeetCode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
    "Mohamed",
    "Ahmed",
    "Basyouni",
    "Ramadan",
    "Dawood",
];

const lvls = {
    Easy: 7,
    Normal: 5,
    Hard: 3,
};

//default
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

let startButton = document.querySelector(".start");
let message = document.querySelector(".message");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWord = document.querySelector(".upcoming-word");
let input = document.querySelector("input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

startButton.onclick = function() {
    this.remove();
    input.focus();
    genWord();
};

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

input.onpaste = function() {
    return false;
};

function genWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;
    upcomingWord.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWord.appendChild(div);
    }
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML == "0") {
            clearInterval(start);
            if (theWord.innerHTML.toLocaleLowerCase() === input.value.toLowerCase()) {
                scoreGot.innerHTML++;
                input.value = "";
                if (words.length > 0) {
                    genWord();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("Congratulations");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    upcomingWord.remove();
                    theWord.remove();
                    input.remove();
                    message.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                setTimeout(function() {
                    location.reload();
                }, 1000);
                input.value = "";
            }
        }
    }, 1000);
}
var button = document.getElementById("button");
var news = document.getElementById("news");
var number = document.getElementById("input");
var frame = document.getElementById("frame");
button.addEventListener("click", check_button);
var findMe;
var i = 0;

function check_button() {
    if (!number.disabled) {
        old_game();
    } else {
        new_game();
    }
}

function new_game() {
    number.disabled = false;
    number.value = 1;
    news.innerText = "---";
    news.style.color = "white";
    news.style.fontWeight = "normal";
    findMe = Math.floor(10 * Math.random()) + 1;
    button.innerText = "Check";
    i = 0;
}

function old_game() {
    i++;
    var number = document.getElementById("input");
    if (number.value === "") {
        news.innerText = "Please select a number";
        news.style.color = "red";
        return;
    }

    if (number.value != findMe) {
        log(number, findMe);
        if (i === 1) {
            var nr = number.value;
            const box = document.createElement("div");
            frame.appendChild(box);
            box.classList.add("answers");
            box.setAttribute("style", "max-height: 9999px;");
            box.setAttribute("style", "transition: opacity 2s, max-height 15s;");
            box.classList.add("faded-out", "height-out");
            box.setAttribute("id", "answers");
            const p = document.createElement("p");
            p.innerText = "Answers";
            box.appendChild(p);
            const ul = document.createElement("ul");
            box.appendChild(ul);
            ul.id = "ul";
            const li = document.createElement("li");
            li.innerText = "Round 1: " + number.value;
            ul.appendChild(li);

            requestAnimationFrame(() => {
                box.classList.remove("height-out");
            });

            var interval = setInterval(() => { fadedOut() }, 16);

            function fadedOut() {
                if (box.clientHeight >= 115) {
                    clearInterval(interval);
                    box.classList.remove("faded-out");
                }
            }
            var number = document.getElementById("input");
            number.value = nr;

        } else {
            var table = document.getElementById("ul");
            const li = document.createElement("li");
            li.innerText = "Round " + i + ": " + number.value;
            li.classList.add("faded-out");
            table.appendChild(li);
            requestAnimationFrame(() => {
                li.classList.remove("faded-out");
            });
        }
    } else {
        log_win(i);
    }
}

function log(number, findMe) {
    if (number.value < findMe) {
        news.innerText = "The number you are looking for is greater than the number specified";
    } else {
        news.innerText = "The number you are looking for is less than the number specified";
    }
    news.style.color = "white";
}

function log_win(i) {
    news.innerHTML = "Congratulations you guessed the number!!! <br>(number of moves: " + i + ")";
    button.innerText = "Once again";
    news.style.fontWeight = "bold";
    news.style.color = "rgb(104, 255, 3)";
    try {
        var answers = document.getElementById("answers");
        answers.setAttribute("style", "max-height: " + answers.clientHeight + "px");
        answers.setAttribute("style", "transition: opacity 1s ease-in, max-height " + answers.clientHeight / 200 + "s ease-out;");

        requestAnimationFrame(() => {
            answers.classList.add("faded-out");
        });

        setTimeout(() => {
            answers.parentNode.removeChild(answers, true);
        }, answers.clientHeight / 0.2)

        answers.classList.add("height-out");

    } catch (TypeError) {}
    number.disabled = true;
    i = 0;
}
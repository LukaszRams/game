var button = document.getElementById("button");
var news = document.getElementById("news");
var number = document.getElementById("input");
var frame = document.getElementById("frame");
button.addEventListener("click", check_button);
var findMe;
var i = 0;


function check_button() {
    if (button.innerText == "Sprawdź") {
        old_game();
    } else {
        new_game();
    }
}

function new_game() {
    number.disabled = false;
    number.value = 1;
    news.innerText = "---";
    findMe = Math.floor(10 * Math.random()) + 1;
    button.innerText = "Sprawdź";
    i = 0;
}

function old_game() {
    i++;
    var number = document.getElementById("input");
    if (number.value === "") {
        news.innerText = "Proszę wybrać liczbę";
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
            box.setAttribute("style", "transition: opacity 4s, max-height 30s;");
            box.classList.add("faded-out");
            box.setAttribute("id", "answers");
            const p = document.createElement("p");
            p.innerText = "Odpowiedzi";
            box.appendChild(p);
            const ul = document.createElement("ul");
            box.appendChild(ul);
            ul.id = "ul";
            const li = document.createElement("li");
            li.innerText = "Runda 1: " + number.value;
            ul.appendChild(li);
            requestAnimationFrame(() => {
                box.classList.remove("faded-out");
            });
            var number = document.getElementById("input");
            number.value = nr;
        } else {
            var table = document.getElementById("ul");
            const li = document.createElement("li");
            li.innerText = "Runda " + i + ": " + number.value;
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
        news.innerText = "Szukana liczba jest większa od podanej";
    } else {
        news.innerText = "Szukana liczba jest mniejsza od podanej";
    }
    news.style.color = "white";
}

function log_win(i) {
    news.innerHTML = "Brawo !!! Wygrałeś za " + i + " razem &#128512";
    button.innerText = "Jeszcze raz";
    news.style.fontWeight = "bold";
    try {
        var answers = document.getElementById("answers");
        answers.setAttribute("style", "max-height: " + answers.clientHeight + "px");
        answers.setAttribute("style", "transition: opacity 1.2s, max-height 1.5s;");
        requestAnimationFrame(() => {
            answers.classList.add("faded-out");
        });
        setTimeout(function() {
            answers.remove();
        }, 4500)
    } catch (TypeError) {}
    number.disabled = true;
    i = 0;
}
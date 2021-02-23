(function () {

    //LETTERS//
    var letterArr = [
        {
            letter: 'A',
            points: 1,
            inStock: 9,
            isVowel: "yes"
    },
        {
            letter: 'B',
            points: 3,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'C',
            points: 3,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'D',
            points: 2,
            inStock: 4,
            isVowel: "no"
    },
        {
            letter: 'E',
            points: 1,
            inStock: 12,
            isVowel: "yes"
    },
        {
            letter: 'F',
            points: 4,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'G',
            points: 2,
            inStock: 3,
            isVowel: "no"
    },
        {
            letter: 'H',
            points: 4,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'I',
            points: 1,
            inStock: 9,
            isVowel: "yes"
    },
        {
            letter: 'J',
            points: 8,
            inStock: 1,
            isVowel: "no"
    },
        {
            letter: 'K',
            points: 5,
            inStock: 1,
            isVowel: "no"
    },
        {
            letter: 'L',
            points: 1,
            inStock: 4,
            isVowel: "no"
    },
        {
            letter: 'M',
            points: 3,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'N',
            points: 1,
            inStock: 6,
            isVowel: "no"
    },
        {
            letter: 'O',
            points: 1,
            inStock: 8,
            isVowel: "yes"
    },
        {
            letter: 'P',
            points: 3,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'Q',
            points: 10,
            inStock: 1,
            isVowel: "no"
    },
        {
            letter: 'R',
            points: 1,
            inStock: 6,
            isVowel: "no"
    },
        {
            letter: 'S',
            points: 1,
            inStock: 4,
            isVowel: "no"
    },
        {
            letter: 'T',
            points: 1,
            inStock: 6,
            isVowel: "no"
    },
        {
            letter: 'U',
            points: 1,
            inStock: 4,
            isVowel: "yes"
    },
        {
            letter: 'V',
            points: 4,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'W',
            points: 4,
            inStock: 2,
            isVowel: "no"
    },
        {
            letter: 'X',
            points: 8,
            inStock: 1,
            isVowel: "no"
    },
        {
            letter: 'Y',
            points: 4,
            inStock: 2,
            isVowel: "yes"
    },
        {
            letter: 'Z',
            points: 10,
            inStock: 1,
            isVowel: "no"
    },
]

    const LETTERSNUM = 7;
    var table, td;
    var tdArr = [];
    var shuffleBtn = document.getElementById("shuffle-btn");
    shuffleBtn.addEventListener("click", createLetters);
    var submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", getWord);
    var newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.addEventListener("click", restartGame);
    var gameRules = document.getElementById("game-rules-cloud");
    gameRules.addEventListener("click", showHideRules);
    var randomLetters = [];
    var selectedLetter = "";
    var timerCounter = 0;
    var lettersOnBoardArr = [];
    var currentWord = [];
    var currentScoreArr = [];
    var currentScore = 0;
    var dataArr = [];
    var gameTime = document.querySelector("time");
    var seconds = 0,
        minutes = 0,
        hours = 0;
    var time;
    var totalScore = document.getElementById("total-score");
    var randomAlerts = ["Never heard of such a word..", "Are you making up new words?", "Dude, you cannot fool a computer.."];
    var myRequest = new Request("https://gist.githubusercontent.com/jesseditson/1e6b2b524814320515ccfe7e2f856eda/raw/17d61fa1e80e14b13c4525b09f84148772586b59/words.json");

    //connect json file with words 
    fetch(myRequest)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.words.length; i++) {
                dataArr.push(data.words[i]);
            }
            return dataArr;
        })

    //create game board
    function createTable() {
        var tilesContainer = document.getElementById("letter-holder");
        var left = document.getElementById("left");
        table = document.createElement("table");
        table.setAttribute("class", "table");
        var tbody = document.createElement("tbody");
        for (var i = 0; i < 11; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < 11; j++) {
                td = document.createElement("td");
                td.setAttribute("class", "td");
                tr.appendChild(td);
                tdArr.push(td);
                if (i === 5 && j === 5) {
                    td.classList.add("brain-icon");
                }
                if (i == j || i == 0 && j == 10 || i == 1 && j == 9 || i == 2 && j == 8 || i == 3 && j == 7 || i == 4 && j == 6 || i == 6 && j == 4 || i == 7 && j == 3 || i == 8 && j == 2 || i == 9 && j == 1 || i == 10 && j == 0) {
                    td.classList.add("tile-colors");
                }
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        left.insertBefore(table, tilesContainer);
        table.addEventListener("click", function (e) {
            if (e.target.textContent != "") {
                lettersOnBoardArr.push(e.target.textContent);
            }
        })
    }
    createTable();

    //generate 7 random letters
    function createLetters() {
        var letterHolder = document.getElementById("letter-holder");
        letterHolder.innerHTML = "";
        var ul = document.createElement("ul");
        ul.classList.add("letters");
        for (i = 0; i < LETTERSNUM; i++) {
            var letter = document.createElement("li");
            var randomNum = Math.floor(Math.random() * 26);
            letter.innerHTML = letterArr[randomNum].letter + "<sub>" + letterArr[randomNum].points + "</sub>";
            letter.classList.add("letter");
            letter.setAttribute("id", letterArr[randomNum].letter);
            ul.appendChild(letter);
            letterHolder.appendChild(ul);
            randomLetters.push(letter);
        }

        if (timerCounter === 0) {
            timerStart();
            timerCounter++;
        }

        getLettersOnBoard();
    }

    function getLettersOnBoard() {
        randomLetters.forEach(function (randomLetter) {
            randomLetter.addEventListener("click", function () {
                if (randomLetter.classList.contains("selected")) {
                    randomLetter.classList.remove("selected");
                    selectedLetter = "";
                } else {
                    randomLetter.classList.add("selected");
                    selectedLetter = randomLetter;
                }
            })
        })
    }

    table.addEventListener("click", function (e) {
        selectedLetterOnBoard(e, selectedLetter);
        lettersOnBoardArr.push(selectedLetter.textContent);
        selectedLetter = "";
    });

    function selectedLetterOnBoard(e, letter) {
        if (letter != "") {
            e.target.classList.remove("brain-icon");
            e.target.classList.add("letter-on-board");
            e.target.innerHTML = letter.innerHTML;
            letter.style.display = "none";
            table.removeEventListener("click", selectedLetterOnBoard);
        }
    }

    //takes word from the board after submit button was clicked and checks if submitted word is correct
    function getWord() {
        lettersOnBoardArr = lettersOnBoardArr.filter(function (x) {
            return x !== undefined;
        });

        lettersOnBoardArr.forEach(function (item) {
            currentWord.push(item.slice(0, 1));
            currentScoreArr.push(item.slice(1, 3));
        })
        var currentWordJoined = currentWord.join('').toLowerCase();
        if (dataArr.includes(currentWordJoined)) {
            currentScore += currentScoreArr.reduce((a, b) => Number(a) + Number(b), 0);
        } else {
            var randomNum = Math.floor(Math.random() * 3);
            swal(currentWordJoined.toUpperCase() + "?", randomAlerts[randomNum]);
        } 
        totalScore.innerHTML = `SCORE: <br> ${currentScore}`;
        currentScoreArr = [];
        lettersOnBoardArr = [];
        currentWord = [];
    }

    //timer
    function addTime() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        gameTime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timerStart();
    }

    function timerStart() {
        time = setTimeout(addTime, 1000);
    }

    function restartGame() {
        location.reload();
    }

    function showHideRules() {
        var gameRules = document.getElementById("game-rules-to-hide");
        var main = document.querySelector("main");
        if (gameRules.style.display === "none") {
            gameRules.style.display = "block";
        } else {
            gameRules.style.display = "none";
        }
    }

})();

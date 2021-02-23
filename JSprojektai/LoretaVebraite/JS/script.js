(function () {

    var numberOfQuestions = 10; //klausimu skaicius zaidime

    var numberOfAnswers = 3; //galimu atsakymu skaicius zaidime

    var topic; // zaidimo tema

    var allQuestions; //bus priskiriama priklausomai nuo pasirinktos zaidimo temos

    var randomQuestionNumbers; //random skaiciu masyvas klausimu ismaisymui

    var playerAnswers = new Array(); //zaidejo atsakymu masyvas

    var rightAnswers = new Array(); //teisingu atsakymu masyvas

    var indexOfRandomNumber = 0;

    var answerA = document.getElementById("answerA");

    var answerB = document.getElementById("answerB");

    var answerC = document.getElementById("answerC");

    var startPage = document.getElementById("start-page");

    var questionsSection = document.getElementById("questions");

    var questionText = document.getElementById("question");

    var countedAnswers = document.getElementById("counted-answers");

    var variousQuestions = document.getElementById("various-questions");

    var citiesQuestions = document.getElementById("cities-questions");

    var cityImage = document.getElementById("city-image");

    var pointsPhoto = document.getElementById("right-answers-image");

    var copyright = document.querySelector("footer");

    var header = document.querySelector("header");

    //zaidimui priskiriama tema, pagal kuria generuojami klausimai
    variousQuestions.onclick = function () {
        topic = "various";
    }

    citiesQuestions.onclick = function () {
        topic = "cities";
    }

    //klausimo ir atsakymu pavyzdzio parodymas
    $("a").click(function () {
        $("#question-example").toggleClass("d-none");
    });

    //tekstiniu klausimu zaidimo pradzia
    variousQuestions.addEventListener("click", function () {
        startAndGiveFirstQuestion(questions);
    });

    //vaizdo klausimu zaidimo pradzia
    citiesQuestions.addEventListener("click", function () {
        startAndGiveFirstQuestion(cities);
    });

    //zaidimu eiga
    answerA.addEventListener("click", function () {
        gameProgressAndEnd("answerA");
    });

    answerB.addEventListener("click", function () {
        gameProgressAndEnd("answerB");
    });

    answerC.addEventListener("click", function () {
        gameProgressAndEnd("answerC");
    });

    //zaidejui pasirinkus zaisti dar karta, nukreipia i pradini puslapi su temu pasirinkimais
    document.getElementById("another-game").addEventListener("click", anotherGame);

    //pradeda zaidima ir sugeneruoja 1 klausima is pasirinktos temos
    function startAndGiveFirstQuestion(fileOfJSON) {
        allQuestions = JSON.parse(fileOfJSON); //pasiima JSON duomenis
        randomQuestionNumbers = randomUniqueNumbers(numberOfQuestions, allQuestions.length); //unikaliu skaiciu masyvas (is JSON faile esanciu elementu numeriu) zaidejo klausimams (rodomas klausimu skaicius yra statinis kintamasis)
        startGame();
        giveQuestionWithAnswers();
    }

    //paspaudus pradeti zaidima, paslepia pasirinkimu langa ir atidaro klausimu skilti
    function startGame() {
        header.classList.add("d-none");
        startPage.classList.add("d-none");
        copyright.classList.add("d-none");
        questionsSection.classList.remove("d-none");
    }

    //zaidimo eiga - kai zaidejas pasirenka atsakyma, deaktyvuojami visi atsakymu mygtukai, parodomas teisingas, neteisingas atsakymai ir po 5 sekundziu pereinama prie kito klausimo
    function gameProgressAndEnd(option) {
        answerButtonsDisabled();
        playerAnswer(option);
        showRightAnswer(option);
        setTimeout(giveQuestionWithAnswers, 5000);
    }

    //generuoja klausimus pagal tema, kai klausimu nebelieka, parodo teisingu atsakymu skaiciu
    function giveQuestionWithAnswers() {
        if (indexOfRandomNumber === randomQuestionNumbers.length) {
            endGameAndShowCountOfRightAnswers();
        } else {
            answerButtonsEnabled();
            restoreButtonColorBeforeAnotherQuestion();
            if (topic === "various") {
                generateTextQuestion();
            } else {
                generateImageQuestion();
            }
            indexOfRandomNumber++;
        }
    }

    //sugeneruoja tekstini klausima, klausimo indeksas - is random skaiciu masyvo
    function generateTextQuestion() {
        var indexOfQuestion = randomQuestionNumbers[indexOfRandomNumber];
        questionText.textContent = allQuestions[indexOfQuestion].question;
        answersPattern(indexOfQuestion);
        showQuestionNumberToPlayer();
    }

    //sugeneruoja vaizdo klausima
    function generateImageQuestion() {
        var indexOfQuestion = randomQuestionNumbers[indexOfRandomNumber];
        cityImage.setAttribute("src", allQuestions[indexOfQuestion].question);
        answersPattern(indexOfQuestion);
        showQuestionNumberToPlayer();
    }

    //galimu atsakymu generavimo sablonas(atsakymai parenkami random), taip pat teisingas atsakymas irasomas i masyva 
    function answersPattern(index) {
        var answerIndex = randomUniqueNumbers(numberOfAnswers, numberOfAnswers);
        answerA.textContent = allQuestions[index].answers[answerIndex[0]];
        answerB.textContent = allQuestions[index].answers[answerIndex[1]];
        answerC.textContent = allQuestions[index].answers[answerIndex[2]];
        rightAnswers.push(allQuestions[index].right_answer);
    }

    //po atsakymu mygtukais rodo kuris klausimas dabar sprendziamas
    function showQuestionNumberToPlayer() {
        document.getElementById("question-number").textContent = indexOfRandomNumber + 1 + "/" + numberOfQuestions;
    }

    //uzdaro klausimu skilti ir parodo teisingu zaidejo atsakymu skaiciu bei foto, kuri priklauso nuo surinktu tasku
    function endGameAndShowCountOfRightAnswers() {
        let countOfAnswers = countPlayerRightAnswers();
        let rightAnswersPercent = countOfAnswers / numberOfQuestions * 100;
        questionsSection.classList.add("d-none");
        countedAnswers.classList.remove("d-none");
        document.getElementById("right-answers-count").textContent = "Teisingi atsakymai: " + countOfAnswers + " iš " + numberOfQuestions;
        if (rightAnswersPercent <= 50) {
            pointsPhoto.setAttribute("src", "IMG/Grade/training.png");
        } else if (rightAnswersPercent > 50 && rightAnswersPercent <= 90) {
            pointsPhoto.setAttribute("src", "IMG/Grade/well_done.jpg");
        } else {
            pointsPhoto.setAttribute("src", "IMG/Grade/excellent.jpg");
        }
    }

    //atstato atsakymu mygtuku spalva i default
    function restoreButtonColorBeforeAnotherQuestion() {
        answerA.classList.remove("red", "green");
        answerB.classList.remove("red", "green");
        answerC.classList.remove("red", "green");
        answerA.classList.add("blue");
        answerB.classList.add("blue");
        answerC.classList.add("blue");
    }

    //iraso zaidejo pasirinkta atsakyma i masyva 
    function playerAnswer(option) {
        playerAnswers.push(document.getElementById(option).textContent);
    }

    //parodo teisinga atsakyma, kai zaidejas papaudzia atsakymo mygtuka
    function showRightAnswer(option) {
        if (playerAnswers[indexOfRandomNumber - 1] === rightAnswers[indexOfRandomNumber - 1]) {
            document.getElementById(option).classList.remove("blue");
            document.getElementById(option).classList.add("green");
        } else {
            document.getElementById(option).classList.remove("blue");
            document.getElementById(option).classList.add("red");
            document.getElementById(findAnswerButtonId()).classList.remove("blue");
            document.getElementById(findAnswerButtonId()).classList.add("green");
        }
    }

    //teisingo atsakymo ID radimui, jei zaidejas pasirinko neteisinga
    function findAnswerButtonId() {
        if (rightAnswers[indexOfRandomNumber - 1] === answerA.textContent) {
            return "answerA";
        } else if (rightAnswers[indexOfRandomNumber - 1] === answerB.textContent) {
            return "answerB";
        } else {
            return "answerC";
        }
    }

    //skaiciuoja zaidejo teisingu atsakymu skaiciu
    function countPlayerRightAnswers() {
        let count = 0;
        for (let i = 0; i < playerAnswers.length; i++) {
            if (playerAnswers[i] === rightAnswers[i]) {
                count++;
            }
        }
        return count;
    }

    //deaktyvuoja atsakymu mygtukus(kai rodomas teisingas atsakymas)
    function answerButtonsDisabled() {
        answerA.disabled = true;
        answerB.disabled = true;
        answerC.disabled = true;
    }

    //atstato atsakymu mygtuku veikima
    function answerButtonsEnabled() {
        answerA.disabled = false;
        answerB.disabled = false;
        answerC.disabled = false;
    }

    //po zaidimo per naujo paleidzia pradini puslapi, "atstato" globalius kintamuosius
    function anotherGame() {
        indexOfRandomNumber = 0;
        playerAnswers = new Array();
        rightAnswers = new Array();
        cityImage.setAttribute("src", ""); //jei zaidejas renkasi kito tipo tura, isvalo atributus
        questionText.textContent = "";
        countedAnswers.classList.add("d-none");
        header.classList.remove("d-none");
        startPage.classList.remove("d-none");
        copyright.classList.remove("d-none");
    }

    //sugeneruoja unikaliu skaiciu masyva
    function randomUniqueNumbers(arrayLength, numbersRange) {
        var array = [];
        while (array.length < arrayLength) {
            var random = Math.floor(Math.random() * numbersRange);
            if (array.indexOf(random) === -1) {
                array.push(random);
            }
        }
        return array;
    }

})();

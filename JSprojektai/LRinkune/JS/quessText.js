//* GUESSTEXT JS *//

var letters = {
    a: '../IMG/abc_be_raidziu/raide_A.jpg',
    ą: '../IMG/abc_be_raidziu/raide_Anosine.jpg',
    b: '../IMG/abc_be_raidziu/raide_B.jpg',
    c: '../IMG/abc_be_raidziu/raide_C.jpg',
    č: '../IMG/abc_be_raidziu/raide_Cc.jpg',
    d: '../IMG/abc_be_raidziu/raide_D.jpg',
    e: '../IMG/abc_be_raidziu/raide_E.jpg',
    ę: '../IMG/abc_be_raidziu/raide_Enosine.jpg',
    ė: '../IMG/abc_be_raidziu/raide_Ee.jpg',
    f: '../IMG/abc_be_raidziu/raide_F.jpg',
    g: '../IMG/abc_be_raidziu/raide_G.jpg',
    h: '../IMG/abc_be_raidziu/raide_H.jpg',
    i: '../IMG/abc_be_raidziu/raide_I.jpg',
    į: '../IMG/abc_be_raidziu/raide_Inosine.jpg',
    y: '../IMG/abc_be_raidziu/raide_Y.jpg',
    j: '../IMG/abc_be_raidziu/raide_J.jpg',
    k: '../IMG/abc_be_raidziu/raide_K.jpg',
    l: '../IMG/abc_be_raidziu/raide_L.jpg',
    m: '../IMG/abc_be_raidziu/raide_M.jpg',
    n: '../IMG/abc_be_raidziu/raide_N.jpg',
    o: '../IMG/abc_be_raidziu/raide_O.jpg',
    p: '../IMG/abc_be_raidziu/raide_P.jpg',
    r: '../IMG/abc_be_raidziu/raide_R.jpg',
    s: '../IMG/abc_be_raidziu/raide_S.jpg',
    š: '../IMG/abc_be_raidziu/raide_Ss.jpg',
    t: '../IMG/abc_be_raidziu/raide_T.jpg',
    u: '../IMG/abc_be_raidziu/raide_U.jpg',
    ų: '../IMG/abc_be_raidziu/raide_Unosine.jpg',
    ū: '../IMG/abc_be_raidziu/raide_Uu.jpg',
    v: '../IMG/abc_be_raidziu/raide_V.jpg',
    z: '../IMG/abc_be_raidziu/raide_Z.jpg',
    ž: '../IMG/abc_be_raidziu/raide_Zz.jpg',
    " ": '../IMG/abc_be_raidziu/tarpas.jpg'
};

var forma = document.getElementById("zodis");
var tikrinimas = document.getElementById("enteredText");
var myArray = [];
var vertimas = document.getElementById("vertimas");
var check = document.getElementById("submit");
var visiZodziai;
var word;

translate();

function translate() {

    var zodziai = new XMLHttpRequest();
    zodziai.open('get', 'https://gist.githubusercontent.com/LinaRink/d9eb066867cc3bbe8f5cb35286807239/raw/e56479ef536c2c7d6f0891be003053c23787f2a5/zodziai.json');
    zodziai.onload = function () {
        visiZodziai = JSON.parse(zodziai.responseText);
        visiZodziai = visiZodziai.zodziai;
        //        console.log(visiZodziai);

        word = visiZodziai[Math.floor(Math.random() * visiZodziai.length)];
        var zodis = word;
        console.log(zodis);
        for (var i = 0; i < zodis.length; i++) {

            if (letter == " ") {
                var letter = zodis[i];
                var img = letters[letter.toLowerCase()];
                myArray.push(img);
                vertimas.innerHTML += '<br><hr>';
                vertimas.innerHTML += '<img src="' + img + '" alt="" />';
                word.value = "";

            } else {
                var letter = zodis[i];
                var img = letters[letter.toLowerCase()];
                myArray.push(img);
                vertimas.innerHTML += '<img src="' + img + '" alt="" />';
                word.value = "";
            }
        }
    }
    zodziai.send();
}

check.addEventListener("click", function () {
    if (tikrinimas.value == word) {
        swal({
            title: "Sveikiname!",
            text: "Atsakėte teisingai",
            icon: "success"
        })
        clear();
        translate();
    } else {
        swal({
            title: "Neteisingai!",
            text: "Bandykite dar kartą",
            icon: "error"
        })
    }
})

function clear() {
    vertimas.innerHTML = "";
    tikrinimas.value = "";
}

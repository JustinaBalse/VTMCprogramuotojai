//* LEARN JS *//
(function () {
    var letters = {
        a: '../IMG/Abecele/raide_A.jpg',
        ą: '../IMG/Abecele/raide_Anosine.jpg',
        b: '../IMG/Abecele/raide_B.jpg',
        c: '../IMG/Abecele/raide_C.jpg',
        č: '../IMG/Abecele/raide_Cc.jpg',
        d: '../IMG/Abecele/raide_D.jpg',
        e: '../IMG/Abecele/raide_E.jpg',
        ę: '../IMG/Abecele/raide_Enosine.jpg',
        ė: '../IMG/Abecele/raide_Ee.jpg',
        f: '../IMG/Abecele/raide_F.jpg',
        g: '../IMG/Abecele/raide_G.jpg',
        h: '../IMG/Abecele/raide_H.jpg',
        i: '../IMG/Abecele/raide_I.jpg',
        į: '../IMG/Abecele/raide_Inosine.jpg',
        y: '../IMG/Abecele/raide_Y.jpg',
        j: '../IMG/Abecele/raide_J.jpg',
        k: '../IMG/Abecele/raide_K.jpg',
        l: '../IMG/Abecele/raide_L.jpg',
        m: '../IMG/Abecele/raide_M.jpg',
        n: '../IMG/Abecele/raide_N.jpg',
        o: '../IMG/Abecele/raide_O.jpg',
        p: '../IMG/Abecele/raide_P.jpg',
        r: '../IMG/Abecele/raide_R.jpg',
        s: '../IMG/Abecele/raide_S.jpg',
        š: '../IMG/Abecele/raide_Ss.jpg',
        t: '../IMG/Abecele/raide_T.jpg',
        u: '../IMG/Abecele/raide_U.jpg',
        ų: '../IMG/Abecele/raide_Unosine.jpg',
        ū: '../IMG/Abecele/raide_Uu.jpg',
        v: '../IMG/Abecele/raide_V.jpg',
        z: '../IMG/Abecele/raide_Z.jpg',
        ž: '../IMG/Abecele/raide_Zz.jpg',
        " ": '../IMG/Abecele/tarpas.jpg'
    };

    var forma = document.getElementById("zodis");
    var word = document.getElementById("enteredText");
    var myArray = [];
    var vertimas = document.getElementById("vertimas");


    forma.addEventListener("submit", function (e) {
        e.preventDefault();
        clear();
        translate();
    })


    function translate() {

        var zodis = word.value;
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


    function clear() {

        vertimas.innerHTML = "";
    }

})();

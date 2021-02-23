(function() {
    //Filtravimo forma.
    var forma = document.getElementById("formFilter");
    //Mygtukas paleidziantis paieska, nepriklauso jokiai formai.
    var paieska = document.getElementById("initSearch");
    //Atstato visas korteles i ju pradine busena.
    var resetas = document.getElementById("resetas");
    //Visu korteliu "konteinerio" tagas.
    var galerija = document.getElementsByClassName("card-columns")[0];
    //JSON kintamasis
    var duom = JSON.parse(vaizdai);
    //Visu korteliu masyvas.
    var visosKortos = initPage();

    //Funkcija sukurianti visas korteles ir sudedanti jas i visosKortos masyva, bei isjungianti varneles, bei
    //istrinanti duomenis paieskos laukelyje.
    function initPage() {
        var arr = [];
        for (var i = 0; i < duom.length; i++) {
            var kort = createCard(duom[i])
            arr.unshift(kort);
            galerija.appendChild(kort);
        }
        var checkboxes = document.getElementsByTagName("li");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].firstElementChild.checked = false;
        }
        var inputas = document.getElementById("searchInput");
        inputas.value = "";
        return arr;
    }

    //Funkcija sukurianti viena kortele. Struktura:
    //Paveiksliukas
    //Pavadinimas
    //Tekstas
    function createCard(duomenys) {
        var korta = document.createElement("div");
        korta.setAttribute("class", "card");
        var pav = document.createElement("img");
        pav.setAttribute("class", "card-img-top");
        pav.setAttribute("src", duomenys.source);
        pav.setAttribute("alt", duomenys.id);
        korta.appendChild(pav);
        var turinys = document.createElement("div");
        turinys.setAttribute("class", "card-body");
        var pavad = document.createElement("h5");
        pavad.setAttribute("class", "card-title");
        pavad.textContent = duomenys.title;
        turinys.appendChild(pavad);
        var tekstas = document.createElement("p");
        tekstas.setAttribute("class", "card-text");
        tekstas.textContent = duomenys.text;
        turinys.appendChild(tekstas);
        korta.appendChild(turinys);
        return korta;
    }

    //Funkcija surenkanti filtrus is formos, iskviecianti funkcija hide(), ir tuomet iskviecianti funkcija filter().
    forma.addEventListener("submit", function (e) {
        e.preventDefault();
        let filtrai = [];
        for (let i = 0; i < forma.length - 2; i++) {
            if (forma[i].checked) {
                filtrai.push(forma[i].value);
            }
        }
        hide();
        filter(filtrai);
    })

    //Funkcija paslepianti visas korteles. Tai padaroma ju stiliu padarant display: none.
    function hide() {
        visosKortos.forEach(function (korta) {
            korta.setAttribute("class", "invis");
        });
    }

    //Funkcija padaranti visas korteles vel matomas. Tai padaroma ju klases nustatant i card.
    resetas.addEventListener("click", function (e) {
        e.preventDefault();
        reset(visosKortos);
    })

    function reset(array) {
        for (let i = 0; i < array.length; i++) {
            array[i].setAttribute("class", "card");
        }
    }

    //Funkcija filtruojanti korteles. Funkcija gauna pasirinktu filtru masyva, ir tuomet paima kiekviena korteliu masyvu elementa, JSON duomenu masyvo elementa, bei filtru masyvu elementa ir lygina korteles paveikslelio alt ir src atributus su JSON masyvo elemento source elementu bei id elementu (atitinka alt). Jeigu jie sutampa, ta kortele padaro matoma.
    function filter(filtrai) {
        if (filtrai.length > 0) {
            for (let i = 0; i < visosKortos.length; i++) {
                for (let j = 0; j < duom.length; j++) {
                    if (visosKortos[i].firstElementChild.getAttribute("alt") === duom[j].id && visosKortos[i].firstElementChild.getAttribute("src") === duom[j].source) {
                        for (let k = 0; k < filtrai.length; k++) {
                            for (let t = 0; t < duom[j].tags.length; t++) {
                                if (filtrai[k] === duom[j].tags[t]) {
                                    visosKortos[i].setAttribute("class", "card");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //Funkcija paimanti raktini zodi (ar jo dali) is paieskos laukelio ir iskviecianti funkcija search.
    paieska.addEventListener("click", function (e) {
        e.preventDefault();
        var keyword = document.getElementById("searchInput").value;
        search(keyword);
    })

    //Funkcija ieskanti korteliu kuriu pavadinimai bent dalinai sutampa su gaunamu raktazodziu. Tai pasiekiama einant per visa korteliu masyva, paimant kiekviena korteles pavadinima ir ziurint ar jis turi savyje raktazodi.
    function search(word) {
        if (word.length > 0) {
            hide();
            for (let i = 0; i < visosKortos.length; i++) {
                for (let j = 0; j < duom.length; j++) {
                    if (visosKortos[i].lastElementChild.firstElementChild.textContent.includes(word)) {
                        visosKortos[i].setAttribute("class", "card");
                    }
                }
            }
        }
    }

    //Funkcija kuri suveikia paspaudus ant bet kurio korteles elemento (korteles). Paspaudus ant korteles suveikia SweetAlert2, kitaip tariant padidina ta kortele.
    $(document).click(function (e) {
        var korta = e.target;
        if (e.target.classList.contains("card") || e.target.classList.contains("card-img-top") || e.target.classList.contains("card-body") || e.target.classList.contains("card-text") || e.target.classList.contains("card-title")) {
            if (e.target.classList.contains("card-title") || e.target.classList.contains("card-text")) {
                korta = e.target.parentElement.parentElement;
            }
            if (e.target.classList.contains("card-img-top") || e.target.classList.contains("card-body")) {
                korta = e.target.parentElement;
            }
            Swal.fire({
                title: korta.lastElementChild.firstElementChild.textContent,
                text: korta.lastElementChild.lastElementChild.textContent,
                imageUrl: korta.firstElementChild.getAttribute("src"),
                showConfirmButton: false,
            });
        }
    })
})();
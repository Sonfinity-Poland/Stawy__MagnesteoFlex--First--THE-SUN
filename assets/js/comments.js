

function calculateHMSleft() {
    //calculate
    var now = new Date();
    var hoursleft = 23 - now.getHours();
    var minutesleft = 59 - now.getMinutes();
    var secondsleft = 59 - now.getSeconds();

    //format 0 prefixes
    if (minutesleft < 10) minutesleft = "0" + minutesleft;
    if (secondsleft < 10) secondsleft = "0" + secondsleft;

    //display
    $("#HMSremaining").html(
        hoursleft + " h " + minutesleft + " m " + secondsleft + " s"
    );
}

calculateHMSleft();
setInterval(calculateHMSleft, 1000);

let commentsJSON = [
    {
        nick: "Jasiu007",
        date: "1 godzina",
        content: "Wystarczyło kilka dni, by przestało strzykać w kolanach. Czuję się, jakby ktoś ‘’naoliwił’’ moje stawy! Dziękuję!.",
    },
    {
        nick: "Halyna",
        date: "1 godzina",
        content: "Wreszcie kucam, klękam, bawię się z wnukami. Nie odczuwam żadnego dyskomfortu. Czuję się jakbym miała 20 lat.",
    },
    {
        nick: "Tadziu",
        date: "2 godziny",
        content: "Paczka właśnie dotarła. Czekam na pierwsze efekty, trzymajcie kciuki.",
        pict: "comment01"
    },
    {
        nick: "Beata Jabłońska",
        date: "2 godziny",
        content: "Nie sądziłam, że takie małe plastry mogą działać takie cuda. Polecam każdemu, kto ma problem ze stawami."
    },
    {
        nick: "Zielona Matylda",
        date: "3 godziny",
        content: "Te plastry naprawdę są niewidoczne na skórze, sami zobaczcie!",
        pict: "comment02"
    },
    {
        nick: "Leszek Mirosławski",
        date: "3 godziny",
        content: "Te plastry to prawdziwa rewolucja. Na początku sceptycznie do nich podchodziłem, jednak postanowiłem zaryzykować i zamówiłem jedno opakowanie. Z niecierpliwością czekam na przesyłkę."
    },
    {
        nick: "Mała Ania",
        date: "4 godziny",
        content: "Już opakowanie plastrów przyciąga wyglądem, patrzcie! A zawartość? Jest jeszcze lepsza.",
        pict: "comment03"
    },
    {
        nick: "Malwina Lichomska",
        date: "4 godziny",
        content: "Przez problemy z kręgosłupem nie byłam w stanie normalnie funkcjonować. Dzięki tym plastrom biomagnetycznym czuję się o niebo lepiej. Po prostu rewelacja!"
    },
    {
        nick: "Oleńka70",
        date: "6 godzin",
        content: "Te plastry uratowały mi życie. Wreszcie uwolniłam się od strzykania, trzeszczenia i piszczenia, szczególnie w kolanach.",
        pict: "comment04"
    },
    {
        nick: "Marian",
        date: "6 godzin",
        content: "Kręgosłup już mi nie dokucza, ten produkt jest jakby luksusowy. Polecam wszystkim!"
    },
    {
        nick: "Jakub Ślepiec",
        date: "12 godzin",
        content: "Te plastry to gwarancja sukcesu. Jestem pewien, że pomogą każdemu tak jak mi.",
        pict: "comment05"
    },
    {
        nick: "Baba Jadzia",
        date: "13 godzin",
        content: "W krzyżu mnie łupało, korzonki bolały, normalnie chodzić nie mogłam… No nic nie pomagało, te proszki przeciwbólowe to mi wątrobę zniszczyły. Na szczęście bratanek przywiózł tę kurację zza granicy. Dzięki plastrom z magnesami mogę normalnie funkcjonować."
    },
    {
        nick: "Janusz Duda",
        date: "16 godzin",
        content: "Całe życie byłem księgowym. Praca przy biurku doprowadziła do tego, że moje łokcie były w totalnej rozsypce. Miałem problemy z wyprostowaniem rąk, no masakra jakaś… Dopiero te plastry mi pomogły. Ból minął jak ręką odjął."
    },
    {
        nick: "Grażka W.",
        date: "wczoraj",
        content: "Od kilku lat męczyłam się z bólem nadgarstków. Nawet kubka w ręku nie mogłam utrzymać. Codziennie łykałam po kilka tabletek przeciwbólowych, które doprowadziły do wrzodów żołądka. Te plastry poleciła mi sąsiadka. No od razu mi pomogły. Nie czułam już bólu, nic mi z rąk nie leciało. Zdecydowanie polecam!"
    },
    {
        nick: "Beti",
        date: "wczoraj",
        content: "Od lat cierpiałam na RZS. Lekarze nie dawali mi żadnych szans, groził mi wózek inwalidzki. Nie mogłam do tego dopuścić, zaczęłam szukać innego rozwiązania. Tak trafiłam na Magnesteo Flex. Te maleńkie plastry potrafią zdziałać wielkie cuda!"
    },
    {
        nick: "Seba Typowski",
        date: "wczoraj",
        content: "To jest mega! W końcu mogę normalnie chodzić! Zero efektów ubocznych! Kupujcie póki jest w promocji!"
    },
];

$(document).ready(function () {
    (mockComments = commentsJSON),
    (months = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień"
    ]),
    (renderer = $("#cmt-user")),
    (render = $("#cmt-render")),
    (arrayOfUserComments = []),
    (renderedStr = "");
    checkForUserComments();
    renderMockCommetns();
});

function getCurrentDate() {
    let iDO = new Date();
    let dateStr = `${iDO.getDate()} ${
    months[iDO.getMonth()]
  } ${iDO.getFullYear()} o ${iDO.getHours()}:${iDO.getMinutes()}`;
    return dateStr;
}

function checkForUserComments() {
    if (localStorage.getItem("comments") != null) {
        arrayOfUserComments = JSON.parse(localStorage.getItem("comments"));
        renderComments();
    }
}

function composeCommentNode(commentObj) {
    let commentEl = `
        <div class="cmt-section comment">
            <div class="comment_top">
                <div class="avatar">${commentObj.signature.charAt(0)}</div>
                <span class="name">${commentObj.signature}</span>
                <span class="date">Przed chwilą</span>
            </div>
            <div class="comment_middle">
                <p>
                    ${commentObj.comment}
                </p>
            </div>
            <div class="comment_bottom">
                <span class="reply">Odpowiedz</span>
                <div class="like_wrapper">
                    <div class="like"></div>
                    <div class="unlike"></div>
                </div>
            </div>
        </div>
    `;
    
    return commentEl;
}

function renderComments() {
    arrayOfUserComments.forEach(element => {
        let composedNode = composeCommentNode(element);
        renderer.prepend(composedNode);
    });
}

function addNewComment(newCmt) {
    let composedNode = composeCommentNode(newCmt);
    renderer.prepend(composedNode);
}

function addListeners() {
    const likesUp = document.querySelectorAll(".like-btn");
    likesUp.forEach(element => {
        element.addEventListener("click", e => {
            //Get id of comment
            let likesSpan = $(e.target).siblings(".like-quantity");
            let comentIdx = likesSpan
                .parent()
                .parent()
                .parent()
                .parent()
                .attr("id");
            if (mockComments[comentIdx].hasLiked == false) {
                likesSpan.html(parseInt(likesSpan.text(), 10) + 1);
                $(e.target).html("Nie lubię");
                mockComments[comentIdx].hasLiked = true;
            } else {
                likesSpan.html(parseInt(likesSpan.text(), 10) - 1);
                $(e.target).html("Lubię to");
                mockComments[comentIdx].hasLiked = false;
            }
        });
    });
}

function renderMockCommetns() {
    let idx = 0;
    mockComments.forEach(element => {
        let answerTwmplate;
        let answerMock = {
            nick: null,
            content: null,
            date: null,
            likes: null,
            hasLiked: false,
            pict: null
        };

        let pictTag = `<img src="assets/img/${element.pict}.png" alt="">`;
        let tempStr = `
            <div class="cmt-section comment" id="${idx}">
                <div class="comment_top">
                    <div class="avatar">${element.nick.charAt(0)}</div>
                    <span class="name">${element.nick}</span>
                    <span class="date">${element.date}</span>
                </div>
                <div class="comment_middle">
                    <p>
                        ${element.content}
                    </p>
                    <div class="product_img_wrapper">
                        ${element.pict ? pictTag : ''}
                    </div>
                </div>
                <div class="comment_bottom">
                    <span class="reply">Odpowiedz</span>
                    <div class="like_wrapper">
                        <div class="like"></div>
                        <div class="unlike"></div>
                    </div>
                </div>
            </div>
        `;

        if (element.hasOwnProperty("answers")) {
            element.answers.forEach((answer, answerIdx) => {
                idx++;
                answerMock = answer;
                answerTwmplate = `
                        <div class="cmt-answers" id="${idx}">
                            <div class="comment answer cmt-section__border">
                                <div class="cmt-img">
                                    <img src="assets/img/avatars/${answerMock.nick}.jpg" alt="${answerMock.nick}">
                                </div>
                                <div class="cmtRight px-3">
                                    <div class="cmt-title">
                                        <span class="commenterName">${
                                          answerMock.nick
                                        }</span><span class="date">${
          answerMock.date
        }</span>
                                    </div>
                                    <p>
                                        ${answerMock.content}
                                    </p>
                                    <img class="w-50 mb-2 mt-2 imagen" src="assets/img/${answerMock.pict}.png" alt="">
                                    <div class="cmt-buttons">
                                        <span class="like-btn">Lubię to</span>
                                        <svg width="18px" height="18px" style="margin-top: -4px;" viewBox="0 0 543 451" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#30418f" stroke="#30418f" stroke-width="0.09375" opacity="1.00" d=" M 289.9 45.9 C 292.5 44.9 295.3 45.0 298.0 44.9 C 313.7 45.1 329.4 45.0 345.0 45.0 C 350.1 44.6 355.1 48.8 355.0 54.0 C 355.2 64.3 354.8 74.7 355.1 85.0 C 355.5 91.7 352.8 98.0 351.2 104.3 C 349.4 111.2 345.7 117.7 345.9 125.0 C 346.0 144.0 345.9 163.0 345.9 182.1 C 367.3 182.1 388.7 182.2 410.1 182.0 C 412.6 181.9 415.0 182.6 417.1 183.9 C 426.1 189.8 436.1 194.0 445.1 199.9 C 447.5 201.4 447.9 204.4 448.0 207.0 C 447.9 260.3 447.9 313.7 447.9 367.0 C 447.6 375.2 448.5 383.4 447.6 391.5 C 445.9 394.7 442.8 396.8 440.3 399.3 C 430.7 407.7 421.2 416.2 411.7 424.7 C 407.2 428.7 402.7 434.4 396.0 434.0 C 354.7 434.0 313.3 434.0 272.0 434.0 C 266.6 434.0 260.4 435.0 255.9 431.1 C 244.6 422.0 232.7 413.7 221.4 404.6 C 220.4 403.8 219.3 403.0 218.0 403.1 C 209.6 402.5 201.3 403.2 193.1 404.0 C 181.0 404.1 169.0 404.0 156.9 403.9 C 156.8 409.6 157.1 415.3 156.9 421.0 C 156.9 423.6 154.9 425.6 153.7 427.8 C 150.5 428.3 147.3 429.0 144.0 429.0 C 106.7 428.9 69.3 429.0 32.0 429.0 C 28.4 428.9 24.2 428.0 22.4 424.5 C 20.2 419.7 21.2 414.2 21.0 409.0 C 21.0 342.7 21.0 276.3 21.0 210.0 C 21.1 206.9 21.4 203.6 22.8 200.9 C 24.7 197.7 28.7 197.2 32.0 197.0 C 68.6 197.0 105.3 197.1 142.0 196.9 C 145.7 197.1 150.0 196.3 153.2 198.8 C 154.8 200.2 156.9 201.7 156.8 204.1 C 157.2 210.8 156.8 217.6 156.9 224.3 C 179.5 222.0 200.9 210.8 216.3 194.3 C 220.9 190.4 222.8 184.5 225.2 179.2 C 230.7 168.3 235.6 157.0 241.0 145.9 C 246.7 133.1 253.1 120.6 258.8 107.8 C 263.1 99.3 266.4 90.3 270.9 81.9 C 275.2 72.8 279.3 63.7 283.6 54.6 C 285.2 51.4 286.2 47.2 289.9 45.9 M 294.7 73.5 C 292.3 77.1 290.5 81.0 288.9 84.9 C 287.0 89.9 283.4 94.2 282.5 99.6 C 281.9 100.2 281.3 100.9 280.7 101.6 C 278.2 108.0 274.6 113.9 272.5 120.5 C 268.8 126.4 267.0 133.3 263.2 139.2 C 260.6 143.2 259.2 147.8 256.9 152.0 C 254.7 155.8 253.9 160.3 252.0 164.2 C 249.9 169.5 246.1 174.0 244.9 179.6 C 243.8 183.3 241.4 186.3 239.7 189.7 C 237.5 193.3 237.4 198.0 234.2 201.1 C 230.7 205.9 226.0 209.6 221.7 213.7 C 218.0 215.9 216.0 220.1 212.0 221.9 C 208.0 224.7 203.6 226.9 199.6 229.7 C 196.2 232.2 191.9 232.7 188.0 234.1 C 184.3 235.2 181.3 237.7 177.5 238.3 C 171.4 239.7 165.1 241.1 158.8 241.5 C 155.9 243.9 157.0 247.8 156.8 251.0 C 157.0 296.1 156.8 341.1 156.9 386.2 C 167.3 386.1 177.6 385.9 188.0 386.1 C 197.0 386.3 206.0 384.3 215.0 384.8 C 219.9 384.4 225.0 385.0 229.0 387.9 C 235.2 392.8 241.3 397.8 247.7 402.4 C 252.9 407.4 259.4 410.7 264.3 416.0 C 285.2 416.2 306.1 416.0 327.0 416.1 C 349.8 415.9 372.6 416.3 395.5 415.9 C 400.3 412.0 404.7 407.6 409.2 403.3 C 413.3 400.1 417.3 396.8 420.9 393.0 C 423.8 389.9 428.0 387.7 429.8 383.7 C 430.6 380.5 430.2 377.2 430.2 374.0 C 429.9 360.5 430.7 347.0 429.8 333.6 C 430.1 294.4 429.7 255.2 430.0 215.9 C 429.9 214.2 430.0 212.4 429.2 210.8 C 424.4 208.4 419.6 205.8 415.2 202.6 C 410.1 199.5 404.0 198.5 398.0 198.7 C 380.3 198.9 362.7 198.6 345.0 198.9 C 340.2 199.7 335.4 199.0 330.8 197.4 C 328.1 191.7 327.6 185.2 328.0 179.0 C 328.0 161.0 328.0 143.0 327.9 125.0 C 328.0 117.4 331.4 110.5 333.1 103.2 C 335.2 99.1 336.2 94.5 337.1 89.9 C 337.1 82.4 337.4 74.8 336.4 67.3 C 337.0 65.6 337.1 63.8 337.2 62.0 C 325.0 61.7 312.9 62.2 300.7 61.7 C 298.5 65.5 296.3 69.4 294.7 73.5 M 38.8 214.8 C 38.7 225.6 38.3 236.4 39.0 247.2 C 39.1 250.2 39.3 253.1 39.3 256.0 C 39.3 307.6 39.4 359.2 39.3 410.7 C 72.4 410.7 105.6 410.7 138.7 410.7 C 138.6 359.2 138.8 307.6 138.7 256.0 C 138.7 253.1 138.9 250.2 139.0 247.2 C 139.7 236.4 139.3 225.6 139.2 214.8 C 105.7 214.6 72.3 214.6 38.8 214.8 Z" />
                                            <path fill="#ffffff" stroke="#ffffff" stroke-width="0.09375" opacity="1.00" d=" M 294.7 73.5 C 296.3 69.4 298.5 65.5 300.7 61.7 C 312.9 62.2 325.0 61.7 337.2 62.0 C 337.1 63.8 337.0 65.6 336.4 67.3 C 329.6 76.7 323.6 86.6 317.1 96.2 C 314.1 100.6 310.8 105.1 310.3 110.6 C 309.4 118.0 309.3 125.4 308.5 132.9 C 306.7 147.5 306.2 162.2 304.4 176.8 C 303.9 180.8 303.4 184.8 303.9 188.9 C 306.7 191.1 310.3 191.7 313.7 192.7 C 319.5 194.0 325.2 195.6 330.8 197.4 C 335.4 199.0 340.2 199.7 345.0 198.9 C 362.7 198.6 380.3 198.9 398.0 198.7 C 404.0 198.5 410.1 199.5 415.2 202.6 C 419.6 205.8 424.4 208.4 429.2 210.8 C 430.0 212.4 429.9 214.2 430.0 215.9 C 429.7 255.2 430.1 294.4 429.8 333.6 C 419.2 343.4 408.4 353.0 398.4 363.4 C 394.5 367.0 391.3 371.8 386.3 374.0 C 380.0 375.6 373.4 374.5 367.0 374.6 C 356.3 374.1 345.7 375.7 335.0 375.7 C 323.6 375.1 312.4 377.0 301.0 376.8 C 291.0 377.0 281.0 375.6 270.9 375.7 C 267.2 375.8 263.3 375.1 260.2 372.8 C 252.3 367.3 244.4 361.9 236.6 356.3 C 233.0 353.6 228.5 352.4 224.0 352.5 C 202.4 352.9 180.9 352.5 159.3 352.7 C 159.4 322.1 159.3 291.6 159.3 261.0 C 159.4 254.5 159.5 248.0 158.8 241.5 C 165.1 241.1 171.4 239.7 177.5 238.3 C 181.3 237.7 184.3 235.2 188.0 234.1 C 191.9 232.7 196.2 232.2 199.6 229.7 C 203.6 226.9 208.0 224.7 212.0 221.9 C 216.0 220.1 218.0 215.9 221.7 213.7 C 226.0 209.6 230.7 205.9 234.2 201.1 C 237.4 198.0 237.5 193.3 239.7 189.7 C 241.4 186.3 243.8 183.3 244.9 179.6 C 246.1 174.0 249.9 169.5 252.0 164.2 C 253.9 160.3 254.7 155.8 256.9 152.0 C 259.2 147.8 260.6 143.2 263.2 139.2 C 267.0 133.3 268.8 126.4 272.5 120.5 C 274.6 113.9 278.2 108.0 280.7 101.6 C 281.3 100.9 281.9 100.2 282.5 99.6 C 283.4 94.2 287.0 89.9 288.9 84.9 C 290.5 81.0 292.3 77.1 294.7 73.5 Z" />
                                            <path fill="#e8e9e9" stroke="#e8e9e9" stroke-width="0.09375" opacity="1.00" d=" M 317.1 96.2 C 323.6 86.6 329.6 76.7 336.4 67.3 C 337.4 74.8 337.1 82.4 337.1 89.9 C 336.2 94.5 335.2 99.1 333.1 103.2 C 331.4 110.5 328.0 117.4 327.9 125.0 C 328.0 143.0 328.0 161.0 328.0 179.0 C 327.6 185.2 328.1 191.7 330.8 197.4 C 325.2 195.6 319.5 194.0 313.7 192.7 C 310.3 191.7 306.7 191.1 303.9 188.9 C 303.4 184.8 303.9 180.8 304.4 176.8 C 306.2 162.2 306.7 147.5 308.5 132.9 C 309.3 125.4 309.4 118.0 310.3 110.6 C 310.8 105.1 314.1 100.6 317.1 96.2 Z" />
                                            <path fill="#7e8fbe" stroke="#7e8fbe" stroke-width="0.09375" opacity="1.00" d=" M 38.8 214.8 C 72.3 214.6 105.7 214.6 139.2 214.8 C 139.3 225.6 139.7 236.4 139.0 247.2 C 105.7 247.4 72.3 247.4 39.0 247.2 C 38.3 236.4 38.7 225.6 38.8 214.8 Z" />
                                            <path fill="#e8e9e9" stroke="#e8e9e9" stroke-width="0.09375" opacity="1.00" d=" M 156.8 251.0 C 157.0 247.8 155.9 243.9 158.8 241.5 C 159.5 248.0 159.4 254.5 159.3 261.0 C 159.3 291.6 159.4 322.1 159.3 352.7 C 180.9 352.5 202.4 352.9 224.0 352.5 C 228.5 352.4 233.0 353.6 236.6 356.3 C 244.4 361.9 252.3 367.3 260.2 372.8 C 263.3 375.1 267.2 375.8 270.9 375.7 C 281.0 375.6 291.0 377.0 301.0 376.8 C 312.4 377.0 323.6 375.1 335.0 375.7 C 345.7 375.7 356.3 374.1 367.0 374.6 C 373.4 374.5 380.0 375.6 386.3 374.0 C 391.3 371.8 394.5 367.0 398.4 363.4 C 408.4 353.0 419.2 343.4 429.8 333.6 C 430.7 347.0 429.9 360.5 430.2 374.0 C 430.2 377.2 430.6 380.5 429.8 383.7 C 428.0 387.7 423.8 389.9 420.9 393.0 C 417.3 396.8 413.3 400.1 409.2 403.3 C 404.7 407.6 400.3 412.0 395.5 415.9 C 372.6 416.3 349.8 415.9 327.0 416.1 C 306.1 416.0 285.2 416.2 264.3 416.0 C 259.4 410.7 252.9 407.4 247.7 402.4 C 241.3 397.8 235.2 392.8 229.0 387.9 C 225.0 385.0 219.9 384.4 215.0 384.8 C 206.0 384.3 197.0 386.3 188.0 386.1 C 177.6 385.9 167.3 386.1 156.9 386.2 C 156.8 341.1 157.0 296.1 156.8 251.0 Z" />
                                            <path fill="#6276ae" stroke="#6276ae" stroke-width="0.09375" opacity="1.00" d=" M 39.0 247.2 C 72.3 247.4 105.7 247.4 139.0 247.2 C 138.9 250.2 138.7 253.1 138.7 256.0 C 138.8 307.6 138.6 359.2 138.7 410.7 C 105.6 410.7 72.4 410.7 39.3 410.7 C 39.4 359.2 39.3 307.6 39.3 256.0 C 39.3 253.1 39.1 250.2 39.0 247.2 Z" />
                                        </svg>
                                        <span class="like-quantity">${
                                          answerMock.likes
                                        }</span>
                                    </div>
<div class="ans-button">Odpowiedz</div>
                                </div>
                            </div>
                        </div>`;
                //If there is no more answers to comment end answers section with additional div tag.
                if (element.answers[answerIdx + 1] == undefined) {
                    tempStr = tempStr + answerTwmplate + "</div>";
                } else {
                    tempStr = tempStr + answerTwmplate;
                }
            });
        } else {
            tempStr = tempStr + "</div>";
        }
        renderedStr += tempStr;
        idx++;
    });
    render.html(renderedStr);
    addListeners();
}

let that = this;
$("#addCommentBtn").mousedown(function () {
    let signature = $("#signature").val();
    let comment = $("#comment").val();
    if (signature && comment != "") {
        let dateStr = that.getCurrentDate();
        let newCmt = {
            signature: signature,
            comment: comment,
            dateStr: dateStr
        };
        that.arrayOfUserComments.push(newCmt);
        localStorage.setItem("comments", JSON.stringify(that.arrayOfUserComments));
        that.addNewComment(newCmt);
    }
});

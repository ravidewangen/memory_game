let data;
const cardBx = document.getElementById('card_bx');
let firstClick = 0;
let cardClickCount = 0;
let cardFirstValue = 0;
let cardSecondValue = 0;
let cardFirstId = 0;
let cardSecondId = 0;

const readJsonFile = (file, callback) => {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

const loadGame = (data) => {
    cardBx.innerHTML = '';
    for (i = 0; i < data.length; i++) {
        let frontCard = '<div class="card-view front-view"><i class="fa fa-question"></i></div>';
        let backCard = '<div class="card-view back-view"><img src="' + data[i]['card_img'] + '"></div>';
        $('#card_bx').append('<div id="' + data[i]['card_id'] + '" class="card" onclick="checkCard(' + data[i]['card_id'] + ',  ' + data[i]['card_value'] + ')">' + frontCard + backCard + '</div>');
    }
}

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const checkCard = (id, cardValue) => {
    let delayInMilliseconds = 500;
    let card = document.getElementById(id);

    if (card.classList.contains('active') == true) {
        return;
    }
    if (firstClick == 0) {
        firstClick = 1;
        card.classList.add('active');
        cardClickCount++;
        cardFirstValue = cardValue;
        cardFirstId = id;
    } else {
        cardSecondValue = cardValue;
        cardSecondId = id;
        card.classList.add('active');
        if (cardFirstValue != cardSecondValue) {
            cardClickCount++;
            if (cardClickCount == 2) {
                cardClickCount = 0;
                firstClick = 0;
                setTimeout(() => {
                    document.getElementById(cardSecondId).classList.remove('active');
                    document.getElementById(cardFirstId).classList.remove('active');
                }, delayInMilliseconds);
            }

        } else {
            firstClick = 0;
            cardClickCount = 0;
        }
    }
}
window.onload = () => {
    readJsonFile("/json/data.json", (text) => {
        data = JSON.parse(text);
        shuffle(data);
        loadGame(data);
    });
}
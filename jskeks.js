class player {
    constructor(username /*= Date.now()*/ , highscore /* = 0*/ ) {
        this.username = username;
        this.highscore = highscore;
    }

    /**
     * @param {number} numOfcl
     */
    set SetHighscore(numOfcl) {
        this.highscore = numOfcl;
    }

    /**
     * @param {number} name
     */
    set SetUsername(name) {
        this.username = name;
    }

    get GetHighscore() {
        return this.highscore;
    }
    get GetUsername() {
        return this.username;
    }

    get game() {
        let rez = [this.username, this.highscore];
        return rez;
    }

}



//varijable
let cookie = document.getElementById("img--cookie");
let cookieCountDisplay = document.querySelector("#click-count");
let btnStart = document.querySelector(".btn--start");
let timer = document.getElementById('timer');
var use = false;
//-------------------------
//funkcije


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

console.log("pocetak");
var klik = function () {
    if (pristup == true) {
        let broj = parseInt(document.getElementById("click-count").innerHTML);
        broj = broj + 1;
        document.getElementById("click-count").innerHTML = broj;
    } else {
        console.error("pokreni igru");
    }
}

async function LoadHighscore() {
    var sortHighscores = {
        byScore: function (a, b) {
            return (b.highscore - a.highscore);
        },

        byName: function (a, b) {
            return ((a.username < b.username) ? -1 : ((a.username > b.username) ? 1 : 0));
        }
    };

    let boardGet = await fetch("contestants.json");
    if (!boardGet.ok) {
        throw new Error("Can't load JSON");
    } else {
        var boardJSON = await boardGet.json();
    }
    let divHTMLboard = document.createElement('board');
    var boardList = JSON.stringify(boardJSON);
    boardJSON.sort(sortHighscores.byScore);
    let highscoreList = document.querySelector(".highscore--list");
    for (let element of boardJSON) {
        let listItem = document.createElement("li");
        listItem.textContent = `${element.username}: ${element.highscore}`;
        highscoreList.appendChild(listItem);
    }
}
LoadHighscore();

var PlayerName = prompt("Enter username:");
var setup = async function () {
    var sortHighscores = {
        byScore: function (a, b) {
            return (b.highscore - a.highscore);
        },

        byName: function (a, b) {
            return ((a.username < b.username) ? -1 : ((a.username > b.username) ? 1 : 0));
        }
    };

    numOfcl = localStorage.getItem(PlayerName);
    /*let newPlayer = {
        "highscore": parseInt(numOfcl),
        "username": PlayerName
    };*/
    let newPlayer = new player(PlayerName,numOfcl);


    let boardGet = await fetch("contestants.json");
    if (!boardGet.ok) {
        throw new Error("Can't load JSON");
    } else {
        var boardJSON = await boardGet.json();
    }
    let highscoreList = document.querySelector(".highscore--list");
    highscoreList.innerHTML = '';
    let one = 0;
    boardJSON.sort(sortHighscores.byScore);
    for (let element of boardJSON) {
        if (newPlayer.highscore >= element.highscore && one == 0) {
            one = 1;
            let listItem = document.createElement("li");
            listItem.textContent = `${newPlayer.username}: ${newPlayer.highscore}`;
            highscoreList.appendChild(listItem);
        }
        let listItem = document.createElement("li");
        listItem.textContent = `${element.username}: ${element.highscore}`;
        highscoreList.appendChild(listItem);
    }
    if (one == 0) {
        let listItem = document.createElement("li");
        listItem.textContent = `${newPlayer.username}: ${newPlayer.highscore}`;
        highscoreList.appendChild(listItem);
    }

}


//spajanje

btnStart.onclick = () => {
    var promise = new Promise(function (resolve, reject) {
        pristup = true;
        console.log("obecanje");
        setTimeout(() => {
            resolve("isteklo 10 sekundi");
        }, 10000);
    });
    promise.then(
        function (result) {
            pristup = false;
            document.getElementById("click-count").innerHTML = 0;
            setup();
        },
        function (error) {
            console.error("pogreska");
        }
    );
};

cookie.onclick = () => {
    if (pristup == true) {
        let broj = parseInt(document.getElementById("click-count").innerHTML);
        broj = broj + 1;
        localStorage.setItem(PlayerName, broj);
        document.getElementById("click-count").innerHTML = broj;
    } else {
        console.error("pokreni igru");
    }

}
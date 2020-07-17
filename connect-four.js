import { Game } from './game.js';
import { GameJsonSerializer } from "./game-json-serializer.js";
import { GameJsonDeserializer } from "./game-json-deserializer.js";
let game = undefined;
let updateUI = () => {
    let boardHolder = document.getElementById("board-holder");
    if (game === undefined) {
        boardHolder.classList.add("is-invisible");
    } else {
        boardHolder.classList.remove("is-invisible");
        document
        .getElementById("game-name")
        .innerHTML = game.getName();
        
        let clickTarget = document.getElementById("click-targets");
        if (game.currentPlayer === 1) {
            clickTarget.classList.add("red");
            clickTarget.classList.remove("black");
        } else {
            clickTarget.classList.add("black");
            clickTarget.classList.remove("red");
        }
        for (let row = 0; row <= 5; row ++) {
            for (let col = 0; col <=  6; col ++) {
                let square = document.getElementById(`square-${row}-${col}`);
                let newDiv = document.createElement("div");
                square.innerHTML = "";
                // console.log(square);
                if (game.getTokenAt(row, col) === 1) {
                    newDiv.classList.add("token", "black")
                    square.appendChild(newDiv);
                } else if (game.getTokenAt(row, col) === 2){
                    newDiv.classList.add("token", "red");
                    square.appendChild(newDiv);
                }
                
            }
            
        }
        for (let i = 0; i <= 6; i ++) {
            let col = document.getElementById(`column-${i}`);
            if (game.isColumnFull(i)) {
                col.classList.add("full");
            } else {
                col.classList.remove("full");
            }
        }

        // let test = new GameJsonSerializer(game);
        // // console.log("test.serialize  : ", test.serialize());
        // let test2 = new GameJsonDeserializer(test.serialize());
        // console.log(test2.deserialize());
    }
    
}
window.addEventListener("DOMContentLoaded", (event) => {

    const playerOneName = document.getElementById("player-1-name")
    const playerTwoName = document.getElementById("player-2-name")

    document.getElementById("form-holder").addEventListener("keyup", (event) => {
        if (playerOneName.value && playerTwoName.value) {
            document
                .getElementById("new-game")
                .disabled = false;
        } else {
            document
                .getElementById("new-game")
                .disabled = true;
     }
    })
    
    document.getElementById("click-targets").addEventListener("click", (event) => {
        if (event.target.id.startsWith("column-")) {
            let colNum = Number.parseInt(event.target.id[7]);
            game.playInColumn(colNum);
            updateUI();
            // create a new GameJsonSerializer on the game object
            let serializer = new GameJsonSerializer(game);
            localStorage.setItem("saveGame", serializer.serialize());
            // store the returned string in local storage
        }
    })

    const newGame = document.getElementById("new-game");
    newGame.addEventListener("click", event => {
        game = new Game(playerOneName.value, playerTwoName.value);
        playerOneName.value = "";
        playerTwoName.value = "";
        newGame.disabled = true;
        updateUI();
    })
    let saveGame = localStorage.getItem("saveGame");
    if (saveGame) {
        let deserializer = new GameJsonDeserializer(saveGame);
        game = deserializer.deserialize();
        updateUI();
    }
    // read value from local storage
    // if it is not null, then make desserializer and pass
    // the string from local storage to the constructor
    // use the deserialize method on it and 
    // game = deserializer.deserialize();

})

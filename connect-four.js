import { Game } from './game.js';
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
    
    const newGame = document.getElementById("new-game");
    newGame.addEventListener("click", event => {
        game = new Game(playerOneName.value, playerTwoName.value);
        playerOneName.value = "";
        playerTwoName.value = "";
        newGame.disabled = true;
        updateUI();
    })

})

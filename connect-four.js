let game = undefined;
window.addEventListener("DOMContentLoaded", (event) => {

    const playerOneName = document.getElementById("#player-1-name")
    const playerTwoName = document.getElementById("#player-2-name")

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
})

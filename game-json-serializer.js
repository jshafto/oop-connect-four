export class GameJsonSerializer {
    constructor(game) {
        this.game = game;
    }

    serialize() {
        // need to save:
        // game.name1
        // game.name2
        // game.currentPlayer
        let gameStateObj = {};
        gameStateObj["name1"] = this.game.name1;
        gameStateObj["name2"] = this.game.name2;
        gameStateObj["currentPlayer"] = this.game.currentPlayer;
        gameStateObj["movesList"] = this.game.movesList;
        // gameStateObj["boardArray"] = [];
        // for (let i = 0; i < 7 ; i ++){
        //     // make column
        //     gameStateObj["boardArray"].push([]);
        //     for (let j = 0 ; j < 6 ; j++ ){
        //         // push in item at t
        //         gameStateObj["boardArray"][i].push(this.game.getTokenAt(j,i));
        //     }
        
        // }

        return JSON.stringify(gameStateObj);
        // save board state
    }   

}
   
import { Game } from './game.js'

export class GameJsonDeserializer {
    constructor (string) {
        this.string = string;
    }

    deserialize () {
        let gameStateObj = JSON.parse(this.string);
        let game = new Game(gameStateObj.name1, gameStateObj.name2);

        for (let i = 0; i < gameStateObj.movesList.length; i ++ ) {
            game.playInColumn(gameStateObj.movesList[i]);
        }
        // for every column
        // put in each token in order
        //console.log(" Deserialize  :::", gameStateObj);
        // for (let colInd = 0; colInd < 7; colInd ++) {
        //     for (let rowInd = 0; rowInd < 6; rowInd ++) {
        //         game.playInColumn(colInd);
        //     }
        // }
        // return game;

        return game;

    }
}
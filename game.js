import { Column } from './column.js';

export class Game{ 
    constructor(playerOneName, playerTwoName){
        this.name1 = playerOneName; 
        this.name2 = playerTwoName;   
        this.currentPlayer = 1; 
        this.columns = [
            new Column(), 
            new Column(), 
            new Column(), 
            new Column(), 
            new Column(), 
            new Column(), 
            new Column()
        ]
    }
    getName() {
        return `${this.name1} vs ${this.name2}`;
    }
    playInColumn(columnInd) {
        this.columns[columnInd].add(this.currentPlayer);

        switch (this.currentPlayer) {
            case 1:
                this.currentPlayer=2;
                break;
            case 2:
                this.currentPlayer=1;
                break;       
        } 
       
    }

    getTokenAt(rowInd, columnInd) {
    // we pass game.getTokenAt a column index and a row index
    // then it calls column.getTokenAt with just a row index
       return this.columns[columnInd].getTokenAt(rowInd);
    }


} 
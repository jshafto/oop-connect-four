import { Column } from './column.js';
import { ColumnWinInspector } from './column-win-inspector.js'
import { RowWinInspector } from './row-win-inspector.js'
import { DiagonalWinInspector } from './diagonal-win-inspector.js'


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
        ];
        this.winnerNumber = 0;
    }
    getName() {
        if (this.winnerNumber ===3) { 
            return `${this.name1} ties with ${this.name2}`;
        }
        else if (this.winnerNumber === 2){
            return `${this.name2} wins!`;
        } else if (this.winnerNumber === 1) {
            return `${this.name1} wins!`;
        }

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

        this.checkForTie();
        this.checkForColumnWin();
        this.checkForRowWin();
        this.checkForDiagonalWin();

       
    }

    getTokenAt(rowInd, columnInd) {
    // we pass game.getTokenAt a column index and a row index
    // then it calls column.getTokenAt with just a row index
       return this.columns[columnInd].getTokenAt(rowInd);
    }

    isColumnFull (columnInd) {
        if (this.winnerNumber)  {
            return true;
        }
        return this.columns[columnInd].isFull();
    }

    checkForTie() {
        for (let i = 0 ; i < 7 ; i++){
            if (!this.isColumnFull(i)) return;
        }  
        this.winnerNumber = 3;
    }

    checkForColumnWin () {
        if (this.winnerNumber !== 0) return;
        for (let i = 0; i < 7; i ++) {
            let columnInspector = new ColumnWinInspector(this.columns[i]);
            if (columnInspector.inspect()) { 
                this.winnerNumber = columnInspector.inspect();
                return;
            }           
        }
        
    }

    checkForRowWin() {
        // console.log("Checking for Row Win")
        if (this.winnerNumber) return;
        for (let i = 0; i < 4; i ++) {
            let rowInspector = new RowWinInspector(this.columns.slice(i, i+4));
            // console.log(rowInspector.columns)
            // console.log(this.columns.slice(i, i+4))
            let rowInspect = rowInspector.inspect();
            // console.log("rowInspect: ", rowInspect);
            if (rowInspect){
                // console.log("winnerNumber: ", winnerNumber);
                this.winnerNumber = rowInspect;
                return;
            }
        }
    }

    checkForDiagonalWin () {
        if (this.winnerNumber) return;
        for (let i = 0; i < 4; i ++) {
            let diagonalInspector = new DiagonalWinInspector(this.columns.slice(i, i+4));
            let diagonalInspect = diagonalInspector.inspect();
            if (diagonalInspect) {
                this.winnerNumber = diagonalInspect;
                return;
            }
        }
    }
} 
export class Game{ 
    constructor(playerOneName, playerTwoName){
        this.name1 = playerOneName; 
        this.name2 = playerTwoName;    
    }
    getName() {
        return `${this.name1} vs ${this.name2}`;
    }
} 
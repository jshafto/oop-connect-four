export class Column {
    constructor () {
        this.tokens = [null, null, null, null, null, null];

    }
    add(playerNumber) {
        // takes player number and
        // stores it in hte bottom most entry in the column
        //this.tokens.push(playerNumber);
        // console.log(this.tokens)
        for (let i = 5 ;i >=0 ; i --) {
            if (!this.tokens[i]) {
                this.tokens[i]=playerNumber;
                return;
            }

        }
    } 

    getTokenAt (rowIndex) {
        // returns null if there's no token
        // returns the playerNumber of the token
        if(!this.tokens[rowIndex]) return null;
        return this.tokens[rowIndex];
    }

    isFull () {
        if (this.tokens[0]) {
            return true;
        }
        return false;
        
    }
}
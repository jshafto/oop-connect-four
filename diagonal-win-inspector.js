export class DiagonalWinInspector {
    constructor (columns) {
        this.columns = columns;
    }
    inspect () {
        // console.log(this.columns[0].tokens)
        // let test = this.columns[0].tokens;
        // loop through all six rows and check the token at 
        // each row in each of the columns

        for (let i = 0; i < 4; i ++) {
            let same = true;
            let player = this.columns[0].getTokenAt(i);

            for(let j = 0 ; j < 4; j++) {
                same = same && (this.columns[j].getTokenAt(i+j)=== player);
            }
            if (same && player !== null) return player;
        }

        for (let i = 2; i < 6; i ++) {
            let same = true;
            let player = this.columns[0].getTokenAt(i);

            for(let j = 3 ; j >= 0; j--) {
                same = same && (this.columns[j].getTokenAt(i-j)=== player);
            }
            if (same && player !== null) return player;
        }
        return 0;
    }
}

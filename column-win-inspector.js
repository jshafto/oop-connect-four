export class ColumnWinInspector {
    constructor(column) {
        this.column = column;
    }

    inspect() {
        // check to see if the column has four contiguous tokens (same player)
        // if yes, return player number
        // else return 0;
        let strCol = this.column.tokens.join("");
        if (strCol.includes("1111")) {return 1;}
        else if (strCol.includes("2222")){return 2;}
        return 0;
    };

}
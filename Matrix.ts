export class Matrix {


    // Errors

    static INVALID_MATRIX_ERROR = new Error("Matrix is not valid");
    static NON_SQUARE_MATRIX_ERROR = new Error("Matrix must be square");
    static SINGULAR_MATRIX_ERROR = new Error("Matrix is singular");
    static NOT_INTEGER_EXPONENT_ERROR = new Error("Exponent must be integer");
    static EMPTY_MATRIX_ERROR = new Error("Cannot use empty matrix with this operation");
    static MATRIX_NOT_A_VECTOR = new Error("Matrix has more than 1 row or more than 1 column");
    static MATRICES_NOT_MULTIPLIABLE = new Error("Matrices are not multipliable");
    static MATRICES_NOT_SUMMABLE = new Error("Cannot sum matrices of different dimensions");



    // Matrix positions

    private values: number[][] = [];



    // Creating a Matrix

    constructor(matrixArray?: (number[][] | number[] | number)) {

        if (typeof matrixArray === "string") {
            throw Matrix.INVALID_MATRIX_ERROR;
        }

        // Example: new Matrix();
        if (matrixArray == null) 
        {
            this.values = [];
        }
        
        // Example: new Matrix( -27.5 );
        else if (typeof matrixArray === "number" ) 
        {
            this.values = [ [matrixArray] ];
        } 

        // Example: new Matrix( [1,2,3,4,5,6] );
        else if (this.isNumberArray(matrixArray)) 
        {   
            this.values = (matrixArray.length == 0) ? [] : [ matrixArray ];
        } 

        // Example: new Matrix( [[1,2],[3,4]] );
        else if (this.isNumberArrayArray(matrixArray)) 
        {   
            if (!this.isCompleteMatrixArray(matrixArray)) {
                throw Matrix.INVALID_MATRIX_ERROR;
            }
            this.values = Matrix.copyFrom(matrixArray);
        }

        else {
            throw Matrix.INVALID_MATRIX_ERROR;
        }

    }



    // Static methods

    private static copyFrom(matrixArray: number[][]): number[][] {
        let copy: number[][] = [];
        for (let i=0; i<matrixArray.length; i++) {
            copy[i] = [];
            for (let j=0; j<matrixArray[0].length; j++) {
                copy[i][j] = matrixArray[i][j];
            }
        }
        return copy;
    }

    public static empty(): Matrix {
        return new Matrix([]);
    }

    /*  
        Fill with zeroes in the "undefined" positions
        or on the right side of the array (if necessary).

        Example input:
        [ [1,2,3], [,2,3], [2,3], [1,,3], [1,2,], [1,2], [,,3], [3], [1,,,,], [1], [,2,], [2], [,,], [] ];

        Array.length only counts the commas at the start or in the middle of the array. 
        The ending comma is for adding more elements so it doesn't count for calculating the length of the array.

        This function takes the length of the largest subarray for the rest ones and these are filled with zeros until that new length.

        In this example, the largest length is 4 (at position 9) so every subarray with a length smaller than 4 
        will be filled with zeros until reaching a length of 4.

        Result of processing the example above:
        [[1,2,3,0],[0,2,3,0],[2,3,0,0],[1,0,3,0],[1,2,0,0],[1,2,0,0],[0,0,3,0],[3,0,0,0],[1,0,0,0],[1,0,0,0],[0,2,0,0],[2,0,0,0],[0,0,0,0],[0,0,0,0]]
    */
    public static fillWithZero(matrixArray: IncompleteMatrixArray): number[][] {
        let newValues: number[][] = [];
        let maxLength = 0;
        for (let i=0; i<matrixArray.length; i++) {
            newValues[i] = [];

            for (let j=0; j<matrixArray[i].length; j++) {
                if (matrixArray[i][j] != null) {
                    newValues[i][j] = matrixArray[i][j] as number;
                } else {
                    newValues[i][j] = 0;
                }
            }
            
            if (matrixArray[i].length > maxLength) {
                maxLength = matrixArray[i].length;
            }
        }
        for (let i=0; i<newValues.length; i++) {
            let delta = maxLength - newValues[i].length;
            for (let j=0; j<delta; j++) {
                newValues[i].push(0);
            }
        }
        return newValues;
    }



    // Private methods

    private determinant123(): number {
        let total = 0;

        if (this.rowCount() == 1) {
            total = this.position(0, 0);
        }
        
        if (this.rowCount() == 2) {
            total = this.position(0, 0) * this.position(1, 1) 
                  - this.position(0, 1) * this.position(1, 0);
        }
    
        if (this.rowCount() == 3) {
            total =
              this.position(0, 0) * this.position(1, 1) * this.position(2, 2)
            + this.position(0, 1) * this.position(1, 2) * this.position(2, 0)
            + this.position(0, 2) * this.position(1, 0) * this.position(2, 1)
            - this.position(0, 2) * this.position(1, 1) * this.position(2, 0)
            - this.position(0, 0) * this.position(1, 2) * this.position(2, 1)
            - this.position(0, 1) * this.position(1, 0) * this.position(2, 2);
        }
        
        return total;
    }

    private determinantLaplace(): number {
        let total = 0;
        for (let i=0; i<this.rowCount(); i++) {
            total += this.position(0, i) * Math.pow(-1, 0+i) * this.removeRowAndColumn(0, i).determinant();
        }   
        return total;
    }

    private isCompleteMatrixArray(matrixArray: number[][]): boolean {
        let maxLength = -1;
        for (let i=0; i<matrixArray.length; i++) {
            if (matrixArray[i].length > maxLength) {
                maxLength = matrixArray[i].length;
            }
        }
        // Example: new Matrix([[],[],[]]);
        if (maxLength == 0) {
            return false;
        }
        // Example: new Matrix([[1,2],[3,4,5]]);
        for (let i=0; i<matrixArray.length; i++) {
            if (matrixArray[i].length < maxLength) {
                return false;
            }
        }
        // Example: new Matrix([[3,2],[3,,,-1]]);
        for (let i=0; i<matrixArray.length; i++) {
            for (let j=0; j<matrixArray[0].length; j++) {
                if (matrixArray[i][j] === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    private isNumberArray(array: unknown[]): array is number[] {
        try {
            return array.every((element) => typeof element === 'number');
        } catch {
            throw Matrix.INVALID_MATRIX_ERROR;
        }
        
    }

    private isNumberArrayArray(array: unknown[][]): array is number[][] {
        return array.every((element) => this.isNumberArray(element));
    }

    private removeRowAndColumn(i: number, j: number): Matrix {
        let n=-1, n2=-1;
        let aux: number[] = [];
        let reduced: number[][] = [];
        for (let x=0; x<this.rowCount(); x++) {
            for (let y=0; y<this.columnCount(); y++) {
                if (x != i && y != j) {
                    n++;
                    aux[n] = this.position(x, y);
                } 
            }
        }
        for (let x=0; x<this.rowCount()-1; x++) {
            reduced[x] = [];
            for (let y=0; y<this.columnCount()-1; y++) {
                n2++;
                reduced[x][y] = aux[n2];                                               
            }
        }
        return new Matrix(reduced);
    }



    // Literal data methods

    array(): number[][] {
        return Matrix.copyFrom(this.values);
    }

    position(i: number, j: number): number {
        return this.values[i][j];
    }



    // Row operations

    addRow(newRow: Matrix): Matrix {
        if (newRow.columnCount() != this.columnCount() && !this.isEmpty()) {
            // It's like an error but instead it just "returns the same matrix" without new data
            return this.multiplyByScalar(1);
        }
        let newValues = Matrix.copyFrom(this.values);
        newValues.push(newRow.values[0]);
        return new Matrix(newValues);
    }

    row(rowNumber: number): Matrix {
        if (this.isEmpty()) {
            return Matrix.empty();
        }
        let row: number[] = [];
        for (let i=0; i<this.columnCount(); i++) {
            row.push(this.position(rowNumber, i));
        }
        return new Matrix([row]);
    }

    rows(): Matrix[] {
        let rows : Matrix[] = [];
        for (let i=0; i<this.rowCount(); i++) {
            rows.push(this.row(i));
        }
        return rows;
    }

    rowCount(): number {
        return this.values.length;
    }

    /* deleteRow(rowNumber: number): Matrix */



    // Column operations

    addColumn(newColumn: Matrix): Matrix {
        return this.transpose().addRow(newColumn).transpose();
    }

    column(columnNumber: number): Matrix {
        return this.transpose().row(columnNumber).transpose();
    }

    columns(): Matrix[] {
        let columns : Matrix[] = [];
        for (let i=0; i<this.columnCount(); i++) {
            columns.push(this.column(i));
        }
        return columns;
    }

    columnCount(): number {
        if (this.rowCount() == 0) {
            return 0;
        }
        return this.values[0].length;
    }

    /* deleteColumn(columnNumber: number): Matrix */



    // "(Matrix) -> Matrix" operations

    adjoint(): Matrix {
        if (this.isEmpty()) {
            throw Matrix.EMPTY_MATRIX_ERROR;
        }
        return this.cofactors().transpose();
    }

    cofactors(): Matrix {
        if (this.isEmpty()) {
            throw Matrix.EMPTY_MATRIX_ERROR;
        }
        let signMapped: number[][] = [];
        for (let i=0; i<this.rowCount(); i++) {
            signMapped[i] = [];
            for (let j=0; j<this.columnCount(); j++) {
                signMapped[i][j] = Math.pow((-1), i+j) * this.position(i, j);
            }
        }
        return new Matrix(signMapped).minors();
    }

    inverse(): Matrix {
        if (this.isEmpty()) {
            return Matrix.empty();
        }
        if (!this.isSquare()) {
            throw Matrix.NON_SQUARE_MATRIX_ERROR;
        }
        if (this.determinant() == 0) {
            throw Matrix.SINGULAR_MATRIX_ERROR;
        }
        return this.adjoint().multiplyByScalar(1 / this.determinant());
    }

    minors(): Matrix {
        if (this.isEmpty()) {
            throw Matrix.EMPTY_MATRIX_ERROR;
        }
        let minored: number[][] = [];
        for (let i=0; i<this.rowCount(); i++) {
            minored[i] = [];
            for (let j=0; j<this.columnCount(); j++) {
                minored[i][j] = this.removeRowAndColumn(i,j).determinant();
            }
        }
        return new Matrix(minored);
    }

    transpose(): Matrix {
        if (this.isEmpty()) {
            return Matrix.empty();
        }
        let transposed: number[][] = [];
        for (let i=0; i<this.columnCount(); i++) {
            transposed[i] = [];
            for (let j=0; j<this.rowCount(); j++) {
                transposed[i][j] = this.position(j, i);
            }
        }
        return new Matrix(transposed);
    }



    // "(Matrix) -> Number" operations

    determinant(): number {
        if (this.isEmpty()) {
            return 1;
        }
        if (!this.isSquare()) {
            throw Matrix.NON_SQUARE_MATRIX_ERROR;
        }
        return this.rowCount() < 4 ? this.determinant123() : this.determinantLaplace();
    }
    
    // Can calculate for Nx1 and 1xN
    pythagorasNorm(): number {
        if (this.isEmpty()) {
            throw Matrix.MATRIX_NOT_A_VECTOR;
        }
        if (this.rowCount() != 1 && this.columnCount() != 1) {
            throw Matrix.MATRIX_NOT_A_VECTOR;
        }
        let aux = (this.rowCount() == 1) ? this : this.transpose();
        let squaresSum = 0;
        for (let j=0; j<aux.values[0].length; j++) {
            squaresSum += aux.values[0][j] ** 2;
        }
        return Math.sqrt(squaresSum);
    }

    trace(): (number | null) {
        if (this.isEmpty()) {
            return null;
        }
        let trace = 0;
        for (let i=0; i<this.rowCount(); i++) {
            for (let j=0; j<this.columnCount(); j++) {
                trace += (i == j) ? this.position(i, j) : 0;
            }
        }
        return trace;
    }



    // "(Matrix, Matrix) -> Matrix" operations

    subtract(matrix: Matrix): Matrix {
        return this.sum(matrix.multiplyByScalar(-1));
    }

    sum(matrix: Matrix): Matrix {
        if (this.isEmpty()) {
            return Matrix.empty();
        }
        if (!this.dimensionsEquals(matrix)) {
            throw Matrix.MATRICES_NOT_SUMMABLE;
        }
        let scaledValues: number[][] = [];
        for (let i=0; i<this.rowCount(); i++) {
            scaledValues[i] = [];
            for (let j=0; j<this.columnCount(); j++) {
                scaledValues[i][j] = this.position(i, j) + matrix.position(i, j);
            }
        }
        return new Matrix(scaledValues);
    }

    multiplyByMatrix(matrix: Matrix): Matrix {
        if ( (this.isEmpty() && !matrix.isEmpty()) || (!this.isEmpty() && matrix.isEmpty()) ) {
            throw Matrix.EMPTY_MATRIX_ERROR;
        }
        if (this.isEmpty() && matrix.isEmpty()) {
            return Matrix.empty();
        }
        if (this.columnCount() != matrix.rowCount()) {
            throw Matrix.MATRICES_NOT_MULTIPLIABLE;
        }
        let newValues: number[][] = [];
        for (let i=0; i<this.rowCount(); i++) {
            newValues[i] = [];
            for (let j=0; j<matrix.columnCount(); j++) {
                let scalarProduct = 0;
                for (let k=0; k<this.columnCount(); k++) {
                    scalarProduct += this.position(i, k) * matrix.position(k, j);
                }
                newValues[i][j] = scalarProduct;
            }
        }
        return new Matrix(newValues);
    }



    // "(Matrix, Number) -> Matrix" operations

    multiplyByScalar(scalar: number): Matrix {
        if (this.isEmpty()) {
            return Matrix.empty();
        }
        let scaledValues: number[][] = [];
        for (let i=0; i<this.rowCount(); i++) {
            scaledValues[i] = [];
            for (let j=0; j<this.columnCount(); j++) {
                scaledValues[i][j] = this.position(i, j) * scalar;
            }
        }
        return new Matrix(scaledValues);
    }

    pow(exponent: number): Matrix {
        if (this.isEmpty()) {
            return Matrix.empty();
        }
        if (!this.isSquare()) {
            throw Matrix.NON_SQUARE_MATRIX_ERROR;
        }
        if (exponent % 1 != 0) {
            throw Matrix.NOT_INTEGER_EXPONENT_ERROR;
        }
        if (exponent == 0) {
            return this.multiplyByMatrix(this.inverse());
        }
        if (exponent < 0) {
            return this.inverse().pow(Math.abs(exponent));
        }
        let newMatrix: Matrix = this;
        for(let n=1; n<exponent; n++) {
            newMatrix = newMatrix.multiplyByMatrix(this);
        }
        return newMatrix;
    }



    // Equality-check methods

    dimensionsEquals(matrix: Matrix): boolean {
        if ((this.isEmpty() && !matrix.isEmpty()) || (!this.isEmpty() && matrix.isEmpty())) {
            return false;
        } 
        if (this.isEmpty() && matrix.isEmpty()) {
            return true;
        }
        return this.rowCount() == matrix.rowCount() 
            && this.columnCount() == matrix.columnCount();
    }

    equals(matrix: Matrix): boolean {
        if (!this.dimensionsEquals(matrix)) {
            return false;
        }
        for (let i=0; i<this.rowCount(); i++) {
            for (let j=0; j<this.columnCount(); j++) {
                if (this.position(i, j) != matrix.position(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }



    // Status-check methods

    isEmpty(): boolean {
        return this.rowCount() == 0;
    }

    isSquare(): boolean {
        return this.rowCount() == this.columnCount();
    }

    isOrthogonal(): boolean {
        return this.inverse().equals(this.transpose());
    }

    isSymmetrical(): boolean {
        return this.equals(this.transpose());
    }



    // Output

    toString(): void {
        if (this.isEmpty()) {
            console.log([]);
        }
        for (let i=0; i<this.rowCount(); i++) {
            let row = "";
            for (let j=0; j<this.columnCount(); j++) {

                if (this.position(i, j) % 1 == 0.00) {
                    row += this.position(i, j).toFixed(0);
                } else {
                    row += this.position(i, j).toFixed(5);
                }

                if (j < this.columnCount() - 1) {
                    row += "  ";
                }
            }
            console.log("|  " + row + "  |");
        }
        console.log("\n");
    }

}



type IncompleteMatrixArray = ( (number | undefined)[] )[];

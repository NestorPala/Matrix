import { Matrix , IncompleteMatrixArray } from "../Matrix";

export class Tests03_ZeroFill {

    constructor(){}

    static runTests() {

        let z1: IncompleteMatrixArray = [ [1,2,3], [,2,3], [2,3], [1,,3], [1,2,], [1,2], [,,3], [3], [1,,,,], [1], [,2,], [2], [,,], [] ];
        let z1f = new Matrix(Matrix.fillWithZero(z1));
        z1f.toString();


        let z2: IncompleteMatrixArray = [ [1,,3], [,2,3], [,,-4], [] ];
        let z2f = new Matrix(Matrix.fillWithZero(z2));
        z2f.toString();
    }
}

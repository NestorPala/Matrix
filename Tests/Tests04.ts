import { Matrix } from "../Matrix";

export class Tests04_EmptyMatrix {

    constructor(){}

    static runTests() {

        // []^(-1) = []
        new Matrix([]).inverse().toString();


        // []*[] = []
        new Matrix([]).multiplyByMatrix(new Matrix([])).toString();


        // []*[]*[] = []
        new Matrix([]).pow(3).toString(); 


        // []^T = []
        new Matrix([]).transpose().toString();


        // det([]) = 1, by definition
        // See: https://es.frwiki.wiki/wiki/Matrice_vide
        console.log(new Matrix([]).determinant()); 


        //[]+[]+[] = 3*[] = []
        new Matrix([]).multiplyByScalar(3).toString(); 


        //elements of diagonal of [] are null so: trace([]) = null
        console.log(new Matrix([]).trace());


        // new Matrix([]).adjugate().toString();


        // new Matrix([]).cofactors().toString();


        // new Matrix([]).minors().toString();
            

        ////special case, must consider dimensions, but it is possible to calculate
        // new Matrix([]).multiplyByMatrix( new Matrix( [[1,2],[3,4]] ));
    }
}

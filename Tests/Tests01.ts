import { Matrix } from "../Matrix";

export class Tests01_Constructor {

    constructor(){}

    static runTests() {
        
        new Matrix();


        new Matrix(12);


        new Matrix([]);


        new Matrix([1,2,3,4,5]);


        new Matrix([[1,2],[3,4]]);


        // new Matrix([[],[]]); 


        // new Matrix([[1,2],[3,4,5]]);


        // new Matrix([[],[3,4,5]]);


        let m = new Matrix();
        console.log(m.values);


        let n = new Matrix([[1,2],[3,4]])
        console.log(n.values);


        let d = new Matrix(1);
        console.log(d.values);


        let e = new Matrix([1,2,3,4,5]);
        console.log(e.values);


        //let m1 = [1,2,3,"a"];
        //let f1 = new Matrix(m1);


        //let m2 = [[1], [2], [3], ["2"]];
        //let f2 = new Matrix(m2);


        //let m3 = [ [1], [2], [3], [4], [[1],[2]] ];
        //let f3 = new Matrix(m3);


        //let m4 = "pepe";
        //let f4 = new Matrix(m4);


        let g = new Matrix([]);
        console.log(g.values);


        //let h = new Matrix([[],[]]);
        //let i = new Matrix([[2],[]]);
        //let j = new Matrix([[2,4,5],[6,7,8],[]]);


        //let k = new Matrix([[2,4,5],[6,7,8],[1,2]]);
        //console.log(k.values);
    }
}

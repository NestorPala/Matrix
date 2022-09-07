import { Matrix } from "../Matrix";

export class Tests02_Methods {

    constructor(){}

    static runTests() {
        
        let o = new Matrix([[1,2],[3,4]])
        o.multiplyByScalar(10).toString();


        let q1 = new Matrix([[1,2,3],
                             [4,5,6],
                             [7,8,9]]);
        q1.transpose().toString();


        let q2 = new Matrix([4,5,6,7,8,9]);
        q2.transpose().toString();


        let s = new Matrix([[1,2,  36,  1],
                            [4,5, -24,  1],
                            [7,8,  90,  1],
                            [7,12, 90, -1]]);
        console.log(s.determinant());


        let t = new Matrix([[1,2,  36,  1],
                            [4,5, -24,  1],
                            [7,8,  90,  1],
                            [7,12, 90, -1]]);
        t.adjoint().toString();


        let u = new Matrix([[1,2,  36,  1],
                            [4,5, -24,  1],
                            [7,8,  90,  1],
                            [7,12, 90, -1]]);
        u.inverse().toString();


        let v = new Matrix([[8],[8],[8]]);
        v.toString();


        let w1 = new Matrix([[1,2,3],[4,5,6]]);
        let x1 = new Matrix([[8],[8],[8]]);
        w1.multiplyByMatrix(x1).toString();


        let w2 = new Matrix([[1,2,3,4],[5,6,7,8],[9,0,1,2]]);
        let x2 = new Matrix([[1,2],[3,4],[5,6],[7,8]]);
        w2.multiplyByMatrix(x2).toString();


        let y1 = new Matrix([[1,2],[3,4]]);
        y1.pow(3).toString();


        let y2 = new Matrix([[1,2],[3,4]]);
        y2.pow(0).toString();


        let y3 = new Matrix([[1,2],[3,4]]);
        y3.pow(-3).toString();


        // let y4 = new Matrix([[1,2],[3,4]]);
        // y4.pow(0.5).toString();


        let z = new Matrix([[1,2,3],[4,5,6],[7,8,9]]);
        console.log(z.trace());


        let a1 = new Matrix([[1,2],[3,4]]);
        a1.minors().toString();


        let a2 = new Matrix([[8, 6, -1],[3,4,5],[0,2,0]]);
        a2.minors().toString();


        let b = new Matrix([[8, 6, -1],[3,4,5],[0,2,0]]);
        b.cofactors().toString();


        let c = new Matrix([[8, 6, -1],[3,4,5],[0,2,0]]);
        c.adjoint().toString();


        let zz1 = new Matrix([[1,2], [3,4]]);
        let ww1 = new Matrix([[1000,1000], [1000,1000]]);
        zz1.add(ww1).toString();
        

        let zz2 = new Matrix([[1,2], [3,4]]);
        let ww2 = new Matrix([[1000,1000], [1000,1000]]);
        zz2.subtract(ww2).toString();


        let pp1 = new Matrix([[1,2,3],[4,5,6]]);
        let pp2 = new Matrix([[1,2,3],[4,5,6]]);
        console.log(pp1.dimensionsEquals(pp2));
        console.log(pp1.equals(pp2));


        let pp3 = new Matrix([[1,2,3],[4,5,6],[7,8,9]])
        console.log(pp3.dimensionsEquals(pp1));
        console.log(pp3.equals(pp1));
        console.log(pp3.dimensionsEquals(pp2));


        let pp4 = new Matrix([[8,7,-1],[12,16,50]]);
        console.log(pp1.dimensionsEquals(pp4));
        console.log(pp1.equals(pp4));


        let hh1 = new Matrix([[1,2,3],
                            [2,8,5],
                            [3,5,9]]);
        console.log(hh1.isSymmetrical());


        // let hh2 = new Matrix([[1,2,3],
        //                     [2,8,5],
        //                     [1,5,9]]);
        // // console.log(hh2.isSymmetrical());


        let hh3 = new Matrix([]);
        console.log(hh3.isSymmetrical());


        let hh4 = new Matrix(-12);
        console.log(hh4.isSymmetrical());


        let hh5 = new Matrix([1,2,3,4,5]);
        console.log(hh5.isSymmetrical());


        let or1 = new Matrix([[0.8,0.6,0],[-0.6,0.8,0],[0,0,1]]);
        console.log(or1.isOrthogonal());


        let or2 = new Matrix([[1,0,0],[0,1,0],[0,0,1]]);
        console.log(or2.isOrthogonal());


        let or3 = new Matrix([[3,6,0],[4,1,0],[0,-2,1]]);
        console.log(or3.isOrthogonal());


        // let or4 = new Matrix([[3,6,0],[4,1,0]]);
        //console.log(or4.isOrthogonal());


        let p1 = new Matrix([3,4]);
        console.log(p1.pythagorasNorm());
        console.log(p1.multiplyByScalar( 1/p1.pythagorasNorm() ).pythagorasNorm());


        let p2 = new Matrix([[3],[4]]);
        console.log(p2.pythagorasNorm());
        console.log(p2.multiplyByScalar( 1/p2.pythagorasNorm() ).pythagorasNorm());

        
        let p3 = new Matrix([3,4,5,6,7,8,9,10]);
        console.log(p3.multiplyByScalar(1 / p3.pythagorasNorm()).pythagorasNorm());


        let rz = new Matrix([   [3, 6, 0],
                                [4, 1, 0],
                                [0,-2, 1]    ]);
        rz.row(0).toString();
        rz.row(1).toString();
        rz.row(2).toString();
        rz.column(0).toString();
        rz.column(1).toString();
        rz.column(2).toString();


        let or11 = new Matrix([[0.8,0.6,0,4],[-0.6,0.8,0,4],[0,0,1,4]]);
        console.log(or11.rowCount());
        console.log(or11.columnCount());


        new Matrix([[1,2],[3,4]]).rows().forEach(row => row.toString());


        new Matrix([[1,2],[3,4]]).columns().forEach(column => column.toString());


        Matrix.empty().addRow(new Matrix([1,2,3,4])).addRow(new Matrix([5,6,7,8])).addRow(new Matrix([9,0,1,2])).toString();


        Matrix.empty().addRow(new Matrix([1,2,3,4])).addRow(new Matrix([5,6,7,8])).addRow(new Matrix([9,0,1,2])).transpose().toString();


        Matrix.empty().addColumn(new Matrix([1,2,3,4])).addColumn(new Matrix([1,2,3,4])).addColumn(new Matrix([1,2,3,4])).toString();
    }
}

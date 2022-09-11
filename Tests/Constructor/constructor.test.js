import { Matrix } from "../../Matrix";
const INVALID_MATRIX_ERROR = "Matrix is not valid";

describe("Constructor", () => {

    test("should not throw an error if called with an array of arrays of numbers", () => {
        const arrayOfArraysOfNumbers = [[1,2],[3,4]];
        expect(() => {
            new Matrix(arrayOfArraysOfNumbers);
        })
        .not.toThrow(INVALID_MATRIX_ERROR);
    });

    test("should not throw an error if called with an array of numbers", () => {
        const arrayOfNumbers = [1,2,3,4];
        expect(() => {
            new Matrix(arrayOfNumbers);
        })
        .not.toThrow(INVALID_MATRIX_ERROR);
    });

    test("should not throw an error if called with only one number", () => {
        const num = [1];
        expect(() => {
            new Matrix(num);
        })
        .not.toThrow(INVALID_MATRIX_ERROR);
    });

    test("should not throw an error if called with an empty array", () => {
        const emptyArray = [];
        expect(() => {
            new Matrix(emptyArray);
        })
        .not.toThrow(INVALID_MATRIX_ERROR);
    });

    test("should not throw an error if called with undefined", () => {
        expect(() => {
            new Matrix();
        })
        .not.toThrow(INVALID_MATRIX_ERROR);
    });

    test("should not throw an error if called with null", () => {
        expect(() => {
            new Matrix(null);
        })
        .not.toThrow(INVALID_MATRIX_ERROR);
    });

    test("should throw an error if called with a string", () => {
        expect(() => {
            new Matrix("abc123");
        })
        .toThrow(INVALID_MATRIX_ERROR);
    });

    test("should throw an error if called with an array of strings", () => {
        expect(() => {
            new Matrix(["abc123", "def456"]);
        })
        .toThrow(INVALID_MATRIX_ERROR);
    });

    test("should throw an error if called with an array that contains at least one string", () => {
        expect(() => {
            new Matrix(["1", 2, 3]);
        })
        .toThrow(INVALID_MATRIX_ERROR);
    });

    test("should throw an error if called with an array of arrays that contains at least one string", () => {
        expect(() => {
            new Matrix([[1,2,3],[4,5,6],[7,"8",9]]);
        })
        .toThrow(INVALID_MATRIX_ERROR);
    });
    
});

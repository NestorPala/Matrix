const matrix = require("../Matrix");


describe("Constructor", () => {
    test("should not throw an error if called with an array of arrays of numbers", () => {
        const arrayOfArraysOfNumbers = [[1,2],[3,4]];
        expect(() => {
            new Matrix(arrayOfArraysOfNumbers);
        })
        .not.toThrow("Matrix must contain numbers in every position");
    });
});

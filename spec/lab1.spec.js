const { capitalizeTextFirstChar, createArray } = require('../lab1.js');

describe("lab1.js", () => {
    describe("capitalizeTextFirstChar", () => {
        it("should return a string when given a string", () => {
            expect(typeof capitalizeTextFirstChar("hello")).toBe("string");
        });

        it("should capitalize the first letter of each word", () => {
            expect(capitalizeTextFirstChar("i'm ahmed ali")).toBe("I'm Ahmed Ali");
            expect(capitalizeTextFirstChar("one two three")).toBe("One Two Three");
        });

        it("should throw a TypeError when a number is passed", () => {
            expect(() => capitalizeTextFirstChar(123)).toThrowError(TypeError, "parameters should be string");
        });
    });

    describe("createArray", () => {
        it("should return an array", () => {
            expect(Array.isArray(createArray(3))).toBe(true);
        });

        it("createArray(2) should return an array of length 2 and include 1", () => {
            const arr = createArray(2);
            expect(arr.length).toBe(2);
            expect(arr).toContain(0);
            expect(arr).toContain(1);
        });

        it("createArray(3) should return an array of length 3 and not include 3", () => {
            const arr = createArray(3);
            expect(arr.length).toBe(3);
            expect(arr).toEqual([0, 1, 2]);
            expect(arr).not.toContain(3);
        });
    });
});

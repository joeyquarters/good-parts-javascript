// Write binary functions for add, sub, and mul

var add = function(a, b) {
    return a + b;
};

var sub = function(a, b) {
    return a - b;
}

var mul = function(a, b) {
    return a * b;
}

describe('Binary Functions', function() {
    it ('should add two numbers correctly', function() {
        expect(add(4, 5)).toEqual(9);
    });
    it ('should subtract two numbers correctly', function() {
        expect(sub(10, 5)).toEqual(5);
    });
    it ('should multiply two numbers correctly', function() {
        expect(mul(5, 5)).toEqual(25);
    });
});
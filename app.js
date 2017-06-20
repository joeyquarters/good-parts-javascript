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

// Write a function that takes an argument and returns a function
// that returns that argument

var identityf = function(arg) {
    return function() {
        return arg;
    }
}

describe('Identity Function', function() {
    it ('should take an argument and return a function that returns that argument', function() {
        var fn = identityf(47);
        expect(fn()).toEqual(47);
    });
});

// Write a function, addf, that adds from two invocations

var addf = function(first) {
    return function(second) {
        return first + second;
    }
}

describe('Double Invocation', function() {
    it ('should correctly add numbers from two invocations', function() {
        expect(addf(3)(4)).toEqual(7);
    });
});

// Write a function, liftf, that takes a binary function, and makes it callable
// with two invocations

var liftf = function(binary) {
    return function(first) {
        return function(second) {
            return binary(first, second);
        }
    }
}

describe('Make binary functions callable with two invocations', function() {
    it ('should correctly make `add()` callable with two invocations', function() {
        var addf = liftf(add);
        expect(addf(3)(4)).toEqual(7); 
    });
});

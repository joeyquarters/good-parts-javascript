const methods = module.exports = {};

//
// Binary Functions for add, subtract, and multiply
//

methods.add = function (a, b) {
    return a + b;
};

methods.sub = function (a, b) {
    return a - b;
};

methods.mul = function (a, b) {
    return a * b;
};


// Write a function that takes an argument and returns a function
// that returns that argument

methods.identityf = function (arg) {
    return function () {
        return arg;
    };
};

// Write a function, addf, that adds from two invocations

methods.addf = function (first) {
    return function (second) {
        return first + second;
    };
};

// Write a function, liftf, that takes a binary function, and makes it callable
// with two invocations

methods.liftf = function (binary) {
    return function (first) {
        return function (second) {
            return binary(first, second);
        };
    };
};

// Write a function `curry` that takes a binary function and an argument, and returns
// a function that can take a second argument

methods.curry = function (binary, arg1) {
    return function (arg2) {
        return binary(arg1, arg2);
    };
};
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

// Without writing any new functions, show three ways to make an `inc` function that
// takes an integer and returns it incremented by 1

methods.inc1 = function (num) {
    const add1 = methods.curry(methods.add, 1);
    return add1(num);
};

methods.inc2 = function (num) {
    const add1 = methods.liftf(methods.add);
    return add1(1)(num);
};

methods.inc3 = function (num) {
    return methods.addf(1)(num);
};

// Write a function `twice` that takes a binary function and returns an unary function that
// passes its argument to the binary function twice

methods.twice = function (binary) {
    return function (arg) {
        return binary(arg, arg);
    };
};

/**
 * A function that reverses the arguments of a binary function
 * @return {Function} A function whose arguments will be applied in reverse
 */
methods.reverse = function (binary) {
    return function(arg1, arg2) {
        return binary(arg2, arg1);
    };
};

/**
 * Takes two unary functions and returns a unary function that calls them both.
 * @return {Function}
 */
methods.composeu = function(unary1, unary2) {
    return function(arg) {
        return unary2(unary1(arg));
    };
};
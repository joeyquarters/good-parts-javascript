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
methods.composeu = function (unary1, unary2) {
    return function(arg) {
        return unary2(unary1(arg));
    };
};

/**
 * Takes two binary functions and returns a function that calls them both
 * @return {Function}
 */
methods.composeb = function (binary1, binary2) {
    return function (a, b, c) {
        return binary2(binary1(a,b), c);
    };
};

/**
 * Allows a binary function to be called a limited number of times
 * @return {Function} The function will return undefined when the limit is reached
 */
methods.limit = function (binary, limit) {
    let called = 0;

    return function (a,b) {
        if (called < limit) {
            called = called + 1;
            return binary(a,b);
        }
    };
};

/**
 * Produces a generator function that produces a series of values when called
 * @param  {Int} num The number to start the generator from
 * @return {Function}     A function that when called will produce the next integer in the series
 */
methods.from = function (start) {
    return function () {
        let next = start;
        start += 1;
        return next;
    };
};

/**
 * Takes a generator and an end value, and returns a generator that will produce
 * numbers up to that limit
 * @param  {Function} generator A generator function
 * @param  {Int} limit          Limit of the generator function
 * @return {Function}           A limited generator function
 */
methods.to = function (generator, limit) {
    return function () {
        let num = generator();
        if (num < limit) {
            return num;
        }
    };
};

/**
 * Produces a generator that produces values in a range
 * @param  {Int}      start  Start value
 * @param  {Int}      end    End value
 * @return {Function}        Generator function
 */
methods.fromTo = function (start, end) {
    return methods.to(methods.from(start), end);
};

/**
 * Takes an array and an optional generator, 
 * then produces a generator that produces elements from the array
 * @param  {Array}    arr       
 * @param  {Function} generator 
 * @return {Function}           
 */
methods.element = function (arr, gen) {
    if (gen === undefined) {
        gen = methods.fromTo(0, arr.length);
    }

    return function () {
        let index = gen();
        if (index !== undefined) {
            return arr[index];
        }
    };
};
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

/**
 * Receives a generator and an array, then produces a function that will collect
 * results in that array
 * @param  {Function} gen A generator function
 * @param  {Array}    arr An array to collect results in
 * @return {Function}     Generator function to be called
 */
methods.collect = function (gen, arr) {
    return function () {
        let value = gen();
        if (value !== undefined) {
            arr.push(value);
        }
        return value;
    };
};

/**
 * Receives a generator and a predicate function, then returns a generator
 * function that only returns values approved by the predicate
 * @param  {Function} gen   Generator function
 * @param  {Function} pred  Predicate function
 * @return {Function}       
 */
methods.filter = function (gen, pred) {
    return function () {
        let value;
        do {
            value = gen();
        } while (value !== undefined && !pred(value));
        return value;
    };
};

/**
 * Takes two generators and produce a generator that combines the sequences
 * @param  {Function} gen1 
 * @param  {Function} gen2
 * @return {Function}     
 */
methods.concat = function (gen1, gen2) {
    return function () {
        let value = gen1();
        if (value === undefined) {
            value = gen2();
        }
        return value;
    };
};

/**
 * Creates a generator function that generates unique symbols with a prefix
 * @param  {String}    prefix  The prefix of the generated unique symbol
 * @return {Function}          Generator function that returns a symbol string
 */
methods.gensymf = function (prefix) {
    const sym = methods.from(1);
    return function () {
        return prefix + sym();
    };
};

/**
 * Creates a generator function that returns the next number in the fibonacci sequence
 * @param  {Int}      a  First seed number
 * @param  {Int}      b  Second seed number
 * @return {Function}
 */
methods.fibonaccif = function (a, b) {
    return function () {
        let next = a;
        a = b;
        b += next;
        return next;
    };
};

/**
 * Returns an object containing an up() and down() function to manipulate the counter
 * @param {Number}   counter  The initial value of the counter
 * @return {Object}
 */
methods.counter = function (counter) {
    return {
        up: function () {
            counter += 1;
            return counter;
        },
        down: function () {
            counter -= 1;
            return counter;
        }
    };
};

/**
 * Takes in a binary function and returns an object with an invoke and revoke method
 * @param  {Function} bin A binary function
 * @return {Object}
 */
methods.revocable = function (bin) {
    let callable = true;
    return {
        invoke: function (a, b) {
            if (callable) {
                return bin(a, b);
            }
        },
        revoke: function () {
            callable = false;
        }
    };
};

/**
 * Takes a value and optional source string and returns an object
 * @param  {*} value - Any value you want
 * @param  {string} source - Optional source description
 * @return {object}
 */
methods.m = function (value, source) {
    return {
        value: value,
        source: (typeof source === 'string') 
            ? source
            : String(value)
    };
};

/**
 * Takes two m objects and returns an m object of both
 * @param  {object} m1 
 * @param  {object} m2
 * @return {object}   
 */
methods.addm = function (m1, m2) {
    return methods.m(
        m1.value + m2.value,
        `(${m1.source}+${m2.source})`
    );
};

/**
 * Takes a binary function and a string and returns a function that acts
 * on m objects
 * @param  {function} bin - binary function
 * @param  {string} sign - string that signifies what the binary function does
 * @return {function}
 */
methods.liftm = function (bin, sign) {
    return function (a, b) {
        a = (typeof a === 'object') ? a : methods.m(a);
        b = (typeof b === 'object') ? b : methods.m(b);
        return methods.m(
            bin(a.value, b.value),
            `${a.source}${sign}${b.source}`
        );
    };
};
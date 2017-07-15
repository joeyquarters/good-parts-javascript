/* eslint-env jasmine */

var methods = require('../app.js');

describe('Binary Functions', function () {
    it ('should add two numbers correctly', function () {
        expect(methods.add(4, 5)).toEqual(9);
    });
    it ('should subtract two numbers correctly', function () {
        expect(methods.sub(10, 5)).toEqual(5);
    });
    it ('should multiply two numbers correctly', function () {
        expect(methods.mul(5, 5)).toEqual(25);
    });
});

describe('Identity Function', function () {
    it ('should take an argument and return a function that returns that argument', function () {
        const fn = methods.identityf(47);
        expect(fn()).toEqual(47);
    });
});

describe('Double Invocation', function () {
    it ('should correctly add numbers from two invocations', function () {
        expect(methods.addf(3)(4)).toEqual(7);
    });
});

describe('Make binary functions callable with two invocations', function () {
    it ('should correctly make `add()` callable with two invocations', function () {
        const addf = methods.liftf(methods.add);
        expect(addf(3)(4)).toEqual(7); 
    });
});

describe('Curry Function', function () {
    it ('should correctly perform a curry with add()', function() {
        const add3 = methods.curry(methods.add, 3);
        expect(add3(4)).toEqual(7);
    });
    it ('should correctly perform a curry with mul', function () {
        expect(methods.curry(methods.mul, 5)(6), 30);
    });
});

describe('Multiple `inc` functions', function () {
    it ('should correctly add 1 with inc1', function() {
        expect(methods.inc1(5)).toEqual(6);
    });
    it ('should correctly add 1 with inc2', function() {
        expect(methods.inc2(5)).toEqual(6);
    });
    it ('should correctly add 1 with inc3', function() {
        expect(methods.inc3(5)).toEqual(6);
    });
});

describe('Twice function', function () {
    it ('should correctly create a `double` function', function () {
        const doubl = methods.twice(methods.add);
        expect(doubl(11)).toEqual(22);
    });
    it ('should correctly create a `square` function', function () {
        const square = methods.twice(methods.mul);
        expect(square(5)).toEqual(25);
    });
});

describe('Reverse function', function () {
    it('should correctly apply reversed arguments to the sub function', function () {
        const bus = methods.reverse(methods.sub);
        expect(bus(2, 3)).toEqual(1);
    });
});

describe('Composeu function', function () {
    it('should correctly calculate the result of two unary functions', function () {
        const square = methods.twice(methods.mul);
        const doubl = methods.twice(methods.add);
        const doubleSquare = methods.composeu(doubl, square);
        expect(doubleSquare(5)).toEqual(100);
    });
});

describe('Composeb function', function () {
    it('should correctly calculate the result of two binary functions', function () {
        const addMul = methods.composeb(methods.add, methods.mul);
        expect(addMul(2, 3, 7)).toEqual(35);
    });
});

describe('Limit function', function () {
    it('should effectively limit the number of times a function can be called', function () {
        const add_ltd = methods.limit(methods.add, 2);
        expect(add_ltd(3, 4)).toEqual(7);
        expect(add_ltd(4, 6)).toEqual(10);
        expect(add_ltd(3, 4)).toEqual(undefined);
    });
});

describe('From function', function () {
    it('should correctly produce the generated numbers', function () {
        const index = methods.from(1);
        expect(index()).toEqual(1);
        expect(index()).toEqual(2);
        expect(index()).toEqual(3);
    });
});

describe('To function', function () {
    it('should produce a limited generator', function () {
        const index = methods.to(methods.from(1), 3);
        expect(index()).toEqual(1);
        expect(index()).toEqual(2);
        expect(index()).toEqual(undefined);
    });
});

describe('FromTo function', function () {
    it('should produce a limited generator function', function () {
        const generator = methods.fromTo(0, 3);
        expect(generator()).toEqual(0);
        expect(generator()).toEqual(1);
        expect(generator()).toEqual(2);
        expect(generator()).toEqual(undefined);
    });
}); 

describe('Element function', function () {
    it('should only produce elements while the generator function does', function () {
        const letters = ['a', 'b', 'c', 'd', 'e'];
        const element = methods.element(letters, methods.fromTo(1, 3));
        expect(element()).toEqual('b');
        expect(element()).toEqual('c');
        expect(element()).toEqual(undefined);
    });
    it('should only produce elements that exist in the array', function () {
        const letters = ['a', 'b', 'c', 'd', 'e'];
        const element = methods.element(letters, methods.fromTo(4, 7));
        expect(element()).toEqual('e');
        expect(element()).toEqual(undefined);
        expect(element()).toEqual(undefined);
    });
    it('should work without a generator function', function () {
        const letters = ['a', 'b'];
        const element = methods.element(letters);
        expect(element()).toEqual('a');
        expect(element()).toEqual('b');
        expect(element()).toEqual(undefined);
    });
});
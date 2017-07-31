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

describe('Collect function', function () {
    it('should correctly collect results in the array', function () {
        const arr = [];
        const gen = methods.collect(methods.fromTo(0, 2), arr);
        expect(gen()).toEqual(0);
        expect(gen()).toEqual(1);
        expect(gen()).toEqual(undefined);
        expect(arr).toEqual([0, 1]);
    });
});

describe('Filter function', function () {
    const thirds = (value) => (value % 3) === 0;

    it('should have a functioning predicate', function () {
        expect(thirds(0)).toEqual(true);
        expect(thirds(3)).toEqual(true);
        expect(thirds(5)).toEqual(false);
    });

    it('should only return value that meet the filter', function () {
        const gen = methods.filter(methods.fromTo(0, 5), thirds);
        expect(gen()).toEqual(0);
        expect(gen()).toEqual(3);
        expect(gen()).toEqual(undefined);
    });
});

describe('Concat function', function () {
    it('should correctly concatenate two generator sequences', function () {
        const con = methods.concat(methods.fromTo(0, 3), methods.fromTo(0, 2));
        expect(con()).toEqual(0);
        expect(con()).toEqual(1);
        expect(con()).toEqual(2);
        expect(con()).toEqual(0);
        expect(con()).toEqual(1);
        expect(con()).toEqual(undefined);
    });
});

describe('Gensymf function', function () {
    it('should generate unique symbols with the correct prefix', function () {
        const geng = methods.gensymf('G');
        const genh = methods.gensymf('H');
        expect(geng()).toEqual('G1');
        expect(geng()).toEqual('G2');
        expect(genh()).toEqual('H1');
        expect(genh()).toEqual('H2');
    });
});

describe('Fibonacci function', function () {
    it('should correctly generate a fibonacci sequence', function () {
        const fib = methods.fibonaccif(0, 1);
        expect(fib()).toEqual(0);
        expect(fib()).toEqual(1);
        expect(fib()).toEqual(1);
        expect(fib()).toEqual(2);
        expect(fib()).toEqual(3);
        expect(fib()).toEqual(5);
    });
});

describe('Counter function', function () {
    it('should expose correctly functioning up and down methods', function () {
        const object = methods.counter(10);
        const up = object.up;
        const down = object.down;
        expect(up()).toEqual(11);
        expect(down()).toEqual(10);
        expect(down()).toEqual(9);
        expect(up()).toEqual(10);
    });
});

describe('Revocable object & methods', function () {
    const rev = methods.revocable(methods.add);
    const add_rev = rev.invoke;
    it('should have a correctly functioning invoke method', function () {
        expect(add_rev(3, 4)).toEqual(7);
    });
    it('should have a correctly functioning revoke method', function () {
        rev.revoke();
        expect(add_rev(3, 4)).toEqual(undefined);
    });
});

describe('Addm function', function () {
    it('should add two m objects together correctly', function () {
        const m1 = methods.m(3);
        const m2 = methods.m(4);
        const result = methods.addm(m1, m2);
        const expected = {'value': 7, 'source': '(3+4)'};
        expect(result).toEqual(expected);
    });
});

describe('Liftm function', function () {
    it('should correctly produce a function for journaling m object arithmetic', function () {
        const mulm = methods.liftm(methods.mul, '*');
        const result = mulm(methods.m(3), methods.m(4));
        const expected = {'value': 12, 'source': '3*4'};
        expect(result).toEqual(expected);
    });
    it('should produce a function that does not need to accept m objects', function () {
        const mulm = methods.liftm(methods.mul, '*');
        const expected = {'value': 12, 'source': '3*4'};
        expect(mulm(3, 4)).toEqual(expected);
    });
});

describe('Exp function', function () {
    it('should return non-array arguments', function () {
        expect(methods.exp(45)).toEqual(45);
    });
    it('should correctly evaluate array expressions', function () {
        expect(methods.exp([methods.mul, 5, 11])).toEqual(55);
    });
    it('should correctly evaluate nested array expressions', function () {
        const nested = [
            Math.sqrt,
            [
                methods.add,
                [methods.square, 3],
                [methods.square, 4]
            ]
        ];
        expect(methods.exp(nested)).toEqual(5);
    });
});

describe('Addg function', function () {
    it('should correctly add until it sees an empty invocation', function () {
        expect(methods.addg()).toEqual(undefined);
        expect(methods.addg(2)()).toEqual(2);
        expect(methods.addg(2)(7)()).toEqual(9);
        expect(methods.addg(3)(0)(4)()).toEqual(7);
        expect(methods.addg(1)(2)(4)(8)()).toEqual(15);
    });
});
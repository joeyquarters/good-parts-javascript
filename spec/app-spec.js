/* eslint-env node, es6, jasmine */

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
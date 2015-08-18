'use strict';

var
    actual,
    expected,
    data,
    squish = require('../index'),
    expect = require('chai').expect;

describe('Basic Usage', function () {

    beforeEach(function () {
        actual = expected = undefined;
    });

    it('should return any non-object value unmodified Under default options', function () {
        expect(squish(undefined)).to.equal(undefined);
        expect(squish(null)).to.equal(null);
        expect(squish('abc')).to.equal('abc');
        expect(squish(123)).to.equal(123);
        expect(squish(true)).to.equal(true);
        expect(squish(false)).to.equal(false);
        expect(squish([1, 2, 3])).to.deep.equal([1, 2, 3]);

        expect(squish({ foo: { bar: 'baz' } })).to.deep.equal({ 'foo.bar': 'baz' });
    });

    it('should return any non-object/array value unmodified Under includeArrays option', function () {
        expect(squish(undefined, { includeArrays: true })).to.equal(undefined);
        expect(squish(null, { includeArrays: true })).to.equal(null);
        expect(squish('abc', { includeArrays: true })).to.equal('abc');
        expect(squish(123, { includeArrays: true })).to.equal(123);
        expect(squish(true, { includeArrays: true })).to.equal(true);
        expect(squish(false, { includeArrays: true })).to.equal(false);

        expect(squish([1, 2, 3], { includeArrays: true })).to.deep.equal({ '0': 1, '1': 2, '2': 3 });
        expect(squish({ foo: { bar: 'baz' } }, { includeArrays: true })).to.deep.equal({ 'foo.bar': 'baz' });
    });

});

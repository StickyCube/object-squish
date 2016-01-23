'use strict';

var
  data,
  actual,
  expected,
  squish = require('../index'),
  expect = require('chai').expect;

describe('Array Options', function () {
  beforeEach(function () {
    data = {
      foo: { bar: 'baz' },
      fizz: [1, 2, 3]
    };
    actual = expected = undefined;
  });

  it('Should not flatten arrays', function () {
    actual = squish(data);
    expected = { 'foo.bar': 'baz', fizz: [1, 2, 3] };

    expect(actual).to.deep.equal(expected);
  });

  it('Should flatten Arrays', function () {
    actual = squish(data, { includeArrays: true });
    expected = {
      'foo.bar': 'baz',
      'fizz.0': 1,
      'fizz.1': 2,
      'fizz.2': 3
    };

    expect(actual).to.deep.equal(expected);
  });
});

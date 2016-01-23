'use strict';

var
  actual,
  expected,
  data,
  squish = require('../index'),
  expect = require('chai').expect;

describe('Seperator Options', function () {
  beforeEach(function () {
    actual = expected = undefined;
  });

  it('Should respect the seperator option', function () {
    data = {
      foo: { bar: 'baz' },
      fizz: [1, 2, 3]
    };

    actual = squish(data, { seperator: '$' });
    expected = { 'foo$bar': 'baz', fizz: [1, 2, 3] };
    expect(actual).to.deep.equal(expected);
  });
});

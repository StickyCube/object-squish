'use strict';

var
  actual,
  expected,
  data,
  squish = require('../index'),
  expect = require('chai').expect;

describe('stopWhen option', function () {
  beforeEach(function () {
    actual = expected = undefined;
  });

  it('Should stop when the predicate returns true', function () {
    data = {
      foo: 123,
      bar: { baz: 'abc' },
      baz: { foo: { stopHere: true } }
    };

    var predicate = function (val) {
      return (typeof val === 'object') && ('stopHere' in val);
    };

    actual = squish(data, { stopWhen: predicate });
    expected = {
      foo: 123,
      'bar.baz': 'abc',
      'baz.foo': { stopHere: true }
    };

    expect(actual).to.deep.equal(expected);
  });
});

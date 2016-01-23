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

  it('Should respect the depth option', function () {
    data = {
      foo: {
        bar: {
          baz: {
            fizz: 'buzz'
          }
        }
      }
    };

    actual = squish(data, { depth: 2 });
    expected = {
      'foo.bar.baz': { fizz: 'buzz' }
    };

    expect(actual).to.deep.equal(expected);
  });
});

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

  it('Should make all keys lowercase when "lowercase" is provided', function () {
    data = {
      FOO: { BAR: 'baz' }
    };

    actual = squish(data, { modifyKey: 'lowercase' });
    expected = { 'foo.bar': 'baz' };

    expect(actual).to.deep.equal(expected);
  });

  it('Should make all keys uppercase when "uppercase" is provided', function () {
    data = {
      foo: { bar: 'baz' }
    };

    actual = squish(data, { modifyKey: 'uppercase' });
    expected = { 'FOO.BAR': 'baz' };

    expect(actual).to.deep.equal(expected);
  });

  it('Should not upper/lower case custom seperators', function () {
    data = {
      foo: { bar: 'baz' }
    };

    actual = squish(data, { modifyKey: 'uppercase', seperator: 'a' });
    expected = { 'FOOaBAR': 'baz' };

    expect(actual).to.deep.equal(expected);
  });

  it('Should use a function if provided', function () {
    var mutate = function (v) {
      return v.replace(/foo/, 'fizz');
    };

    data = {
      foo: { bar: 'baz' }
    };

    actual = squish(data, { modifyKey: mutate });
    expected = { 'fizz.bar': 'baz' };

    expect(actual).to.deep.equal(expected);
  });
});

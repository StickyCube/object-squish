'use strict';

function isValue (v) {
  return v !== undefined && v !== null;
}

function isNumber (v) {
  return isValue(v) && v.constructor === Number;
}

function isArray (v) {
  return isValue(v) && v.constructor === Array;
}

function isObject (v) {
  return isValue(v) && v.constructor === Object;
}

function isFunction (v) {
  return isValue(v) && v.constructor === Function;
}

function SteamRoller (options) {
  options = options || {};

  this.result = {};

  if (isFunction(options.stopWhen)) {
    this.stopWhen = options.stopWhen;
  }

  if (isValue(options.includeArrays)) {
    this.includeArrays = options.includeArrays;
  }

  if (isNumber(options.depth) && options.depth >= 0) {
    this.depth = options.depth;
  }

  if (isValue(options.seperator)) {
    this.seperator = options.seperator;
  }

  if (isValue(options.modifyKey)) {
    switch (options.modifyKey) {
      case 'uppercase':
        this.modifyKey = function (v) {
          return v.toUpperCase();
        };
        break;

      case 'lowercase':
        this.modifyKey = function (v) {
          return v.toLowerCase();
        };
        break;

      default:
        this.modifyKey = options.modifyKey;
        break;
    }
  }
}

SteamRoller.prototype = {
  constructor: SteamRoller,
  result: null,
  includeArrays: false,
  depth: Infinity,
  seperator: '.'
};

SteamRoller.prototype.modifyKey = function (key) {
  return key;
};

SteamRoller.prototype.isEnumerable = function (v) {
  if (this.includeArrays) {
    return isObject(v) || isArray(v);
  }
  return isObject(v);
};

SteamRoller.prototype.limitReached = function (depth) {
  return depth >= this.depth;
};

SteamRoller.prototype.stopWhen = function (obj) {
  return false;
};

SteamRoller.prototype.flatten = function (original, prefix, depth) {
  var path,
    key,
    value;

  if (!isValue(prefix)) {
    prefix = '';
  } else {
    prefix += this.seperator;
  }

  if (!isValue(depth)) {
    depth = 0;
  } else {
    depth += 1;
  }

  for (key in original) {
    value = original[key];
    path = prefix + this.modifyKey(key);

    if (!this.limitReached(depth) && !this.stopWhen(value) && this.isEnumerable(value)) {
      this.flatten(value, path, depth);
    } else {
      this.result[path] = original[key];
    }
  }

  return this.result;
};

module.exports = function (value, options) {
  var roller = new SteamRoller(options);

  if (!roller.isEnumerable(value)) {
    return value;
  }

  return roller.flatten(value);
};

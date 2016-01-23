# Object-Squish

> A node.js utility for flattening objects to a single level.

## Getting Started

Install object-squish via npm:
```
npm install object-squish --save
```

Then require in your file
```javascript
var squish = require('object-squish');
```

## Usage

Use object-squish to collapse pesky nested objects down to one level.

```javascript

var data = {
  spiders: { are: 'ok' },
  they: {
    just: {
      want: 'to',
      be: 'friends'
    }
  }
};

var flattened = squish(data);

// === Outputs ->
{
  'spiders.are': 'ok',
  'they.just.want': 'to',
  'they.just.be': 'friends'
}

```

arrays are skipped over by default but can be included by passing the `includeArrays` option.

```javascript

var data = { spiders: [1, 2, 3] };

var flattened = squish(data, { includeArrays: true });
// === Outputs ->
{
    'spiders.0': 1,
    'spiders.1': 2,
    'spiders.2': 3,
}

```

See below for a comprehensive list of Options

## Options

#### options.depth
Type: `Number`
Default value: `Infinity`

Set the depth at which to stop flattening.

#### options.includeArrays
Type: `Boolean`
Default value: `false`

Set whether to flatten arrays, keys will appear as array indexes `0, 1, 2, ...`.

#### options.seperator
Type: `String`
Default value: `'.'`

Set the seperating character/sequence in the derived path

#### options.modifyKey

Change the keys of the object, this can be one of:

`'lowercase'` -> ensure all keys are lowercase

`'uppercase'` -> ensure all keys are uppercase

`Function` -> a function which is passed the key and returns the modified key

#### options.stopWhen

A predicate, called with the object being processed, returning a boolean indicating whether to descend into the object or not.

## Usage Examples

#### Example using modifyKey

```javascript
var data = {
  spiders: { are: 'ok' },
  they: {
    just: {
      want: 'to',
      be: 'friends'
    }
  }
};

// we can use modifyKey to make all the keys uppercase
var uppercased = squish(data, { modifyKey: 'uppercase' });
// === Outputs ->
{
  'SPIDERS.ARE': 'ok',
  'THEY.JUST.WANT': 'to',
  'THEY.JUST.BE': 'friends'
}


// or use a function to perform more complex processing
var mutate = function (key) {
    return key.replace('are', 'arent');
};

var modified = squish(data, { modifyKey: mutate });
// === Outputs ->
{
    'spiders.arent': 'ok',
    'they.just.want': 'to',
    'they.just.be': 'friends'
}

```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Release History
* v 1.0.0 - Initial Release

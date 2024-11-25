# Collect Me

A TypeScript implementation of a Laravel-inspired `Collection` class, providing powerful utility methods for handling arrays of items in a more expressive way.

## Installation

You can install the package via npm:

```bash
npm install @mysticwave/collect-me
```

## Usage

Importing the Collection class
```javascript
import { collect, Collection } from '@mysticwave/collect-me';
```

## Creating a Collection

You can create a new collection by passing an array to the collect function:
```javascript
const items = collect([1, 2, 3]);
// or
const items = new Collection([1, 2, 3]);
```

## Available Methods

Here is a list of the methods available in the Collection class:

### all()
Returns all items in the collection.
```javascript
items.get(); // [1, 2, 3]
```

### get()
Alias for the `all` method. Returns all items in the collection.
```javascript
items.get(); // [1, 2, 3]
```

### entries()
Returns an array of key-value pairs for items in the collection.
```javascript
items.entries(); // [[0, 1], [1, 2], [2, 3]]
```

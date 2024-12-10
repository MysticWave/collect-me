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
import { collect, Collection } from "@mysticwave/collect-me";
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
items.all(); // [1, 2, 3]
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

### first()

Returns the first item in the collection.

```javascript
items.first(); // 1
```

### last()

Returns the last item in the collection.

```javascript
items.last(); // 3
```

### take(count)

Returns a new collection with a specified number of items.

```javascript
items.take(2); // [1, 2]
```

### push(item)

Adds an item to the collection.

```javascript
items.push(4); // [1, 2, 3, 4]
```

### map(callback)

Applies a callback function to each item in the collection and updates the items with the results.

```javascript
items.map((item) => item * 2); // [2, 4, 6]
```

### filter(callback)

Filters the items in the collection based on a callback function.

```javascript
items.filter((item) => item > 1); // [2, 3]
```

### reduce(callback, initialValue)

Reduces the collection to a single value using a callback function.

```javascript
items.reduce((total, item) => total + item, 0); // 6
```

### reverse()

Reverses the order of the items in the collection.

```javascript
items.reverse(); // [3, 2, 1]
```

### chunk()

Splits the collection into smaller chunks of a given size.

```javascript
const items = collect([1, 2, 3, 4, 5]);
const chunks = items.chunk(2); // [[1, 2], [3, 4], [5]]
```

### unique(key?)

Removes duplicate values from the collection.

```javascript
const items = collect([1, 2, 2, 3]);
const uniqueItems = items.unique(); // [1, 2, 3]

const objects = collect([{ id: 1 }, { id: 2 }, { id: 1 }]);
const uniqueObjects = objects.unique("id"); // [{ id: 1 }, { id: 2 }]
```

### contains(value)

Checks if a given value exists in the collection.

```javascript
const items = collect([1, 2, 3]);
const hasTwo = items.contains(2); // true
const hasFour = items.contains(4); // false
```

### diff(values)

Finds the difference between the collection and another array or collection.

```javascript
const items = collect([1, 2, 3]);
const difference = items.diff([2, 3, 4]); // [1]
```

### merge(values)

Merges the collection with another array or collection.

```javascript
const items = collect([1, 2]);
const merged = items.merge([3, 4]); // [1, 2, 3, 4]
```

### isEmpty()

Checks if the collection is empty.

```javascript
collect([]).isEmpty(); // true
collect([1, 2, 3]).isEmpty(); // false
```

### isNotEmpty()

Checks if the collection is not empty.

```javascript
collect([]).isNotEmpty(); // false
collect([1, 2, 3]).isNotEmpty(); // true
```

### where(condition, operatorOrValue, value?)

Filters the collection where a specific condition is met.

```javascript
items.where("id", 1); // [{ id: 1 }]
items.where("id", ">", 1); // [{ id: 2 }, {id: 3}]

items.where("name", "LIKE", "%anderson"); // [{name: 'Thomas Anderson'}]
items.where("name", "LIKE", "Thomas%"); // [{name: 'Thomas Anderson'}]
items.where("name", "LIKE", "%mas An%"); // [{name: 'Thomas Anderson'}]
```

| operator  | description                          | example |           |
| --------- | ------------------------------------ | ------- | --------- |
| =         | is equal                             | a == b  | (default) |
| <         | lower than                           | a < b   |           |
| <=        | lower or equal                       | a <= b  |           |
| >         | higher than                          | a > b   |           |
| >=        | higher or equal                      | a >= b  |           |
| !=        | not equal                            | a != b  |           |
| ==        | strictly equal                       | a === b |           |
| !==       | strictly not equal                   | a !== b |           |
| LIKE      | string contains                      |         |           |
| ILIKE     | string contains (case sensitive)     |         |           |
| NOT LIKE  | string not contains                  |         |           |
| NOT ILIKE | string not contains (case sensitive) |         |           |

### whereNot(condition, value)

Filters the collection where the specified key's value is not equal to a given value.

```javascript
items.whereNot("id", 1); // [{ id: 2 }, {id: 3}]
```

### whereIn(condition, values)

Filters the collection where the specified key's value is in a list of values.

```javascript
items.whereIn("id", [1, 3]); // [{ id: 1 }, {id: 3}]
```

### whereNotIn(condition, values)

Filters the collection where the specified key's value is not in a list of values.

```javascript
items.whereNotIn("id", [1, 3]); // [{ id: 2 }]
```

### whereBetween(condition, min, max?)

Filters the collection where the specified key's value is between two values.
The second parameter can be an array.

```javascript
items.whereBetween("id", [2, 3]); // [{ id: 2 }, { id: 3 }]
items.whereBetween("id", 2, 3); // [{ id: 2 }, { id: 3 }]
```

### whereNotBetween(condition, min, max?)

Filters the collection where the specified key's value is not between two values.
The second parameter can be an array.

```javascript
items.whereNotBetween("id", [2, 3]); // [{ id: 1 }]
items.whereNotBetween("id", 2, 3); // [{ id: 1 }]
```

### whereNull(condition)

Filters the collection where the specified key's value is null.

```javascript
items.whereNull("deleted_at"); // [{ id: 1, deleted_at: null }]
```

### whereNotNull(condition)

Filters the collection where the specified key's value is not null.

```javascript
items.whereNotNull("deleted_at"); // [{ id: 2, deleted_at: "2024-04-04" }]
```

### firstWhere(condition, operatorOrValue, value?)

Returns the first item that matches the given condition.

```javascript
items.firstWhere("id", 1); // [{ id: 1 }]
items.firstWhere("id", "!=", 1); // [{ id: 2 }, { id: 3 }]
```

### pluck(key)

Extracts values of a specified key from each item in the collection.

```javascript
items.pluck("id"); // [1, 2, 3]
```

### count()

Returns the number of items in the collection.

```javascript
items.count(); // 3
```

### sum(key)

Returns the sum of a specified key's values in the collection.

```javascript
items.sum("id"); // 1 + 2 + 3 = 6
```

### avg(key)

Returns the average of a specified key's values in the collection.

```javascript
items.avg("id"); // (1 + 2 + 3) / 3 = 2
```

### min(key)

Returns the smallest value of a specified key in the collection.

```javascript
items.min("id"); // 1
```

### max(key)

Returns the largest value of a specified key in the collection.

```javascript
items.max("id"); // 3
```

### groupBy(key)

Groups the items in the collection by a specified key.

```javascript
items.groupBy("occupation");
/* 
{
    ocean: [
        {name: "squid", occupation: "ocean"},
        {name: "fish", occupation: "ocean"},
    ],
    desert: [
        {name: "scorpio", occupation: "desert"},
        {name: "desert fox", occupation: "desert"},
    ]
}
*/
```

### sortBy(key, order = 'ASC')

Sorts the items in the collection by a specified key.

```javascript
items.sortBy("name", "ASC");
/* 
[
    {name: "desert fox", occupation: "desert"},
    {name: "fish", occupation: "ocean"},
    {name: "scorpio", occupation: "desert"},
    {name: "squid", occupation: "ocean"},
]
*/
```

| order | description              |           |
| ----- | ------------------------ | --------- |
| ASC   | sort in ascending order  | (default) |
| DESC  | sort in descending order |           |

### sortByAsc(key)

Sorts the items in the collection by a specified key in ascending order.

```javascript
items.sortByAsc("name");
/* 
[
    {name: "desert fox", occupation: "desert"},
    {name: "fish", occupation: "ocean"},
    {name: "scorpio", occupation: "desert"},
    {name: "squid", occupation: "ocean"},
]
*/
```

### sortByDesc(key)

Sorts the items in the collection by a specified key in descending order.

```javascript
items.sortByDesc("name");
/* 
[
    {name: "squid", occupation: "ocean"},
    {name: "scorpio", occupation: "desert"},
    {name: "fish", occupation: "ocean"},
    {name: "desert fox", occupation: "desert"},
]
*/
```

### orderBy(key, order = 'ASC')

Alias for the `sortBy` method.

### orderByAsc(key)

Alias for the `sortByAsc` method.

### orderByDesc(key)

Alias for the `sortByDesc` method.

### toArray()

Converts the collection into a plain array.

```javascript
items.toArray(); // [1, 2, 3]
```

### toJSON()

Converts the collection into a JSON string.

```javascript
items.toJSON(); // "[1, 2, 3]"
```

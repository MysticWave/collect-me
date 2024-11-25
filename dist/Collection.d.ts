import { callback } from "./types";
/**
 * Laravel based Collection class
 */
export declare class Collection {
    [index: number | string]: any;
    private items;
    constructor(items?: any[]);
    /**
     * Returns all items in the collection.
     * @returns {any[]} The items in the collection.
     */
    all(): any[];
    /**
     * Alias for the `all` method. Returns all items in the collection.
     * @returns {any[]} The items in the collection.
     */
    get(): any[];
    /**
     * Returns an array of key-value pairs for items in the collection.
     * @returns {any[]} The entries of the collection as key-value pairs.
     */
    entries(): any[];
    /**
     * Adds a new item to the collection.
     * @param item The item to add.
     * @returns {Collection} The updated collection instance.
     */
    push(item: any): Collection;
    /**
     * Applies a callback function to each item in the collection and updates the items with the results.
     * @param callback The function to apply to each item.
     * @returns {Collection} The updated collection instance.
     */
    map(callback: callback): Collection;
    /**
     * Filters the items in the collection based on a callback function.
     * @param callback The function to determine which items to include.
     * @returns {Collection} The filtered collection instance.
     */
    filter(callback: callback): Collection;
    /**
     * Reduces the collection to a single value using a callback function.
     * @param callback The function to execute on each element.
     * @param initialValue The initial accumulator value.
     * @returns {Collection} The filtered collection instance.
     */
    reduce(callback: callback, initialValue: any): Collection;
    /**
     * Filters the collection where a specific condition is met.
     * @param condition The key to check.
     * @param operatorOrValue The operator or value to compare.
     * @param value Optional value to compare when using an operator.
     * @returns {Collection} The filtered collection instance.
     *
     * @example
     * const items = collect([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * const filtered = items.where('id', '>', 1); // [{ id: 2 }, { id: 3 }]
     * // available operators: '=', '<', '<=', '>', '>=', '!=', '==', '!=='
     */
    where(condition: string, operatorOrValue: any, value?: any): Collection;
    /**
     * Filters the collection where the specified key's value is not equal to a given value.
     * @param condition The key to check.
     * @param value The value to compare.
     * @returns {Collection} The filtered collection instance.
     */
    whereNot(condition: string, value: any): Collection;
    /**
     * Filters the collection where the specified key's value is in a list of values.
     * @param condition The key to check.
     * @param values The array of values to match.
     * @returns {Collection} The filtered collection instance.
     */
    whereIn(condition: string, values: any[]): Collection;
    /**
     * Filters the collection where the specified key's value is not in a list of values.
     * @param condition The key to check.
     * @param values The array of values to exclude.
     * @returns {Collection} The filtered collection instance.
     */
    whereNotIn(condition: string, values: any[]): Collection;
    /**
     * Filters the collection where the specified key's value is between two values.
     * @param condition The key to check.
     * @param min The minimum value or range.
     * @param max The maximum value.
     * @returns {Collection} The filtered collection instance.
     * @throws {Error} If the min value is an array and the max value is not undefined.
     */
    whereBetween(condition: string, min: number | number[], max?: number | undefined): Collection;
    /**
    * Filters the collection where the specified key's value is not between two values.
    * @param condition The key to check.
    * @param min The minimum value or range.
    * @param max The maximum value.
    * @returns {Collection} The filtered collection instance.
    * @throws {Error} If the min value is an array and the max value is not undefined.
    */
    whereNotBetween(condition: string, min: number | number[], max?: number | undefined): Collection;
    /**
     * Filters the collection where the specified key's value is null.
     * @param condition The key to check.
     * @returns {Collection} The filtered collection instance.
     */
    whereNull(condition: string): Collection;
    /**
     * Filters the collection where the specified key's value is not null.
     * @param condition The key to check.
     * @returns {Collection} The filtered collection instance.
     */
    whereNotNull(condition: string): Collection;
    /**
     * Returns the first item in the collection.
     * @returns {any} The first item.
     */
    first(): any;
    /**
     * Returns a new collection with a specified number of items.
     * @param count The number of items to take.
     * @returns {Collection} A new collection instance with the specified items
     */
    take(count: number): Collection;
    /**
     * Returns the first item that matches the given condition.
     * @param condition The key to check.
     * @param operatorOrValue The operator or value to compare.
     * @param value Optional value to compare when using an operator.
     * @returns {any} The first matching item.
     */
    firstWhere(condition: string, operatorOrValue: any, value?: any): any;
    /**
     * Returns the last item in the collection.
     * @returns {any} The last item.
     */
    last(): any;
    /**
     * Extracts values of a specified key from each item in the collection.
     * @param key The key to pluck values from.
     * @returns {Collection} A collection of the plucked values.
     */
    pluck(key: string): Collection;
    /**
     * Returns the number of items in the collection.
     * @returns {number} The count of items.
     */
    count(): number;
    /**
     * Returns the sum of a specified key's values in the collection.
     * @param key The key to sum values from.
     * @returns {number} The sum of the values.
     */
    sum(key: string): number;
    /**
     * Returns the average of a specified key's values in the collection.
     * @param key The key to calculate the average from.
     * @returns {number} The average value.
     */
    avg(key: string): number;
    /**
     * Returns the smallest value of a specified key in the collection.
     * @param key The key to find the minimum value from.
     * @returns {number} The minimum value.
     */
    min(key: string): number;
    /**
     * Returns the largest value of a specified key in the collection.
     * @param key The key to find the maximum value from.
     * @returns {number} The maximum value.
     */
    max(key: string): number;
    /**
     * Groups the items in the collection by a specified key.
     * @param key The key to group items by.
     * @returns {Collection} An object grouped by the specified key.
     */
    groupBy(key: string): Collection;
    /**
     * Sorts the items in the collection by a specified key.
     * @param key The key to sort items by.
     * @returns {Collection} The sorted collection instance.
     */
    sortBy(key: string): Collection;
    /**
     * Splits the collection into smaller chunks of a given size.
     *
     * @param {number} size - The size of each chunk.
     * @returns {Collection} A new collection containing arrays of chunks.
     * @throws {Error} If the chunk size is less than or equal to 0.
     *
     * @example
     * const items = collect([1, 2, 3, 4, 5]);
     * const chunks = items.chunk(2); // [[1, 2], [3, 4], [5]]
     */
    chunk(size: number): Collection;
    /**
     * Removes duplicate values from the collection.
     *
     * @param {string} [key] - Optional key to determine uniqueness for objects.
     * @returns {Collection} A new collection containing only unique items.
     *
     * @example
     * const items = collect([1, 2, 2, 3]);
     * const uniqueItems = items.unique(); // [1, 2, 3]
     *
     * const objects = collect([{ id: 1 }, { id: 2 }, { id: 1 }]);
     * const uniqueObjects = objects.unique('id'); // [{ id: 1 }, { id: 2 }]
     */
    unique(key?: string): Collection;
    /**
     * Converts the collection into a plain array.
     *
     * @returns {any[]} The items in the collection as a plain array.
     *
     * @example
     * const items = collect([1, 2, 3]);
     * const array = items.toArray(); // [1, 2, 3]
     */
    toArray(): any[];
    /**
     * Converts the collection into a JSON string.
     *
     * @returns {string} The items in the collection as a JSON string.
     *
     * @example
     * const items = collect([1, 2, 3]);
     * const json = items.toJSON(); // "[1, 2, 3]"
     */
    toJSON(): string;
    /**
     * Checks if a given value exists in the collection.
     *
     * @param {any} value - The value to check for.
     * @returns {boolean} True if the value exists, otherwise false.
     *
     * @example
     * const items = collect([1, 2, 3]);
     * const hasTwo = items.contains(2); // true
     * const hasFour = items.contains(4); // false
     */
    contains(value: any): boolean;
    /**
     * Finds the difference between the collection and another array or collection.
     *
     * @param {any[]} values - The array or collection to compare against.
     * @returns {Collection} A new collection containing items not present in the given values.
     *
     * @example
     * const items = collect([1, 2, 3]);
     * const difference = items.diff([2, 3, 4]); // [1]
     */
    diff(values: any[]): Collection;
    /**
     * Merges the collection with another array or collection.
     *
     * @param {any[] | Collection} values - The array or collection to merge.
     * @returns {Collection} A new collection containing the combined items.
     *
     * @example
     * const items = collect([1, 2]);
     * const merged = items.merge([3, 4]); // [1, 2, 3, 4]
     */
    merge(values: any[] | Collection): Collection;
    /**
     * Checks if the collection is empty.
     *
     * @returns {boolean} True if the collection is empty, otherwise false.
     *
     * @example
     * const items = collect([]);
     * const empty = items.isEmpty(); // true
     *
     * const items2 = collect([1]);
     * const empty2 = items2.isEmpty(); // false
     */
    isEmpty(): boolean;
    /**
     * Checks if the collection is not empty.
     *
     * @returns {boolean} True if the collection is not empty, otherwise false.
     *
     * @example
     * const items = collect([1]);
     * const notEmpty = items.isNotEmpty(); // true
     *
     * const items2 = collect([]);
     * const notEmpty2 = items2.isNotEmpty(); // false
     */
    isNotEmpty(): boolean;
    /**
     * Makes the collection iterable using a `for...of` loop.
     * @returns {Iterator} An iterator for the collection.
     */
    [Symbol.iterator](): {
        next(): {
            value: any;
            done: boolean;
        } | {
            done: boolean;
            value?: undefined;
        };
    };
}
/**
 * Helper function to create a new Collection instance.
 * @param items Initial items for the collection.
 * @returns {Collection} A new Collection instance.
 */
export declare const collect: (items?: any[]) => Collection;

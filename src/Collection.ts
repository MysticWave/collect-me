import { callback, GenericObject } from "./types";

/**
 * Laravel based Collection class
 */
export class Collection {
    [index: number | string]: any;
    private items: any[];

    constructor(items: any[] = []) {
        this.items = items;

        // Return a Proxy to allow index access
        return new Proxy(this, {
            get(target: Collection, prop: any): any {
                if (typeof prop === 'symbol') {
                    // Handle Symbol properties, e.g., Symbol.iterator
                    return target[prop];
                }
                if (prop in target) {
                    return target[prop]; // Access class properties/methods
                }
                if (!isNaN(prop)) {
                    // If the property is a number (index), return the corresponding item
                    return target.items[prop];
                }
            },
            set(target: Collection, prop: any, value: any): boolean {
                if (!isNaN(prop)) {
                    // If the property is a number (index), set the item
                    target.items[prop] = value;
                    return true;
                }
                target[prop] = value;
                return true;
            },
            ownKeys(target) {
                // Expose numeric keys
                return Object.keys(target.items);
            },
            getOwnPropertyDescriptor(target, prop) {
                if (!isNaN(Number(prop))) {
                    return {
                        enumerable: true,
                        configurable: true,
                    };
                }
                return Object.getOwnPropertyDescriptor(target, prop);
            },
        });
    }

    /**
     * Returns all items in the collection.
     * @returns {any[]} The items in the collection.
     */
    all(): any[] {
        return this.items;
    }

    /**
     * Alias for the `all` method. Returns all items in the collection.
     * @returns {any[]} The items in the collection.
     */
    get(): any[] {
        return this.all();
    }

    /**
     * Returns an array of key-value pairs for items in the collection.
     * @returns {any[]} The entries of the collection as key-value pairs.
     */
    entries(): any[] {
        return Object.entries(this.items);
    }

    /**
     * Adds a new item to the collection.
     * @param item The item to add.
     * @returns {Collection} The updated collection instance.
     */
    push(item: any): Collection {
        this.items.push(item);
        return this;
    }

    /**
     * Applies a callback function to each item in the collection and updates the items with the results.
     * @param callback The function to apply to each item.
     * @returns {Collection} The updated collection instance.
     */
    map(callback: callback): Collection {
        this.items = this.items.map(callback);
        return this;
    }

    /**
     * Filters the items in the collection based on a callback function.
     * @param callback The function to determine which items to include.
     * @returns {Collection} The filtered collection instance.
     */
    filter(callback: callback): Collection {
        this.items = this.items.filter(callback);
        return this;
    }

    /**
     * Reduces the collection to a single value using a callback function.
     * @param callback The function to execute on each element.
     * @param initialValue The initial accumulator value.
     * @returns {Collection} The filtered collection instance.
     */
    reduce(callback: callback, initialValue: any): Collection {
        this.items = this.items.reduce(callback, initialValue);
        return this;
    }

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
    where(
        condition: string,
        operatorOrValue: any,
        value: any = undefined
    ): Collection {
        return this.filter((item) => {
            if (typeof item !== "object" || !(condition in item)) return false;
            if (value === undefined) return item[condition] == operatorOrValue;

            const operators: GenericObject = {
                "=": (v: any) => v == value,
                "<": (v: any) => v < value,
                "<=": (v: any) => v <= value,
                ">": (v: any) => v > value,
                ">=": (v: any) => v >= value,
                "!=": (v: any) => v != value,
                // strict comparison
                "==": (v: any) => v === value,
                "!==": (v: any) => v !== value,
                'like': (v: any) => like(v, value),
                'ilike': (v: any) => like(v, value, true),
                'not like': (v: any) => !like(v, value),
                'not ilike': (v: any) => !like(v, value, true),
            };

            return operators[operatorOrValue.toLowerCase()]?.(item[condition]) ?? false;
        });
    }

    /**
     * Filters the collection where the specified key's value is not equal to a given value.
     * @param condition The key to check.
     * @param value The value to compare.
     * @returns {Collection} The filtered collection instance.
     */
    whereNot(condition: string, value: any): Collection {
        return this.where(condition, "!=", value);
    }

    /**
     * Filters the collection where the specified key's value is in a list of values.
     * @param condition The key to check.
     * @param values The array of values to match.
     * @returns {Collection} The filtered collection instance.
     */
    whereIn(condition: string, values: any[]): Collection {
        return this.filter((item) => values.includes(item[condition]));
    }

    /**
     * Filters the collection where the specified key's value is not in a list of values.
     * @param condition The key to check.
     * @param values The array of values to exclude.
     * @returns {Collection} The filtered collection instance.
     */
    whereNotIn(condition: string, values: any[]): Collection {
        return this.filter((item) => !values.includes(item[condition]));
    }

    /**
     * Filters the collection where the specified key's value is between two values.
     * @param condition The key to check.
     * @param min The minimum value or range.
     * @param max The maximum value.
     * @returns {Collection} The filtered collection instance.
     * @throws {Error} If the min value is an array and the max value is not undefined.
     */
    whereBetween(
        condition: string,
        min: number | number[],
        max: number | undefined = undefined
    ): Collection {
        return this.filter((item) => {
            const value = item[condition];
            if (Array.isArray(min)) {
                return value >= min[0] && value <= min[1];
            }
            if (max === undefined) {
                return false;
            }
            return value >= min && value <= max;
        });
    }

    /**
     * Filters the collection where the specified key's value is not between two values.
     * @param condition The key to check.
     * @param min The minimum value or range.
     * @param max The maximum value.
     * @returns {Collection} The filtered collection instance.
     * @throws {Error} If the min value is an array and the max value is not undefined.
     */
    whereNotBetween(
        condition: string,
        min: number | number[],
        max: number | undefined = undefined
    ): Collection {
        return this.filter((item) => {
            const value = item[condition];
            if (Array.isArray(min)) {
                return value < min[0] || value > min[1];
            }
            if (max === undefined) {
                return true;
            }
            return value < min || value > max;
        });
    }

    /**
     * Filters the collection where the specified key's value is null.
     * @param condition The key to check.
     * @returns {Collection} The filtered collection instance.
     */
    whereNull(condition: string): Collection {
        return this.where(condition, null);
    }

    /**
     * Filters the collection where the specified key's value is not null.
     * @param condition The key to check.
     * @returns {Collection} The filtered collection instance.
     */
    whereNotNull(condition: string): Collection {
        return this.where(condition, "!=", null);
    }

    /**
     * Returns the first item in the collection.
     * @returns {any} The first item.
     */
    first(): any {
        return this.items[0];
    }

    /**
     * Returns a new collection with a specified number of items.
     * @param count The number of items to take.
     * @returns {Collection} A new collection instance with the specified items
     */
    take(count: number): Collection {
        return new Collection(this.items.slice(0, count));
    }

    /**
     * Returns the first item that matches the given condition.
     * @param condition The key to check.
     * @param operatorOrValue The operator or value to compare.
     * @param value Optional value to compare when using an operator.
     * @returns {any} The first matching item.
     */
    firstWhere(
        condition: string,
        operatorOrValue: any,
        value: any = undefined
    ): any {
        return this.where(condition, operatorOrValue, value).first();
    }

    /**
     * Returns the last item in the collection.
     * @returns {any} The last item.
     */
    last(): any {
        return this.items[this.items.length - 1];
    }

    /**
     * Extracts values of a specified key from each item in the collection.
     * @param key The key to pluck values from.
     * @returns {Collection} A collection of the plucked values.
     */
    pluck(key: string): Collection {
        return this.map(item => getValueByPath(item, key));
    }

    /**
     * Returns the number of items in the collection.
     * @returns {number} The count of items.
     */
    count(): number {
        return this.items.length;
    }

    /**
     * Returns the sum of a specified key's values in the collection.
     * @param key The key to sum values from.
     * @returns {number} The sum of the values.
     */
    sum(key: string): number {
        return this.items.reduce((total, item) => total + item[key], 0);
    }

    /**
     * Returns the average of a specified key's values in the collection.
     * @param key The key to calculate the average from.
     * @returns {number} The average value.
     */
    avg(key: string): number {
        return this.sum(key) / this.count();
    }

    /**
     * Returns the smallest value of a specified key in the collection.
     * @param key The key to find the minimum value from.
     * @returns {number} The minimum value.
     */
    min(key: string): number {
        return Math.min(...this.items.map((item) => item[key]));
    }

    /**
     * Returns the largest value of a specified key in the collection.
     * @param key The key to find the maximum value from.
     * @returns {number} The maximum value.
     */
    max(key: string): number {
        return Math.max(...this.items.map((item) => item[key]));
    }

    /**
     * Groups the items in the collection by a specified key.
     * @param key The key to group items by.
     * @returns {Collection} An object grouped by the specified key.
     */
    groupBy(key: string): Collection {
        return collect(
            this.items.reduce((acc, item) => {
                const group = item[key];
                if (!acc[group]) {
                    acc[group] = [];
                }
                acc[group].push(item);
                return acc;
            }, {})
        );
    }

    /**
     * Sorts the items in the collection by a specified key.
     * @param key The key to sort items by.
     * @returns {Collection} The sorted collection instance.
     */
    sortBy(key: string): Collection {
        this.items = this.items.sort((a, b) => {
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        });
        return this;
    }

    /**
     * Sorts the items in the collection by a specified key in descending order.
     * @param key The key to sort items by.
     * @returns {Collection} The sorted collection instance.
     */
    sortByDesc(key: string): Collection {
        this.items = this.sortBy(key).reverse().all();
        return this;
    }

    /**
     * Reverses the order of the items in the collection.
     * @returns {Collection} The reversed collection instance.
     */
    reverse(): Collection {
        this.items = this.items.reverse();
        return this;
    }

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
    chunk(size: number): Collection {
        if (size <= 0) throw new Error("Chunk size must be greater than 0.");
        const chunks: any[][] = [];
        for (let i = 0; i < this.items.length; i += size) {
            chunks.push(this.items.slice(i, i + size));
        }
        return new Collection(chunks);
    }

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
    unique(key?: string): Collection {
        const seen = new Set();
        const result = key
            ? this.items.filter((item) => {
                  const value = item[key];
                  if (seen.has(value)) return false;
                  seen.add(value);
                  return true;
              })
            : this.items.filter((item) => {
                  if (seen.has(item)) return false;
                  seen.add(item);
                  return true;
              });
        return new Collection(result);
    }

    /**
     * Converts the collection into a plain array.
     *
     * @returns {any[]} The items in the collection as a plain array.
     *
     * @example
     * const items = collect([1, 2, 3]);
     * const array = items.toArray(); // [1, 2, 3]
     */
    toArray(): any[] {
        return [...this.items];
    }

    /**
     * Converts the collection into a JSON string.
     *
     * @returns {string} The items in the collection as a JSON string.
     *
     * @example
     * const items = collect([1, 2, 3]);
     * const json = items.toJSON(); // "[1, 2, 3]"
     */
    toJSON(): string {
        return JSON.stringify(this.items);
    }

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
    contains(value: any): boolean {
        return this.items.includes(value);
    }

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
    diff(values: any[]): Collection {
        const diffItems = this.items.filter((item) => !values.includes(item));
        return new Collection(diffItems);
    }

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
    merge(values: any[] | Collection): Collection {
        const newItems = values instanceof Collection ? values.all() : values;
        return new Collection([...this.items, ...newItems]);
    }

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
    isEmpty(): boolean {
        return this.items.length === 0;
    }

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
    isNotEmpty(): boolean {
        return !this.isEmpty();
    }

    /**
     * Makes the collection iterable using a `for...of` loop.
     * @returns {Iterator} An iterator for the collection.
     */
    [Symbol.iterator]() {
        let index = 0;
        const items = this.items;

        return {
            next() {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }
}

/**
 * Helper function to create a new Collection instance.
 * @param items Initial items for the collection.
 * @returns {Collection} A new Collection instance.
 */
export const collect = (items: any[] = []) => {
    return new Collection(items);
};

const like = (search: any, subject: any, strict: boolean = false) => {
    if (!strict) {
        search = search.toString().toLowerCase();
        subject = subject.toString().toLowerCase();
    }

    if (subject.startsWith('%') && subject.endsWith('%')) {
        return search.includes(subject.slice(1, -1));
    }

    if (subject.startsWith('%')) {
        return search.endsWith(subject.slice(1));
    }

    if (subject.endsWith('%')) {
        return search.startsWith(subject.slice(0, -1));
    }

    return search == subject;
}

const getValueByPath = (obj: GenericObject, path: string) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

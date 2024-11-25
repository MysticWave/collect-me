"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = exports.Collection = void 0;
/**
 * Laravel based Collection class
 */
class Collection {
    constructor(items = []) {
        this.items = items;
        // Return a Proxy to allow index access
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target) {
                    return target[prop]; // Access class properties/methods
                }
                else if (!isNaN(prop)) {
                    // If the property is a number (index), return the corresponding item
                    return target.items[prop];
                }
            },
            set(target, prop, value) {
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
    all() {
        return this.items;
    }
    entries() {
        return Object.entries(this.items);
    }
    push(item) {
        this.items.push(item);
        return this;
    }
    map(callback) {
        this.items = this.items.map(callback);
        return this;
    }
    filter(callback) {
        this.items = this.items.filter(callback);
        return this;
    }
    reduce(callback, initialValue) {
        return this.items.reduce(callback, initialValue);
    }
    where(condition, value) {
        return this.filter((item) => item[condition] === value);
    }
    whereIn(condition, values) {
        return this.filter((item) => values.includes(item[condition]));
    }
    first() {
        return this.items[0];
    }
    firstWhere(condition, value) {
        return this.where(condition, value).first();
    }
    last() {
        return this.items[this.items.length - 1];
    }
    pluck(key) {
        return this.map((item) => item[key]);
    }
    count() {
        return this.items.length;
    }
    sum(key) {
        return this.items.reduce((total, item) => total + item[key], 0);
    }
    avg(key) {
        return this.sum(key) / this.count();
    }
    min(key) {
        return Math.min(...this.pluck(key).all());
    }
    max(key) {
        return Math.max(...this.pluck(key).all());
    }
    groupBy(key) {
        return this.items.reduce((acc, item) => {
            const group = item[key];
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(item);
            return acc;
        }, {});
    }
    sortBy(key) {
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
    // Make collection iterable using for...of
    [Symbol.iterator]() {
        let index = 0;
        const items = this.items;
        return {
            next() {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                }
                else {
                    return { done: true };
                }
            },
        };
    }
}
exports.Collection = Collection;
const collect = (items = []) => {
    return new Collection(items);
};
exports.collect = collect;

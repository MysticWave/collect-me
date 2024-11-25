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
                if (prop in target) {
                    return target[prop]; // Access class properties/methods
                } else if (!isNaN(prop)) {
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

    all(): any[] {
        return this.items;
    }

    entries(): any[] {
        return Object.entries(this.items);
    }

    push(item: any): Collection {
        this.items.push(item);
        return this;
    }

    map(callback: (item: any) => any): Collection {
        this.items = this.items.map(callback);
        return this;
    }

    filter(callback: (item: any) => any): Collection {
        this.items = this.items.filter(callback);
        return this;
    }

    reduce(callback: (item: any) => any, initialValue: any): Collection {
        return this.items.reduce(callback, initialValue);
    }

    where(condition: string, value: any): Collection {
        return this.filter((item) => item[condition] === value);
    }

    whereIn(condition: string, values: any[]): Collection {
        return this.filter((item) => values.includes(item[condition]));
    }

    first(): any {
        return this.items[0];
    }

    firstWhere(condition: string, value: any): any {
        return this.where(condition, value).first();
    }

    last(): any {
        return this.items[this.items.length - 1];
    }

    pluck(key: string): Collection {
        return this.map((item) => item[key]);
    }

    count(): number {
        return this.items.length;
    }

    sum(key: string): number {
        return this.items.reduce((total, item) => total + item[key], 0);
    }

    avg(key: string): number {
        return this.sum(key) / this.count();
    }

    min(key: string): number {
        return Math.min(...this.pluck(key).all());
    }

    max(key: string): number {
        return Math.max(...this.pluck(key).all());
    }

    groupBy(key: string): Collection {
        return this.items.reduce((acc, item) => {
            const group = item[key];
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(item);
            return acc;
        }, {});
    }

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

    // Make collection iterable using for...of
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

export const collect = (items: any[] = []) => {
    return new Collection(items);
};

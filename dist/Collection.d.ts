/**
 * Laravel based Collection class
 */
export declare class Collection {
    [index: number | string]: any;
    private items;
    constructor(items?: any[]);
    all(): any[];
    entries(): any[];
    push(item: any): Collection;
    map(callback: (item: any) => any): Collection;
    filter(callback: (item: any) => any): Collection;
    reduce(callback: (item: any) => any, initialValue: any): Collection;
    where(condition: string, value: any): Collection;
    whereIn(condition: string, values: any[]): Collection;
    first(): any;
    firstWhere(condition: string, value: any): any;
    last(): any;
    pluck(key: string): Collection;
    count(): number;
    sum(key: string): number;
    avg(key: string): number;
    min(key: string): number;
    max(key: string): number;
    groupBy(key: string): Collection;
    sortBy(key: string): Collection;
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
export declare const collect: (items?: any[]) => Collection;

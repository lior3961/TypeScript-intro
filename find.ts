import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const findResult = <T>(predicate : (x : T) => boolean , arr : T[]): Result<T>  => 
    (
        (myFind(predicate , arr).length === 0) ? makeFailure("Failure") : makeOk(myFind(predicate , arr)[0])
    );
    
const myFind = <T>(predicate :(x : T) => boolean , arr : T[]) : T[] =>
    arr.filter(predicate , 0);


export const returnSquaredIfFoundEven_v2 = (arr : number[]) : Result<number> =>
        bind(findResult((x : number) => x%2 == 0, arr), (x : number) => makeOk(x*x))


export const returnSquaredIfFoundEven_v3 = (arr : number[]) : number =>
        either(findResult((x : number) => x%2 == 0, arr) ,(x : number) => x*x , (str : string) => -1)
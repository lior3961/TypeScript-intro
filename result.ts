export type Result<T> = Ok<T> | Failure;

type Ok<T> = {
    tag: "Ok";
    value: T;
}

type Failure = {
    tag: "Failure";
    message: string;
}

export const makeOk = <T>(value: T): Result<T> =>
    ({ tag: "Ok", value: value });

export const makeFailure = <T>(message: string): Result<T> =>
    ({ tag: "Failure", message: message });

export const isOk = <T>(r: Result<T>): r is Ok<T> =>
    r.tag === "Ok";

export const isFailure = <T>(r: Result<T>): r is Failure =>
    r.tag === "Failure";

//takes a result , if its of type ok return f(r.value) else its a failure
export const bind = <T, U>(r: Result<T>, f: (x: T) => Result<U>): Result<U> =>
    isOk(r) ? f(r.value) : r;

//takes a result , if its of type ok returns ifOk(r.value) else, its a failure and the func returns ifFailure(r.message)
export const either = <T, U>(r: Result<T>, ifOk: (value: T) => U, ifFailure: (message: string) => U): U =>
    isOk(r) ? ifOk(r.value) : ifFailure(r.message);
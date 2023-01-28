import { NextQueryParams } from '../types';
declare class ArrayOf<T> extends NextQueryParams.ArrayParam<T> {
    private param;
    constructor(param: NextQueryParams.Param<T>);
    encode(value: T[]): string[];
    decode(value: string[]): T[];
}
export default ArrayOf;

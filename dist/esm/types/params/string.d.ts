import { NextQueryParams } from '../types';
declare class StringParam<T extends string> extends NextQueryParams.Param<T> {
    encode(value: T): string | undefined;
    decode(value: string): T;
}
export default StringParam;

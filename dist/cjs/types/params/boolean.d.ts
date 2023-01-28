import { NextQueryParams } from '../types';
declare class NumberParam extends NextQueryParams.Param<boolean> {
    encode(value: boolean): string;
    decode(value: string): boolean;
}
export default NumberParam;

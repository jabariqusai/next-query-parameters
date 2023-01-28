import { NextQueryParams } from '../types';
declare class NumberParam extends NextQueryParams.Param<number> {
    encode(value: number): string;
    decode(value: string): number;
}
export default NumberParam;

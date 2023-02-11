import { NextQueryParams } from '../types';

class NumberParam extends NextQueryParams.Param<boolean> {
  encode(value: boolean): string {
    return value === false ? '0' : '1';
  }

  decode(value: string): boolean {
    return value === '0' ? false : true;
  }
}

export default NumberParam;
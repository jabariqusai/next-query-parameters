import { NextQueryParams } from '../types';

class NumberParam extends NextQueryParams.Param<number> {
	encode(value: number): string {
		return String(value);
	}

	decode(value: string): number {
		return Number(value);
	}
}

export default NumberParam;
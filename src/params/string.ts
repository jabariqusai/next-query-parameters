import { NextQueryParams } from '../types';

class StringParam<T extends string> extends NextQueryParams.Param<T> {
	encode(value: T): string | undefined {
		return value || undefined;
	}

	decode(value: string): T {
		return value as T;
	}
}

export default StringParam;
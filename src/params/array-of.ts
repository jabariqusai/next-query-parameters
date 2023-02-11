import { NextQueryParams } from '../types';


class ArrayOf<T> extends NextQueryParams.ArrayParam<T> {
  private param: NextQueryParams.Param<T>;

  constructor(param: NextQueryParams.Param<T>) {
    super();
    this.param = param;
  }

  encode(value: T[]): string[] {
    return value
      .map(item => this.param.encode(item))
      .filter(item => typeof item !== 'undefined') as string[];
  };

  decode(value: string[]): T[] {
    return value.map(item => this.param.decode(item));
  }
}

export default ArrayOf;
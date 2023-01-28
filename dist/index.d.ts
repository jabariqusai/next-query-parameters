declare namespace NextQueryParams {
    enum ParamType {
        /**
         * A simple query string parameter appears at most once in the query string.
         */
        SIMPLE = "simple",
        /**
         * An array query string parameter could appear multiple times with different values inside the query string.
         */
        ARRAY = "array"
    }
    /**
     * Extends this abstract class to define a custom query string parameter.\
     */
    abstract class Param<T> {
        is: ParamType.SIMPLE;
        abstract encode(value: T): string | undefined;
        abstract decode(value: string): T;
    }
    /**
     * Extends this abstract class to define a custom array-based query string parameter.\
     */
    abstract class ArrayParam<T> {
        is: ParamType.ARRAY;
        abstract encode(value: T[]): string[];
        abstract decode(value: string[]): T[];
    }
    /**
     * Defines a template for the params hook based on your parameters object.
     */
    type Template<T extends object> = {
        [K in keyof T]: Param<T[K]>;
    };
    namespace Setter {
        interface ITrigger {
            name: string;
            type?: string;
        }
        interface IExtras {
            /**
             * Choose whether to replace the current browser history entry or push a new one.
             * @default 'replace'
             */
            mode: 'replace' | 'push';
            /**
             * Opt-in for NextJS shallow routing.
             */
            shallow: boolean;
            /**
             * An object describing the trigger that caused the change. Used in tracking.
             */
            trigger: ITrigger;
        }
        /**
         * Parameter setter function for the generic params hook.
         * @param params A subset of the complete params object with properties you'd like to update.
         * @param extras A configuration/settings object.
         * @returns Resulting query string.
         */
        type Function<T> = (params: Partial<T>, extras?: Partial<IExtras>) => string;
    }
}

interface IConfig {
    /**
     * Replace existing history entry or push a new one.
     * @default 'replace'
     */
    mode: 'replace' | 'push';
    /**
     * Opt-in for NextJS shallow routing.
     */
    shallow: boolean;
}
declare const useParams: <P extends object>(template: NextQueryParams.Template<P>, config?: Partial<IConfig> | undefined) => [Partial<P>, NextQueryParams.Setter.Function<P>, NextQueryParams.Setter.ITrigger | undefined];

declare class StringParam<T extends string> extends NextQueryParams.Param<T> {
    encode(value: T): string | undefined;
    decode(value: string): T;
}

declare class NumberParam extends NextQueryParams.Param<number> {
    encode(value: number): string;
    decode(value: string): number;
}

declare class ArrayOf<T> extends NextQueryParams.ArrayParam<T> {
    private param;
    constructor(param: NextQueryParams.Param<T>);
    encode(value: T[]): string[];
    decode(value: string[]): T[];
}

export { ArrayOf, NextQueryParams, NumberParam, StringParam, useParams };

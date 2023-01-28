export declare namespace NextQueryParams {
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

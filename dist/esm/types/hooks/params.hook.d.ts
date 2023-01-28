import { NextQueryParams } from '../types';
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
export default useParams;

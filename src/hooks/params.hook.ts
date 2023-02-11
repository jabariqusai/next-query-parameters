import { useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
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

const useParams = <P extends object>(template: NextQueryParams.Template<P>, config?: Partial<IConfig>) => {
  const router = useRouter();
  const [beforeHash, afterHash] = router.asPath.split('#');
  const pathname = beforeHash.split('?')[0] || '';
  const queryString = beforeHash.split('?')[1] || '';
  const triggerRef = useRef<NextQueryParams.Setter.ITrigger | undefined>();

  // User is not allowed to update the template.
  template = useMemo(() => template, []);

  const urlParams = useMemo(() => new URLSearchParams(queryString), [queryString]);

  /**
   * Query String parameter setter function.
   */
  const setParams = useCallback<NextQueryParams.Setter.Function<P>>((params, extras) => {
    const mode = extras?.mode ?? config?.mode ?? 'replace';
    const shallow = extras?.shallow ?? config?.shallow;
    const newUrlParams = new URLSearchParams(urlParams);

    triggerRef.current = extras?.trigger;

    Object.entries(params).forEach(([key, value]) => {
      if (template[key as keyof P]) {
        const param = template[key as keyof P];

        if (param instanceof NextQueryParams.ArrayParam) {
          newUrlParams.delete(key);

          if (value !== undefined && value !== null) {
            const encoded = param.encode(value as []);

            encoded.forEach(item => newUrlParams.append(key, item));
          }
        } else {
          const encoded = param.encode(value as P[keyof P]);

          if (encoded === undefined || encoded === null) {
            newUrlParams.delete(key);
          } else {
            newUrlParams.set(key, encoded);
          }
        }
      }
    });

    const queryString = newUrlParams.toString();

    if (mode === 'replace') {
      router.replace({ pathname, query: queryString, hash: afterHash }, undefined, { shallow });
    } else {
      router.push({ pathname, query: queryString, hash: afterHash }, undefined, { shallow });
    }

    return queryString;
  }, [urlParams, afterHash]);

  const dependencies = useMemo(() => Object.keys(template).map(key => urlParams.get(key)), [urlParams]);

  const [params, trigger] = useMemo(() => {
    type Template = NextQueryParams.Template<P>;

    const params = (Object.entries(template) as Array<[keyof Template, Template[keyof Template]]>)
      .reduce<Partial<P>>((params, [key, param]) => {
        if (param instanceof NextQueryParams.ArrayParam) {
          params[key] = param.decode(urlParams.getAll(key as string)) as any as P[keyof P];
        } else {
          const value = urlParams.get(key as string);

          if (value !== undefined && value !== null) {
            params[key] = param.decode(value) as any as P[keyof P];
          }
        }

        return params;
      }, {});

    const trigger = triggerRef.current;

    triggerRef.current = undefined;

    return [params, trigger];
  }, dependencies);

  return [params, setParams, trigger] as [typeof params, typeof setParams, typeof trigger];
};

export default useParams;
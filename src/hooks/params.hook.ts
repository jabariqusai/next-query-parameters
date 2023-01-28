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
	const beforeHash = router.asPath.split('#')[0];
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
				const param = template[key as keyof P].encode(value as P[keyof P]);

				if (param === undefined || param === null) {
					newUrlParams.delete(key);
				} else {
					newUrlParams.set(key, param);
				}
			}
		});

		const queryString = newUrlParams.toString();

		if (mode === 'replace') {
			router.replace({ pathname, query: queryString }, undefined, { shallow });
		} else {
			router.push({ pathname, query: queryString }, undefined, { shallow });
		}

		return queryString;
	}, [urlParams]);

	const dependencies = useMemo(() => Object.keys(template).map(key => urlParams.get(key)), [urlParams]);

	const [params, trigger] = useMemo(() => {
		type Template = NextQueryParams.Template<P>;
		const params = (Object.entries(template) as Array<[keyof Template, Template[keyof Template]]>).reduce<Partial<P>>((params, [key, param]) => {
			const value = param.decode(urlParams.get(key as string) as string);

			if (value !== undefined && value !== null) {
				params[key] = value;
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
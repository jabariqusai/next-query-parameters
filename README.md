# next-query-parameters
Read and set query string parameters easily inside your next application

# Get Started

Leverage the `useParams` hook to read and set query string parameters inside your React components.

```js
import { useParams, StringParam } from 'next-query-parameters';

const SearchBar = (props) => {
	const [params, setParams] = useParams({ search: new StringParam(), sort: new StringParam() })

	return (
		<div className="search-bar">
			<input value={params.search} onChange={e => setParams({ search: e.target.value })}/>
			<select value={params.sort} onChange={e => setParams({ sort: e.target.value })}>
				<option value="relevancy">Relevancy</option>
				<option value="most-recent">Most Recent</option>
			</select>
		</div>
	);
};
```
The `useParams` hook will only trigger a render cycle if one or more of the parameters change.

# Custom Parameters

You can define your own custom parameter encoder/decoder class by extending `NextQueryParams.Param<T>`

```js
import { NextQueryParams, useParams } from 'next-query-parameters';

interface IFilter {
	operator: 'AND' | 'OR';
	value: string[];
}

class FilterParam extends NextQueryParams.Param<IFilter> {
	// High level representation -> URL representation
	encode(value: IFilter) {
		return [value.operator, value.value.join('::')].join(';');
	}

	// URL representation -> High level representation
	decode(value: string): IFilter {
		const [operator, joinedValue] = value.split(';');

		return {
			operator: operator as IFilter['operator'],
			value: joinedValue.split('::')
		};
	}
}

const Search = (props) => {
	const [params, setParams] = useParams({
		cuisine: new FilterParam(),
		location: new FilterParam()
	});

	// Read your custom parameters
	console.log(params.cuisine?.operator);
	console.log(params.cuisine?.value);

	// Update your custom parameters
	const updateCuisine = (cuisine: IFilter) => setParams({ cuisine });

	// ...
};
```

# Array Parameters
Easily handle array parameters with the `ArrayOf` class.

```js
import { ArrayOf, StringParam, useParams } from 'next-query-parameters';

const Search = (props) => {
	const [params, setParams] = useParams({ categories: new ArrayOf(new StringParam()) });

	console.log(param.categories) // Expect string[]

	const updateCategories = (categories: string[]) => setParams({ categories });

	// ...
};
```
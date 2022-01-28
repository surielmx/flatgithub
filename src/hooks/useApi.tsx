import { useCallback, useState } from 'react';
import appConfig from '../config/appConfig';
import { FetchProps, QueryProps } from '../types/types';

function useApi() {
	const [statusQuery, setStatusQuery] = useState<QueryProps>({
		isLoading: false,
		isError: false,
		isSuccess: false,
		error: null,
		data: null,
	});

	const resetQuery = useCallback(() => {
		setStatusQuery({
			isLoading: false,
			isError: false,
			isSuccess: false,
			error: null,
			data: null,
		});
	}, []);

	const executeQuery = useCallback(
		async ({ path, method = 'get', data, subpath, params = '' }: FetchProps) => {
			setStatusQuery({
				isLoading: true,
				isError: false,
				isSuccess: false,
				error: null,
				data: null,
			});

			try {
				const instance = await fetch(
					`${appConfig.BASE_URL}/${path}/${appConfig.OWNER}/${appConfig.REPO}/${subpath}${params}`,
					{
						method,
						headers: {
							'Content-Type': 'application/json',
						},

						body: JSON.stringify(data),
					},
				);
				setStatusQuery({
					isLoading: false,
					isError: false,
					isSuccess: true,
					error: null,
					data: await instance.json(),
				});
			} catch (error: any) {
				const { response = {} } = error || {};
				setStatusQuery({
					isLoading: false,
					isError: true,
					isSuccess: false,
					error: response.data,
					data: null,
				});
			}
		},
		[],
	);

	return { ...statusQuery, executeQuery, resetQuery };
}

export { useApi };

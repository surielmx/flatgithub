export const isEmptyObject = (obj: any) => {
	return (
		obj && typeof obj === 'object' && obj.constructor === Object && Object.keys(obj).length === 0
	);
};

export const isEmptyArray = (array: any) => {
	return array && typeof array === 'object' && array.constructor === Array && array.length === 0;
};

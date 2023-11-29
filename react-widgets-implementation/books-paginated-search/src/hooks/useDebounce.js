import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
	const [dbValue, setDbValue] = useState(value);

	useEffect(() => {
		const tid = setTimeout(() => {
			setDbValue(value);
		}, delay);

		return () => clearTimeout(tid);
	}, [value, delay]);

	return dbValue;
};

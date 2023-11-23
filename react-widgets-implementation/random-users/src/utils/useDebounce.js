import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			setDebouncedValue(value);
			return () => clearTimeout(timeoutID);
		}, delay);
	}, [value, delay]);

	return debouncedValue;
}

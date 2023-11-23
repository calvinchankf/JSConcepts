"use client";
import styles from "./page.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import UserCell from "@/components/UserCell";

// approach1: use a state to trigger the fetchData()
// import useDebounce from "@/utils/useDebounce";

// approach2: call the function directly
import debounce from "@/utils/debounceFn";

// https://www.youtube.com/watch?v=gnkrDse9QKc&t=216s&ab_channel=BenAwad
export default function Home() {
	const [userInfos, setUserInfos] = useState([]);
	const [page, setPage] = useState(1);

	// approach1
	// const debouncedPage = useDebounce(page, 500);
	// useEffect(() => {
	// const abc = new AbortController();
	// const fetchData = async () => {
	// 	const url = `https://randomuser.me/api?page=${debouncedPage}`;
	// 	try {
	// 		const resp = await fetch(url, {
	// 			signal: abc.signal,
	// 		});
	// 		if (!resp.ok) {
	// 			throw new Error("not ok");
	// 		}
	// 		const { results } = await resp.json();
	// 		setUserInfos((oldInfos) => [...oldInfos, ...results]);
	// 	} catch (error) {
	// 		console.error(`error: ${error}`);
	// 	}
	// };
	// fetchData();
	// return () => abc.abort();
	// }, [debouncedPage]);

	// approach2
	const fetchNextUser = useRef(() => {});
	fetchNextUser.current = debounce(async () => {
		const url = `https://randomuser.me/api?page=${page}`;
		try {
			const resp = await fetch(url);
			if (!resp.ok) {
				throw new Error("not ok");
			}
			const { results, info } = await resp.json();
			setUserInfos((oldInfos) => [...oldInfos, ...results]);
			setPage(info.page + 1);
		} catch (error) {
			console.error(`error: ${error}`);
		}
	}, 500);
	useEffect(() => {
		fetchNextUser.current();
	}, []);

	return (
		<main>
			<div>
				{/* <button onClick={() => setPage(debouncedPage + 1)}>
					Load More
				</button> */}
				<button onClick={() => fetchNextUser.current()}>
					Load More
				</button>
			</div>
			{userInfos.map((user, i) => (
				<UserCell key={i} user={user} />
			))}
		</main>
	);
}

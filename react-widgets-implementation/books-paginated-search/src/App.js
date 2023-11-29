import { useEffect, useState, useReducer } from "react";
import styles from "./App.module.css";
import { searchBooks } from "api";

import { useDebounce } from "hooks/useDebounce";
import BookList from "components/BookList";
import {
	BOOKS_ACTIONS,
	booksInitStates,
	booksReducer,
} from "reducers/appReducer";

/*
export type Book = {
  title: string;
  author: string;
  key: string;
};

export type SearchBooksResponse = {
  books: Book[];
  query: string;
  page: number;
  maxPages: number;
};
*/

function App() {
	// const [books, setBooks] = useState([]);
	// const [query, setQuery] = useState("");
	// const [page, setPage] = useState(1);
	// const [maxPages, setMaxPages] = useState(1);

	// const dbQuery = useDebounce(query, 500);

	// useEffect(() => {
	// 	const fetch = async () => {
	// 		const data = await searchBooks(dbQuery, page);
	// 		setBooks(data?.books);
	// 		setMaxPages(data?.maxPages);
	// 	};
	// 	fetch();
	// }, [dbQuery, page]);

	// const inputOnChange = (e) => {
	// 	const v = e.target.value;
	// 	setQuery(v);
	// 	setPage(1);
	// };

	// const toChangePage = (delta = 1) => {
	// 	const newPage = page + delta;
	// 	if (newPage < 1 || newPage > maxPages) {
	// 		return;
	// 	}
	// 	setPage(newPage);
	// };

	const [booksState, dispatch] = useReducer(booksReducer, booksInitStates);
	const { books, query, page, maxPages } = booksState;
	const dbQuery = useDebounce(query, 500);

	useEffect(() => {
		const fetch = async () => {
			const data = await searchBooks(dbQuery, page);
			dispatch({ type: BOOKS_ACTIONS.SET_BOOKS, payload: data?.books });
			dispatch({
				type: BOOKS_ACTIONS.SET_MAX_PAGES,
				payload: data?.maxPages,
			});
		};
		fetch();
	}, [dbQuery, page]);

	const inputOnChange = (e) => {
		const v = e.target.value;
		dispatch({ type: BOOKS_ACTIONS.SET_QUERY, payload: v });
		dispatch({ type: BOOKS_ACTIONS.SET_PAGE, payload: 1 });
	};

	const toChangePage = (delta = 1) => {
		const newPage = page + delta;
		if (newPage >= 1 && newPage <= maxPages) {
			dispatch({ type: BOOKS_ACTIONS.SET_PAGE, payload: newPage });
		}
	};

	return (
		<div className={styles.app}>
			<div>Boilerplate</div>
			<input onChange={inputOnChange} value={query}></input>
			<BookList books={books} />
			<button onClick={() => toChangePage(-1)}>Prev page</button>
			{page}
			<button onClick={() => toChangePage()}>Next page</button>
		</div>
	);
}

export default App;

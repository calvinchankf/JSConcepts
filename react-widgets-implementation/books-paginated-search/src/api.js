const OPEN_LIBRARY_SEARCH__API_BASE = "https://openlibrary.org/search.json";
const OPEN_LIBRARY_SEARCH__PAGE_SIZE = 10;
const OPEN_LIBRARY_SEARCH__FIELDS = "title,author_name,key";
const OPEN_LIBRARY_SEARCH__SORT = "new";

/*
type OpenLibrarySearchResponse = {
  docs: { title: string; author_name: string[]; key: string }[];
  num_found: number;
  start: number;
  q: string;
};

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

export const searchBooks = async (query, page = 1) => {
	const url = new URL(OPEN_LIBRARY_SEARCH__API_BASE);
	url.searchParams.set("limit", `${OPEN_LIBRARY_SEARCH__PAGE_SIZE}`);
	url.searchParams.set("fields", OPEN_LIBRARY_SEARCH__FIELDS);
	url.searchParams.set("sort", OPEN_LIBRARY_SEARCH__SORT);
	url.searchParams.set("q", query);
	url.searchParams.set("page", `${page}`);

	const response = await fetch(url);
	if (!response.ok) throw new Error(response.statusText);

	const data = await response.json();
	return {
		books: data.docs.map(({ title, author_name, key }) => ({
			title,
			key,
			author: author_name?.join(", ") ?? "",
		})),
		page: Math.floor(data.start / OPEN_LIBRARY_SEARCH__PAGE_SIZE) + 1,
		maxPages:
			Math.floor(data.num_found / OPEN_LIBRARY_SEARCH__PAGE_SIZE) + 1,
		query: data.q,
	};
};

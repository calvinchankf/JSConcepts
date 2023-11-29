export const BOOKS_ACTIONS = {
	SET_BOOKS: "SET_BOOKS",
	SET_QUERY: "SET_QUERY",
	SET_PAGE: "SET_PAGE",
	SET_MAX_PAGES: "SET_MAX_PAGES",
};

export const booksInitStates = {
	books: [],
	query: "",
	page: 1,
	maxPages: 1,
};

export const booksReducer = (state, action) => {
	switch (action.type) {
		case BOOKS_ACTIONS.SET_BOOKS:
			return { ...state, books: action.payload };
		case BOOKS_ACTIONS.SET_QUERY:
			return { ...state, query: action.payload };
		case BOOKS_ACTIONS.SET_PAGE:
			return { ...state, page: action.payload };
		case BOOKS_ACTIONS.SET_MAX_PAGES:
			return { ...state, maxPages: action.payload };
		default:
			return state;
	}
};

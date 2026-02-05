import booksReducer from '../reducers/books';
import {
    ADD_BOOK,
    FILTER_BY_VALUE,
    LOAD_EXACT_PAGE,
    LOAD_NEW_PAGE,
	RECIEVE_BOOKS,
	SORT_BY_AUTHOR,
	SORT_BY_DATE
} from '../actions/books';

jest.mock('lodash-es/cloneDeep.js', () => ({
	__esModule: true,
	default: (value: unknown) => JSON.parse(JSON.stringify(value))
}));

const createBook = (overrides = {}) => ({
	id: 'id-1',
	title: 'Alpha',
	authors: ['Author One'],
	image: '',
	link: '',
	date: '2024-01-01',
	isLibraryBook: false,
	rate: 3,
	comment: '',
	...overrides
});

const seedState = (booksCount = 40) => {
	const books = Array.from({ length: booksCount }, (_, index) =>
		createBook({ id: `id-${index + 1}`, title: `Title ${index + 1}` })
	);
	const countPerPage = 20;
	return {
		books,
		filteredBooks: books.slice(0, countPerPage),
		currentCount: countPerPage,
		countPerPage,
		totalCount: books.length,
		currentPage: 1,
		totalPages: Math.ceil(books.length / countPerPage),
		filteredPages: Math.ceil(books.length / countPerPage),
		appliedFilters: []
	};
};

describe('books reducer', () => {
	it('adds a book to the list', () => {
		// Arrange: start with one book and prepare a new one
		const state = seedState(1);
		const newBook = createBook({ id: 'id-2', title: 'New Book' });
		// Act: dispatch ADD_BOOK
		const nextState = booksReducer(state, { type: ADD_BOOK, book: newBook });

		// Assert: both lists include the new book
		expect(nextState.books).toHaveLength(2);
		expect(nextState.filteredBooks).toHaveLength(2);
		expect(nextState.books[1].title).toBe('New Book');
	});

	it('moves to the next page', () => {
		// Arrange: seed with 40 books (2 pages)
		const state = seedState(40);
		// Act: move forward one page
		const nextState = booksReducer(state, { type: LOAD_NEW_PAGE, payload: { page: 1 } });

		// Assert: page increments and list starts at item 21
		expect(nextState.currentPage).toBe(2);
		expect(nextState.filteredBooks[0].title).toBe('Title 21');
	});

	it('moves to an exact page', () => {
		// Arrange: seed with 40 books (2 pages)
		const state = seedState(40);
		// Act: go directly to page 2
		const nextState = booksReducer(state, { type: LOAD_EXACT_PAGE, payload: { page: 2 } });

		// Assert: page updates and list starts at item 21
		expect(nextState.currentPage).toBe(2);
		expect(nextState.filteredBooks[0].title).toBe('Title 21');
	});

	it('filters by search value', () => {
		// Arrange: seed a small list
		const state = seedState(3);
		// Act: filter by a specific title
		const nextState = booksReducer(state, { type: FILTER_BY_VALUE, value: 'Title 2' });

		// Assert: only the matching title remains
		expect(nextState.filteredBooks).toHaveLength(1);
		expect(nextState.filteredBooks[0].title).toBe('Title 2');
	});

	it('accepts initial data from receive books', () => {
		// Arrange: provide initial books array
		const books = [createBook({ id: 'id-1' })];
		// Act: dispatch RECIEVE_BOOKS
		const nextState = booksReducer(undefined, { type: RECIEVE_BOOKS, books });

		// Assert: state uses received data
		expect(nextState.books).toHaveLength(1);
		expect(nextState.filteredBooks).toHaveLength(1);
	});

	it('sorts by date and updates applied filters', () => {
		// Arrange: books with descending dates
		const books = [
			createBook({ id: 'id-1', date: '2024-01-01' }),
			createBook({ id: 'id-2', date: '2024-01-02' })
		];
		const state = {
			...seedState(0),
			books,
			filteredBooks: books,
			totalCount: books.length,
			filteredPages: 1,
			totalPages: 1
		};
		// Act: sort by date
		const nextState = booksReducer(state, { type: SORT_BY_DATE });

		// Assert: most recent date appears first and filter applied
		expect(nextState.filteredBooks[0].date).toBe('2024-01-02');
		expect(nextState.appliedFilters).toContain(SORT_BY_DATE);
	});

	it('sorts by author and updates applied filters', () => {
		// Arrange: books with distinct authors
		const books = [
			createBook({ id: 'id-1', authors: ['Beta'] }),
			createBook({ id: 'id-2', authors: ['Alpha'] })
		];
		const state = {
			...seedState(0),
			books,
			filteredBooks: books,
			totalCount: books.length,
			filteredPages: 1,
			totalPages: 1
		};
		// Act: sort by author
		const nextState = booksReducer(state, { type: SORT_BY_AUTHOR });

		// Assert: filter is applied and all books remain
		expect(nextState.filteredBooks).toHaveLength(2);
        expect(nextState.filteredBooks[0].authors).toEqual(['Alpha']);
        expect(nextState.filteredBooks[1].authors).toEqual(['Beta']);
		expect(nextState.appliedFilters).toContain(SORT_BY_AUTHOR);
	});
});

/* 
Recieve Books by search 
Add Book 
Add Comment  ?
Sort Books 
*/

import { hideLoading, showLoading } from 'react-redux-loading';
import { formatBook } from '../utils/helper';
import { getBooks, updateComment, saveBook } from './../utils/api';

export const LOAD_NEW_PAGE = 'LOAD_NEW_PAGE';
export const LOAD_EXACT_PAGE = 'LOAD_EXACT_PAGE';
export const RECIEVE_BOOKS = 'RECIEVE_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const FILTER_BY_VALUE = 'FILTER_BY_VALUE';
export const SORT_BY_AUTHOR = 'SORT_BY_AUTHOR';
export const SORT_BY_DATE = 'SORT_BY_DATE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const recieveBooks = (books) => {
	return {
		type: RECIEVE_BOOKS,
		books
	};
};

export const addBook = (book) => {
	return {
		type: ADD_BOOK,
		book
	};
};

export const filterByValue = (value) => {
	return {
		type: FILTER_BY_VALUE,
		value
	};
};

export const sortByAuthor = () => {
	return {
		type: SORT_BY_AUTHOR
	};
};

export const sortByDate = () => {
	return {
		type: SORT_BY_DATE
	};
};

export const updateBookComment = (id, comment) => {
	return {
		type: UPDATE_COMMENT,
		id,
		comment
	};
};

export const loadNewPage = (payload) => {
	return {
		type: LOAD_NEW_PAGE,
		payload
	};
};

export const loadExactPage = (payload) => {
	return {
		type: LOAD_EXACT_PAGE,
		payload
	};
};

/* add book if book doesn't exist in booklist */
export function handleAddBook(book) {
	const formattedBook = formatBook(book);
	return (dispatch, getState) => {
		const { books } = getState().books;
		const bookExists = books.findIndex(
			(book) =>
				book.authors.includes(formattedBook.authors[0]) &&
				book.title === formattedBook.title
		);

		// if book exists, return a rejected Promise
		if (bookExists >= 0) {
			return new Promise((_, rej) => rej());
		}

		dispatch(showLoading());
		return saveBook(formattedBook)
			.then(() => {
				dispatch(addBook(formattedBook));
			})
			.then(() => dispatch(hideLoading()))
			.catch((err) => {
                console.log('add book error');
				alert('Error occurred while trying to add book. Try Again', err.message)
            }
			);
	};
}

/* Get books */
export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading());
		return getBooks()
			.then((books) => {
				dispatch(recieveBooks(books));
			})
			.then(() => dispatch(hideLoading()))
			.catch((err) =>
				alert('Error occurred while recieving your booklist. Try Again.', err.message)
			);
	};
}

/* update book comment */
export const handleBookComment = (id, comment) => {
	return (dispatch) => {
		dispatch(showLoading());
		return updateComment(id, comment)
			.then(() => {
				dispatch(updateBookComment(id, comment));
			})
			.then(() => dispatch(hideLoading()))
			.catch((err) =>
				alert('Error occurred while trying to update comment. Try Again', err.message)
			);
	};
};

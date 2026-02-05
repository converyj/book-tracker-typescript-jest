import React, { useState, useEffect, useCallback } from 'react';

import { BookType } from './Book';

import { searchBook } from '../utils/api';

import { trancateTitle } from '../utils/helper';

import Spinner from './Spinner';

import './dropdown.css';

type DropdownProps = {
	query: string;
	setTitle: (book: BookType) => void;
};

/**
 * @description Responsible for displaying the list of books 
 */

const Dropdown: React.FC<DropdownProps> = ({ query, setTitle }) => {
    const [
        books,
        setBooks
    ] = useState<BookType[]>([]);
    const [
        selected,
        setSelected
    ] = useState<BookType[]>([]);

    /* updates the list of books whenever query changes only if component is mounted (dropdown is showing only if query is not empty)*/
    useEffect(() => {
            let mounted = true;
            const search = () =>
                searchBook(query)
                    .then((allBooks: BookType[]) => {
                        const filteredArr = allBooks.filter((book: BookType) => {
                            return (
                                book.volumeInfo.hasOwnProperty('authors') &&
                                book.volumeInfo.hasOwnProperty('imageLinks')
                            );
                        });
                        if (mounted) setBooks(filteredArr);
                    })
                    .catch(() => alert('Cannot fetch books. Please try again.'));
            search();
            return () => {
                mounted = false;
            };
        },
        [
            query
        ]
    );

    /* Callback function to set the selected book that was clicked on from the list of books */
    const handleBook = useCallback(
        (id: string | number, books: BookType[]) => {
            setSelected(Object.values(books).filter((book: BookType) => book.id === id));
        },
        [
            selected
        ]
    );

    /* set the book title state when the selected book is updated */
    useEffect(
        () => {
            if (selected && selected.length > 0) {
                setTitle(selected[0]);
            }
        },
        [
            selected
        ]
    );

    return (
        <React.Fragment>
            {books && books.length > 0 ? (
                <ul className="search-book-list">
                    {Object.values(books).map((book) => (
                        <li
                            key={book.id}
                            id={String(book.id ?? '')}
                            onClick={(e) =>
                                handleBook(
                                    (e.currentTarget as HTMLElement).closest('.search-book-list__item')?.id ?? '',
                                    books
                                )}
                            className="search-book-list__item">
                            <img
                                src={
                                    book.volumeInfo.imageLinks &&
                                    book.volumeInfo.imageLinks.smallThumbnail
                                }
                                alt=""
                            />
                            <div>
                                <p className="search-book-list__item-title">
                                    {trancateTitle(book.volumeInfo.title)}
                                </p>
                                <p>{book.volumeInfo.authors.join(', ')}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <Spinner />
            )}
        </React.Fragment>
    );
}

export default Dropdown;
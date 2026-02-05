import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Book from '../components/Book';

describe('Book component', () => {
	it('displays book title and author', () => {
		// Arrange: create a sample book
		const book = {
			id: 'id-1',
			title: 'Example Book',
			authors: ['Jane Doe'],
			image: '',
			date: '2024-01-01',
			comment: '',
			isLibraryBook: false,
			link: '',
			rate: 4
		};

		// Act: render the component
		render(
			<ul>
				<Book book={book} />
			</ul>
		);

		// Assert: key text is visible
		expect(screen.getByText('Example Book')).toBeInTheDocument();
		expect(screen.getByText('Jane Doe')).toBeInTheDocument();
	});
});

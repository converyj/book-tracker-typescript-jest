import React from 'react';

import { BookType } from './Book';

import Star from './Star';

type DisplayRatingProps = {
	book: BookType;
	disabled?: boolean;
};

/**
 * @description Displays the rating number from the book object
 */
const DisplayRating: React.FC<DisplayRatingProps> = ({ book }) => {
	const { rate } = book;
	return (
		<div>
			<span>Your Rating:</span>
			<Star value={rate} />
		</div>
	);
};

export default DisplayRating;

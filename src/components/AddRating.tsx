import React from 'react';

import Star from './Star';

/**
 * @description Displays the rating number from the Search Form Component state 
 */

type AddRatingProps = {
    setRate: (rate: number) => void;
    rate: number;
};

const AddRating: React.FC<AddRatingProps> = ({ setRate, rate }) => {
	return (
		<div>
			<span>Your Rating:</span>
			<Star value={rate || 0} onClick={setRate} />
		</div>
	);
};

export default AddRating;

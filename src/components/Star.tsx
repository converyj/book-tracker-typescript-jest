import React from 'react';
import PropTypes from 'prop-types';

import fullStar from '../icons/full-star.svg';
import emptyStar from '../icons/empty-star.svg';
import './star.css';

type StarProps = {
	value: number;
	onClick?: (value: number) => void;
};

/**
 * @description Display rating stars of own ratings
 */
const Star: React.FC<StarProps> = ({ value, onClick }) => {
	let src: string = '';

	/**
	 * @description stores the star rating of each book in array by getting the value either from Local Storage or from the rate value  
	 * 
	 * @returns array with the types of stars to display
	 */
	const getStars = () => {
		let stars = [];

		for (let i = 1; i <= 5; i++) {
			if (i <= value) {
				stars.push('fs');
			}
			else {
				stars.push('es');
			}
		}
		return stars;
	};
	return (
		<div className="stars">
			{
				getStars().map((star: string, index: number) => {
					if (star === 'fs') src = fullStar;
					else src = emptyStar;

					return (
						<img
							style={onClick && { cursor: 'pointer' }}
							key={index}
							data-value={index + 1}
							src={src}
							alt="rating"
							width="20"
							onClick={onClick && (() => onClick(index + 1))} // enable click handler only if adding own ratings
						/>
					);
				})
			}
		</div>
	);
};

Star.propTypes = {
	value: PropTypes.number.isRequired,
	onClick: PropTypes.func
};

export default Star;

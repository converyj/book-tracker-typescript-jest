import React from 'react';

import spinner from '../icons/spinner.gif';

/**
 * @description Holds the Loading image when waiting for books to be fetched from the BookAPI
 */
const Spinner: React.FC = () => {
	return (
		<div>
			<img
				src={spinner}
				alt="Loading..."
				style={{
					width: '200px',
					margin: '40px auto',
					display: 'block'
				}}
			/>
		</div>
	);
};

export default Spinner;
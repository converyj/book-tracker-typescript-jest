import React from 'react';
import { Link } from 'react-router-dom';
import './searchBtn.css';

/**
 * @description Holds the Search Button on the Home page to link to the Search page 
 */
const SearchBtn: React.FC = () => {
	return (
		<div className="open-search">
			<Link to="/search">
				<button>Add a book</button>
			</Link>
		</div>
	);
};

export default SearchBtn;

import React, { Component } from 'react';
import './header.css';
import { PropTypes } from 'prop-types';

/**
 * @description Display the filtering options 
 */
export class Header extends Component {
	state = {
		query: '',
		sortOptions: [
			'By Author',
			'By Date'
		]
	};

	render() {
		return (
			<header>
				<input
					type="text"
					placeholder="Search By Title"
					aria-label="Search"
					onChange={(e) => this.props.filterBooks(e)}
				/>

				<select
					name="sort"
					onChange={(e) => this.props.handleSortedList(e)}
					aria-label="Sort By"
					defaultValue="Sort By">
					<option value="Sort By" disabled>
						Sort by
					</option>
					{this.state.sortOptions.map((opt, i) => (
						<option value={opt} key={i}>
							{opt}
						</option>
					))}
				</select>
			</header>
		);
	}
}

Header.propTypes = {
	filterBooks: PropTypes.func.isRequired,
	handleSortedList: PropTypes.func.isRequired
};

export default Header;

import React, { ChangeEvent, Component } from 'react';

import './header.css';

/* ---------- Types ---------- */

interface HeaderState {
    query: string;
    sortOptions: string[];
}

interface HeaderProps {
    filterBooks: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSortedList: (e: ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * @description Display the filtering options 
 */
class Header extends Component<HeaderProps, HeaderState> {
	state: HeaderState = {
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
					onChange={(e: ChangeEvent<HTMLInputElement>) => this.props.filterBooks(e)}
				/>

				<select
					name="sort"
					onChange={(e: ChangeEvent<HTMLSelectElement>) => this.props.handleSortedList(e)}
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

export default Header;

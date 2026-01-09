import React, { Component, Fragment, ChangeEvent } from 'react';
import Header from './../components/Header';
import { connect } from 'react-redux';
import BookList from '../components/BookList';
import { filterByValue, sortByAuthor, sortByDate, handleInitialData } from '../actions/books';
import SearchBtn from '../components/SearchBtn';
import Spinner from '../components/Spinner';

/* ---------- Types ---------- */

interface HomeState {
    ready: boolean;
}

interface HomeProps {
    handleInitialData: () => Promise<void>;
    filterByValue: (value: string) => void;
    sortByAuthor: () => void;
    sortByDate: () => void;
}

class Home extends Component<HomeProps, HomeState> {
    state: HomeState = {
        ready: false,
    };

	componentDidMount() {
		this.props.handleInitialData().then(() => this.setState({ ready: true }));
	}

	/* handle the filtering of books */
	filterBooks = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		this.props.filterByValue(input);
	};

	/* handle the sorting of books based on author or date */
	handleSortedList = (e: ChangeEvent<HTMLSelectElement>) => {
		let sortBy = e.target.value;
		if (sortBy === 'By Author') {
			this.props.sortByAuthor();
		}
		else if (sortBy === 'By Date') {
			this.props.sortByDate();
		}
	};

	render() {
		return (
			<div>
				<Header
					filterBooks={(e) => this.filterBooks(e)}
					handleSortedList={(e) => this.handleSortedList(e)}
				/>

				{!this.state.ready ? (
					<Spinner />
				) : (
					<Fragment>
						<BookList />
						<SearchBtn />
					</Fragment>
				)}
			</div>
		);
	}
}

export default connect(null, {
	handleInitialData,
	filterByValue,
	sortByAuthor,
	sortByDate
})(Home);

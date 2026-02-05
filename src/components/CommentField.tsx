import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './commentField.css';
import { connect } from 'react-redux';
import { handleBookComment } from '../actions/books';


interface CommentFieldProps {
	comment: string;
	id: string;
	show: () => void;
    handleBookComment: (id: string, comment: string) => Promise<void>;
}

interface CommentFieldState {
	comment: string;
}

/**
 * @description Responsible for displaying the book comment and allowing user to update it 
 */

class CommentField extends Component<CommentFieldProps, CommentFieldState> {
	private commentField: HTMLTextAreaElement | null = null;

	state: CommentFieldState = {
		comment: this.props.comment
	};

	componentDidMount() {
		this.commentField?.focus();
	}

	render() {
		const { id, handleBookComment } = this.props;
		const { comment } = this.state;

		return (
			<div>
				<textarea
					name="comment"
					value={comment}
					id={id}
					onChange={(e) => this.setState({ comment: e.target.value })}
					className="comment-field"
					ref={(input) => {
						this.commentField = input;
					}}>
					{comment}
				</textarea>
				<button
					className="btn btn--sm"
					onClick={() => handleBookComment(id, comment).then(() => this.props.show())}>
					Update
				</button>
			</div>
		);
	}
}

export default connect(null, { handleBookComment })(CommentField);

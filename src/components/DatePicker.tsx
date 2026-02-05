import 'date-fns';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

/**
 * @description Material UI Component responsible for allowing user to choose date they read book 
 */

type DatePickerProps = {
	handleDate: (date: string) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ handleDate }) => {
	// The first commit of Material-UI
	const [
		selectedDate,
		setSelectedDate
	] = useState<moment.Moment | null>(moment());

	function handleDateChange(date: moment.Moment | null) {
		setSelectedDate(date);
	}

	// set the date in the Search Form state and format it as ISOString
	useEffect(
		() => {
			if (selectedDate) {
				handleDate(selectedDate.format());
			}
		},
		[
			selectedDate
		]
	);

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant="inline"
				format="MM/DD/YYYY"
				margin="normal"
				id="date-pickr-inline"
				label="Date Read"
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change date'
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}

export default DatePicker;

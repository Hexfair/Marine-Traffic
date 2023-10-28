export const setInitialDates = () => {
	const initialStartDate = new Date();
	initialStartDate.setHours(0);
	initialStartDate.setMinutes(0);
	initialStartDate.setSeconds(0);

	const initialEndDate = new Date();
	initialEndDate.setHours(23);
	initialEndDate.setMinutes(59);
	initialEndDate.setSeconds(0);

	return [initialStartDate, initialEndDate]
}

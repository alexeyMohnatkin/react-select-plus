import stripDiacritics from './stripDiacritics';

function filterOptions(options, filterValue, excludeOptions, props) {

	let filteredValue = filterValue;

	if (props.ignoreAccents) {
		filteredValue = stripDiacritics(filteredValue);
	}

	if (props.ignoreCase) {
		filteredValue = filteredValue.toLowerCase();
	}

	const excludedOptions = !!excludeOptions && excludeOptions.map(i => i[props.valueKey]);

	return options.filter(option => {
		if (excludedOptions && excludedOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(this, option, filteredValue);
		if (!filteredValue) return true;
		let valueTest = String(option[props.valueKey]);
		let labelTest = String(option[props.labelKey]);

		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? (
			(props.matchProp !== 'label' && valueTest.substr(0, filteredValue.length) === filteredValue) ||
			(props.matchProp !== 'value' && labelTest.substr(0, filteredValue.length) === filteredValue)
		) : (
			(props.matchProp !== 'label' && valueTest.indexOf(filteredValue) >= 0) ||
			(props.matchProp !== 'value' && labelTest.indexOf(filteredValue) >= 0)
		);
	});
}

export default filterOptions;

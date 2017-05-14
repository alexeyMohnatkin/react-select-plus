import React, { Component } from 'react';
import { themr } from 'react-css-themr';
import Select from './Select';
import { propTypes, defaultProps } from './propTypes/Creatable';

function defaultChildren(props) {
	return (
		<Select {...props} />
	);
}

@themr('React-Select-Plus')
class Creatable extends Component {
	static displayName = 'CreatableSelect';
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		this.createNewOption = this.createNewOption.bind(this);
		this.filterOptions = this.filterOptions.bind(this);
		this.isOptionUnique = this.isOptionUnique.bind(this);
		this.menuRenderer = this.menuRenderer.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
		this.focus = this.focus.bind(this);
	}

	createNewOption() {
		const {
			isValidNewOption,
			newOptionCreator,
			onNewOptionClick,
			options = [],
			shouldKeyDownEventCreateNewOption,
		} = this.props;

		if (isValidNewOption({ label: this.inputValue })) {
			const option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
			const isOptionUnique = this.isOptionUnique({ option });

			// Don't add the same option twice.
			if (isOptionUnique) {
				if (onNewOptionClick) {
					onNewOptionClick(option);
				} else {
					options.unshift(option);

					this.select.selectValue(option);
				}
			}
		}
	}

	filterOptions(...params) {
		const { filterOptions, isValidNewOption, options, promptTextCreator, theme } = this.props;

		// TRICKY Check currently selected options as well.
		// Don't display a create-prompt for a value that's selected.
		// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
		const excludeOptions = params[2] || [];

		const filteredOptions = filterOptions(...params) || [];

		if (isValidNewOption({ label: this.inputValue })) {
			const { newOptionCreator } = this.props;

			const option = newOptionCreator({
				label: this.inputValue,
				labelKey: this.labelKey,
				valueKey: this.valueKey,
				className: theme.createOptionPlaceholder,
			});

			// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
			// For multi-selects, this would remove it from the filtered list.
			const isOptionUnique = this.isOptionUnique({
				option,
				options: excludeOptions.concat(filteredOptions)
			});

			if (isOptionUnique) {
				const prompt = promptTextCreator(this.inputValue);

				this._createPlaceholderOption = newOptionCreator({
					label: prompt,
					labelKey: this.labelKey,
					valueKey: this.valueKey,
					className: theme.createOptionPlaceholder,
				});

				filteredOptions.unshift(this._createPlaceholderOption);
			}
		}

		return filteredOptions;
	}

	isOptionUnique({ option, options }) {
		const { isOptionUnique } = this.props;
		const resOptions = options || this.select.filterFlatOptions();

		return isOptionUnique({
			labelKey: this.labelKey,
			option,
			options: resOptions,
			valueKey: this.valueKey
		});
	}

	menuRenderer(params) {
		const { menuRenderer } = this.props;

		return menuRenderer({
			...params,
			onSelect: this.onOptionSelect,
			selectValue: this.onOptionSelect
		});
	}

	onInputChange(input) {
		const { onInputChange } = this.props;

		if (onInputChange) {
			onInputChange(input);
		}

		// This value may be needed in between Select mounts (when this.select is null)
		this.inputValue = input;
	}

	onInputKeyDown(event) {
		const { shouldKeyDownEventCreateNewOption, onInputKeyDown } = this.props;
		console.log(this.select);
		const focusedOption = this.select.getFocusedOption();

		if (
			focusedOption &&
			focusedOption === this._createPlaceholderOption &&
			shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })
		) {
			this.createNewOption();

			// Prevent decorated Select from doing anything additional with this keyDown event
			event.preventDefault();
		} else if (onInputKeyDown) {
			onInputKeyDown(event);
		}
	}

	onOptionSelect(option, event) {
		if (option === this._createPlaceholderOption) {
			this.createNewOption();
		} else {
			this.select.selectValue(option);
		}
	}

	focus() {
		this.select.focus();
	}

	render() {
		const {
			newOptionCreator,
			shouldKeyDownEventCreateNewOption,
			...restProps
		} = this.props;

		// We can't use destructuring default values to set the children,
		// because it won't apply work if `children` is null. A falsy check is
		// more reliable in real world use-cases.

		const children = this.props.children || defaultChildren;

		const props = {
			...restProps,
			filterOptions: this.filterOptions,
			menuRenderer: this.menuRenderer,
			onInputChange: this.onInputChange,
			onInputKeyDown: this.onInputKeyDown,
			innerRef: (ref) => {
				this.select = ref;

				// These values may be needed in between Select mounts (when this.select is null)
				if (ref) {
					this.labelKey = ref.props.labelKey;
					this.valueKey = ref.props.valueKey;
				}
			}
		};
		return children(props);
		// return <Select {...props} />;
	}
}

module.exports = Creatable;

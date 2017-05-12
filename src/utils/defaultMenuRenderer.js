import classNames from 'classnames';
import React from 'react';

function isGroup(option) {
	return option && Array.isArray(option.options);
}

function menuRenderer({
	focusedOption,
	instancePrefix,
	labelKey,
	onFocus,
	onOptionRef,
	onSelect,
	optionClassName,
	optionComponent,
	optionGroupComponent,
	optionRenderer,
	options,
	valueArray,
	valueKey,
	theme,
}) {
	let OptionGroup = optionGroupComponent;
	let Option = optionComponent;
	let renderLabel = optionRenderer || this.getOptionLabel;

	const renderOptions = (optionsSubset) => {
		return optionsSubset.map((option, i) => {
			if (isGroup(option)) {
				return (
					<OptionGroup
						className={theme.optionGroup}
						key={`option-group-${i}`}
						label={renderLabel(option)}
						option={option}
						optionIndex={i}
						>
						{renderOptions(option.options)}
					</OptionGroup>
				);
			}
			let isSelected = valueArray && valueArray.indexOf(option) > -1;
			let isFocused = option === focusedOption;
			let optionRef = isFocused ? 'focused' : null;
			let optionClass = classNames(
				theme.option,
				optionClassName,
				isSelected && theme.isSelected,
				isFocused && theme.isFocused,
				option.disabled && theme.isDisabled,
			);

			return (
					<Option
						className={optionClass}
						instancePrefix={instancePrefix}
						isDisabled={option.disabled}
						isFocused={isFocused}
						isSelected={isSelected}
						key={`option-${i}-${option[valueKey]}`}
						onFocus={onFocus}
						onSelect={onSelect}
						option={option}
						optionIndex={i}
						ref={ref => {
							onOptionRef(ref, isFocused);
						}}
					>
						{renderLabel(option, i)}
					</Option>
			);

		});
	};

	return renderOptions(options);
}

module.exports = menuRenderer;

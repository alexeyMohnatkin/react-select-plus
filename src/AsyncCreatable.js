import React, { Component } from 'react';
import Select from './Select';
import { themr } from 'react-css-themr';

function reduce(obj, props = {}) {
	return Object.keys(obj)
		.reduce((props, key) => {
			const value = obj[key];

			if (typeof value !== 'undefined') {
				props[key] = value;
			}
			return props;
		}, props);
}

@themr('React-Select-Plus')
class AsyncCreatable extends Component {
	static displayName = 'AsyncCreatableSelect';

	focus() {
		this.select.focus();
	}

	render() {
		return (
			<Select.Async {...this.props}>
				{(asyncProps) => (
					<Select.Creatable {...this.props}>
						{(creatableProps) => (
							<Select
								{...reduce(asyncProps, reduce(creatableProps, {}))}
								onInputChange={(input) => {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								}}
								innerRef={(ref) => {
									this.select = ref;
									creatableProps.innerRef(ref);
									asyncProps.ref(ref);
								}}
							/>
						)}
					</Select.Creatable>
				)}
			</Select.Async>
		);
	}
}

module.exports = AsyncCreatable;

/* eslint react/prop-types: 0 */

import React from 'react';
import { ThemeProvider } from 'react-css-themr';

import Creatable from './components/Creatable';
import Contributors from './components/Contributors';
import GithubUsers from './components/GithubUsers';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import GroupedOptionsField from './components/GroupedOptionsField';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import BooleanSelect from './components/BooleanSelect';
import Virtualized from './components/Virtualized';
import States from './components/States';

import selectTheme from '../css/default.css';
const theme = {
	'React-Select-Plus': selectTheme,
};

export default () => (
	<ThemeProvider theme={theme}>
		<div>
			<States label="States" searchable />
			<Multiselect label="Multiselect" />
			<Virtualized label="Virtualized" />
			<Contributors label="Contributors (Async)" />
			<GithubUsers label="Github users (Async with fetch.js)" />
			<NumericSelect label="Numeric Values" />
			<BooleanSelect label="Boolean Values" />
			<GroupedOptionsField label="Option Groups" />
			<CustomRender label="Custom Render Methods"/>
			<CustomComponents label="Custom Placeholder, Option, Value, and Arrow Components" />
			<Creatable
				hint="Enter a value that's NOT in the list, then hit return"
				label="Custom tag creation"
			/>
		</div>
	</ThemeProvider>
);

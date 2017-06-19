import React from 'react';

const arrowRenderer =({ theme, onMouseDown }) => {
	return (
		<span
			className={theme.arrow}
			onMouseDown={onMouseDown}
		/>
	);
};

export default arrowRenderer;

import React from 'react';

export default function clearRenderer({ theme }) {
	return (
		<span
			className={theme.clear}
			dangerouslySetInnerHTML={{ __html: '&times;' }}
		/>
	);
}

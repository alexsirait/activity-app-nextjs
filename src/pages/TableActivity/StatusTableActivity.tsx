import React from 'react';

export default function StatusTableActivity({
	status,
}: {
	status: string | undefined;
}) {
	let classSpan;
	let textSpan;
	if (status == 'unfinished') {
		classSpan = 'btn btn-warning btn-sm';
		textSpan = 'Unfinished';
	} else if (status == 'finished') {
		classSpan = 'btn btn-success btn-sm';
		textSpan = 'Finished';
	}
	return <button className={classSpan}>{textSpan}</button>;
}

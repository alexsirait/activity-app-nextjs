import React from 'react';
import { CiAlarmOn } from 'react-icons/ci';

export default function CardHeaderTableActivity({
	isFetching,
}: {
	isFetching: Boolean;
}) {
	return (
		<div className="card-header fw-bold d-flex justify-content-between">
			<div>
				<CiAlarmOn /> Activity List
			</div>
			<div>
				{isFetching && (
					<span
						className="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
				)}
			</div>
		</div>
	);
}

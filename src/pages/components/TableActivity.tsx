import React from 'react';
import { useQuery } from 'react-query';
import { typesActivity } from '../types/typesActivity';
import { GrCoffee } from 'react-icons/gr';
import TheadTableActivity from '../TableActivity/TheadTableActivity';
import CardHeaderTableActivity from '../TableActivity/CardHeaderTableActivity';
import Moment from 'react-moment';
import StatusTableActivity from '../TableActivity/StatusTableActivity';

const getActivity = async () => {
	const URL = 'http://localhost:3000/api/activity';
	const res = await fetch(URL);
	if (!res.ok) {
		return new Error('Invalid URL ..');
	}
	return await res.json();
};

export default function TableActivity() {
	const { data, isSuccess, isError, isFetching } = useQuery(
		'activity',
		getActivity,
		{
			staleTime: 15000,
			refetchInterval: 15000,
		}
	);
	return (
		<div className="col-md-6">
			<div className="card">
				<CardHeaderTableActivity isFetching={isFetching} />
				<div className="card-body">
					<table className="table">
						<TheadTableActivity />
						<tbody>
							{data?.length !== 0 &&
								isSuccess &&
								!isError &&
								data?.map((act: typesActivity, index: number) => (
									<tr key={index}>
										<th scope="row">{++index}</th>
										<td>
											<Moment interval={1000} fromNow>
												{act.createdAt}
											</Moment>
										</td>
										<td>{act.activity}</td>
										<td>
											<StatusTableActivity status={act.status} />
										</td>
									</tr>
								))}
						</tbody>
					</table>
					{data?.length === 0 && (
						<span className="p-2">
							<GrCoffee /> Empty table ..
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

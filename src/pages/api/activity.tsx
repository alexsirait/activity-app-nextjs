import type { NextApiRequest, NextApiResponse } from 'next';

interface Activity {
	id: string;
	createdAt?: string;
	activity: string;
	status?: string;
}

interface ActivityStatus {
	id: string;
	status: string;
}

let messages: Activity[] = [];

const addMessage = (data: Activity): Activity[] => {
	const preData = {
		id: messages.length + 1,
		createdAt: new Date().toISOString(),
		status: 'unfinished',
	};
	const objData = typeof data == 'string' ? JSON.parse(data) : data;
	const finalData = { ...preData, ...objData };
	messages = [...messages, finalData];
	return [finalData];
};

const updateStatus = (data: ActivityStatus) => {
	const find = messages.map((act) => {
		if (act.id == data.id) {
			act.status = data.status;
		}
		return act;
	});
	messages = find;
	return [
		{
			id: data.id,
			status: data.status,
		},
	];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: Activity[] | ActivityStatus[] = [];
	switch (req.method) {
		case 'GET':
			response = messages;
			break;

		case 'POST':
			response = addMessage(req.body);
			break;

		case 'PUT':
			response = updateStatus(req.body);
			break;
	}

	setTimeout(() => {
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(response));
	}, 2000);
}

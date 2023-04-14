import Head from 'next/head';
import React from 'react';
import FormActivity from './components/FormActivity';
import TableActivity from './components/TableActivity';

export default function Home() {
	return (
		<>
			<Head>
				<title>Activity App</title>
			</Head>
			<main>
				<div className="row">
					<FormActivity />
					<TableActivity />
				</div>
			</main>
		</>
	);
}

import React from 'react';
import { useForm } from 'react-hook-form';
import { CiPaperplane } from 'react-icons/ci';
import { typesActivity } from '../types/typesActivity';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiCircle } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
	activity: yup
		.string()
		.required('Activity is a required field ..')
		.min(2, 'Activity must be at least 2 char ..'),
});

const submitActivity = async (data: typesActivity | undefined) => {
	const URL = 'http://localhost:3000/api/activity';
	const res = await fetch(URL, { method: 'post', body: JSON.stringify(data) });
	if (!res.ok) {
		return new Error('Invalid URL ..');
	}
	return await res.json();
};

export default function FormActivity() {
	const queryClient = useQueryClient();
	const mutation = useMutation(submitActivity, {
		async onMutate(newData) {
			await queryClient.cancelQueries('activity');
			const prevAct = queryClient.getQueryData<any>('activity');
			if (newData) {
				newData = { ...newData, createdAt: new Date().toISOString() };
				const finalAct = [...prevAct, newData];
				reset();
				return queryClient.setQueryData<any>('activity', finalAct);
			} else {
				reset();
				return { prevAct };
			}
		},
		async onSettled(data, error, variables, context) {
			if (data) {
				return await queryClient.invalidateQueries('activity');
			}
		},
		async onSuccess(data, variables, context) {
			clearErrors();
		},
		async onError(error, variables, context) {
			if (context?.prevAct) {
				queryClient.setQueriesData<any>('activity', context.prevAct);
			}
		},
	});
	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<typesActivity>({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: typesActivity) => {
		await mutation.mutate(data);
		toast.success('Successfully submitted!');
	};
	return (
		<div className="col-md-6">
			<div className="card">
				<div className="card-header fw-bold">
					<CiPaperplane /> Activity Form
				</div>
				<div className="card-body">
					<form>
						<div className="form-group">
							<label htmlFor="activityId">Activity</label>
							<input
								type="text"
								className="form-control"
								id="activityId"
								aria-describedby="isActivity"
								placeholder="Enter Activity ..."
								{...register('activity')}
								name="activity"
							/>
							<small id="isActivity" className="form-text text-muted">
								We{`'`}ll never share your activity with anyone else.
							</small>
							<div>
								<span className="text-danger">{errors.activity?.message}</span>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-secondary mt-2"
							onClick={handleSubmit(onSubmit)}
							disabled={isSubmitting}
						>
							{isSubmitting && (
								<span
									className="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"
								></span>
							)}{' '}
							{!isSubmitting && <FiCircle />} Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

import React, { FC, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { createTrain } from '../../store';
import { UpdateTrain } from '../UpdateTrain';

interface IFormData {
	id: number;
	trainNumber: number;
	fromCity: string;
	toCity: string;
	departureTime: Date;
	arrivalTime: Date;
}
const Control: FC = () => {
	const { state } = useLocation();
	const train = useMemo(() => state?.train || {}, [state]);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm<IFormData>();

	const dispatch = useAppDispatch();

	const onSubmit = useCallback(
		(data: IFormData) => {
			try {
				dispatch(createTrain(data));
			} catch (e: any) {
				console.log(e.message);
			}
			reset();
		},
		[dispatch, reset]
	);

	if (Object.keys(train).length === 0) {
		return (
			<section>
				<h2 className={'text-xl text-gray-100 text-center'}>Create train</h2>
				<hr />
				<div className=' mt-10 flex flex-col items-center justify-evenly bg-gray-900'>
					<div className='bg-gray-700 p-4 rounded-lg'>
						<form onSubmit={handleSubmit(onSubmit)} className='w-80'>
							<label htmlFor='trainNumber' className={'block mb-2 text-gray-300'}>
								{' '}
								№Train:{' '}
							</label>
							<input
								type='search'
								defaultValue={''}
								id='trainNumber'
								className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
								{...register('trainNumber', { maxLength: 7 })}
							/>
							{errors.trainNumber && (
								<span className={'text-xs text-red-600'}>This field must be no more than 7 numbers</span>
							)}

							<label className='block mb-2 text-gray-300' htmlFor='fromCity'>
								From City
							</label>
							<input
								type='text'
								defaultValue={''}
								{...register('fromCity', {
									required: 'From city is required',
									pattern: {
										value: /^[a-zA-Z]{1,30}$/,
										message: 'From city must be between 1 and 30 letters long and contain only English letters'
									}
								})}
								className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
							/>
							{errors.fromCity && (
								<p className='text-red-500 text-sm'>
									From city must be between 1 and 30 letters long and contain only English letters
								</p>
							)}

							<label className='block mb-2 text-gray-300' htmlFor='toCity'>
								To City
							</label>
							<input
								type='text'
								defaultValue={''}
								{...register('toCity', {
									required: 'To city is required',
									pattern: {
										value: /^[a-zA-Z]{1,30}$/,
										message: 'To city must be between 1 and 30 letters long and contain only English letters'
									}
								})}
								className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
							/>
							{errors.toCity && (
								<p className='text-red-500 text-sm'>
									{' '}
									To city must be between 1 and 30 letters long and contain only English letters
								</p>
							)}

							<label className='block mb-2 text-gray-300' htmlFor='departureTime'>
								Departure Time
							</label>
							<input
								type='datetime-local'
								defaultValue={''}
								{...register('departureTime', {
									required: 'Departure time is required'
								})}
								className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
							/>
							{errors.departureTime && <p className='text-red-500 text-sm'>must be time</p>}

							<label className='block mb-2 text-gray-300' htmlFor='arrivalTime'>
								Arrival Time
							</label>
							<input
								type='datetime-local'
								{...register('arrivalTime', {
									required: 'Arrival time is required'
								})}
								className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
							/>
							{errors.departureTime && <p className='text-red-500 text-sm'>must be time</p>}
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								type='submit'
							>
								Add Train
							</button>
						</form>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<section>
				<h2 className={'text-xl text-gray-100 text-center mt-10 '}>Update train</h2>
				<hr className={'bg-blend-color bg-white'} />
				<UpdateTrain />
			</section>
		</>
	);
};

export { Control };

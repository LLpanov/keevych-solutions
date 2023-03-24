import { FC, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';

import { ITrainUpdate } from '../../interfaces';
import { updateTrain } from '../../store';
import { useAppDispatch } from '../../hooks';

const UpdateTrain: FC = () => {
	const { state } = useLocation();
	const train = useMemo(() => state?.train || {}, [state]);
	const departureTime = moment(train.departureTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('YYYY-MM-DDTHH:mm');
	const arrivalTime = moment(train.arrivalTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('YYYY-MM-DDTHH:mm');

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm({
		defaultValues: {
			trainNumber: train.trainNumber || '',
			fromCity: train.fromCity || '',
			toCity: train.toCity || '',
			departureTime: departureTime || '',
			arrivalTime: arrivalTime || ''
		}
	});
	const dispatch = useAppDispatch();

	const onUpdateSubmit = useCallback(
		(data: ITrainUpdate) => {
			dispatch(updateTrain({ id: train.id, dataTrain: data }));
			reset();
		},
		[dispatch, reset, train.id]
	);
	return (
		<>
			<div className='flex flex-col items-center justify-evenly h-full bg-gray-900'>
				<div className='bg-gray-700 mt-20 p-4 rounded-lg'>
					<span className={'text-green-700 text-xl text-center p-14'}>Update this train</span>
					<form onSubmit={handleSubmit(onUpdateSubmit)} className='w-80'>
						<label className='block mb-2 text-gray-300' htmlFor='fromCity'>
							From City
						</label>
						<input
							type='text'
							{...register('fromCity', {
								pattern: {
									value: /^[a-zA-Z]{1,30}$/,
									message: 'From city must be between 1 and 30 letters long and contain only English letters'
								}
							})}
							className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
						/>
						{errors.toCity && (
							<p className='text-red-500 text-sm'>
								{' '}
								From city must be between 1 and 30 letters long and contain only English letters
							</p>
						)}

						<label className='block mb-2 text-gray-300' htmlFor='toCity'>
							To City
						</label>
						<input
							type='text'
							{...register('toCity', {
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
							{...register('departureTime', {})}
							className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
						/>
						{errors.departureTime && <p className='text-red-500 text-sm'>must be time</p>}

						<label className='block mb-2 text-gray-300' htmlFor='arrivalTime'>
							Arrival Time
						</label>
						{errors.departureTime && <p className='text-red-500 text-sm'>must be time</p>}
						<input
							type='datetime-local'
							{...register('arrivalTime', {})}
							className='block w-full rounded border-gray-300 p-2 mb-4 bg-gray-600 text-gray-300'
						/>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export { UpdateTrain };

import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteTrain, getAllTrains, getTrainsByTrainNumber } from '../../store';

interface FormValues {
	trainNumber: number;
}
const Trains: FC = () => {
	const [selectedCity, setSelectedCity] = useState('');
	const [deletedId, setDeletedId] = useState<number | null>(null);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormValues>({ mode: 'onChange' });

	const { trains, currentTrainByNumber } = useAppSelector(state => state.trainsReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllTrains());
	}, [deletedId]);
	const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCity(event.target.value);
	};
	const filteredTrains = selectedCity
		? trains.filter(train => {
				return train.fromCity === selectedCity || train.toCity === selectedCity;
		  })
		: trains;

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			const { trainNumber } = data;
			if (trainNumber) {
				dispatch(getTrainsByTrainNumber(Number(trainNumber)));
			} else {
				dispatch(getAllTrains());
			}
		} catch (e: any) {
			console.error(e.message);
		}
		reset();
	};

	const onDelete = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		e.preventDefault();
		dispatch(deleteTrain(id)).then(() => {
			setDeletedId(id);
		});
	};

	return (
		<>
			<section className='flex flex-col justify-center items-center mt-10 gap-y-10 mx-auto'>
				<h1 className='text-gray-300 text-xl text-center'>All Trains</h1>
				<div className='w-3/4 h-[40px] bg-gray-400 flex items-center justify-center mx-auto gap-x-5 rounded-sm'>
					<span className='text-black'>City:</span>
					<select className='bg-gray-200 w-[120px] rounded-md' value={selectedCity} onChange={handleCityChange}>
						<option value=''>All cities</option>
						<option value='Kyiv'>Kyiv</option>
						<option value='Lviv'>Lviv</option>
						<option value='Odesa'>Odesa</option>
						<option value='Ivano-Frankivsk'>Ivano-Frankivsk</option>
						<option value='Rivne'>Rivne</option>
						<option value='Dnipro'>Dnipro</option>
						<option value='Kharkiv'>Kharkiv</option>
					</select>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<label htmlFor='trainNumber'> №Train: </label>
							<input type='search' id='trainNumber' {...register('trainNumber', { maxLength: 7 })} />
							{errors.trainNumber && (
								<span className={'text-xs text-red-600'}>This field must be no more than 7 numbers</span>
							)}
							<button type='submit' className={'text-xm bg-amber-200 h-full'}>
								Find
							</button>
						</form>
					</div>
				</div>
			</section>
			{currentTrainByNumber ? (
				<div className={'flex flex-col items-center'}>
					<div className='bg-gray-400 mt-6 mb-5 w-[50%] rounded-lg p-4'>
						<h3 className='text-sm font-medium mb-2'>{`Train №${currentTrainByNumber.trainNumber}`}</h3>
						<p className='mb-2 text-sm'>
							<strong>Direction:</strong> {currentTrainByNumber.fromCity}{' '}
							<span style={{ fontSize: '1rem', color: 'blue' }}>➡</span> {currentTrainByNumber.toCity}
						</p>
						<p className='mb-2 text-sm'>
							<strong>Departure : </strong> {moment(currentTrainByNumber.departureTime).format('DD.MM.YYYY HH:mm')}
						</p>
						<p className='mb-2 text-sm'>
							<strong>Arrival : </strong> {moment(currentTrainByNumber.arrivalTime).format('DD.MM.YYYY HH:mm')}
						</p>
					</div>
				</div>
			) : null}

			<div className='grid grid-cols-3 mt-5'>
				{filteredTrains.map(train => (
					<div key={train.id} className='p-4'>
						<div className='bg-gray-400 rounded-lg p-4'>
							<h3 className='text-sm font-medium mb-2'>{`Train №${train.trainNumber}`}</h3>
							<p className='mb-2 text-sm'>
								<strong>Direction:</strong> {train.fromCity} <span style={{ fontSize: '1rem', color: 'blue' }}>➡</span>{' '}
								{train.toCity}
							</p>
							<p className='mb-2 text-sm'>
								<strong>Departure : </strong> {moment(train.departureTime).format('DD.MM.YYYY HH:mm')}
							</p>
							<p className='mb-2 text-sm'>
								<strong>Arrival : </strong> {moment(train.arrivalTime).format('DD.MM.YYYY HH:mm')}
							</p>
							<div className='flex justify-end mt-4'>
								<button
									className='text-red-600 mr-2 hover:animate-pulse ease-in-out'
									onClick={e => onDelete(train.id, e)}
								>
									Delete
								</button>
								<button
									className='text-green-700 hover:animate-pulse ease-in-out '
									onClick={() => navigate('/control', { state: { train } })}
								>
									Update
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export { Trains };

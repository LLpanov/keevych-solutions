import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ITrain } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import moment from 'moment/moment';

interface FormValues {
	from: string;
	to: string;
}

const FindTrain: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormValues>({ mode: 'onChange' });

	const { trains } = useAppSelector(state => state.trainsReducer);
	const [filteredTrains, setFilteredTrains] = useState<ITrain[]>([]);
	const [isSearched, setIsSearched] = useState(false);

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			const filterTrains = trains.filter(train => {
				return train.fromCity === data.from && train.toCity === data.to;
			});
			setFilteredTrains(filterTrains);
			setIsSearched(true);
			setTimeout(() => setIsSearched(false), 3000);
		} catch (e: any) {
			console.log(e.message);
		}
		reset();
	};

	const handleSwapClick = (data: FormValues) => {
		reset({
			from: data.to,
			to: data.from
		});
	};

	return (
		<section className={'flex flex-col items-center'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex mt-2 flex-row items-center text-center  bg-slate-800 rounded-sm gap-2 p-2'>
					<div className='w-fit'>
						<label htmlFor='from' className='block text-gray-400 font-bold mb-2'>
							From
						</label>
						<input
							type='search'
							defaultValue={''}
							placeholder='...City'
							id='from'
							className='shadow appearance-none border rounded max-w-full max-h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							{...register('from', { required: true, pattern: /^[a-zA-Z]+$/ })}
						/>
						<div>
							{errors.from && (
								<span className='text-red-500 text-xs'>Name must be in English and no longer than 30 characters</span>
							)}
						</div>
					</div>
					<div className='w-fit '>
						<label htmlFor='to' className='block text-gray-400 font-bold mb-2'>
							To
						</label>
						<input
							type='search'
							defaultValue={''}
							id='to'
							placeholder='...City'
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							{...register('to', { required: true, pattern: /^[a-zA-Z]+$/ })}
						/>
						<p>
							{errors.to && (
								<span className='text-red-500 text-xs'>Name must be in English and no longer than 30 characters</span>
							)}
						</p>
					</div>
					<div className=' h-full'>
						<button
							className='bg-blue-500 mt-7 max-w-full rounded-sm  hover:bg-blue-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline'
							type='submit'
							style={{ height: '2.4rem' }}
						>
							Search
						</button>
						<button
							className='bg-blue-500 max-w-full  rounded-sm  hover:bg-blue-700 text-white font-bold py-2 px-4  ml-2 focus:outline-none focus:shadow-outline'
							type='button'
							onClick={handleSubmit(handleSwapClick)}
							style={{ height: '2.4rem' }}
						>
							Swap
						</button>
					</div>
				</div>
			</form>

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
						</div>
					</div>
				))}
			</div>
			{isSearched && filteredTrains.length === 0 && <p className='mt-5 text-center text-gray-500'>No trains found</p>}
		</section>
	);
};

export { FindTrain };

import { FC } from 'react';

import { FindTrain } from '../FindTrain';
import { Trains } from '../Trains';

const Schedule: FC = () => {
	return (
		<>
			<section className={'flex flex-col justify-center items-center mt-5'}>
				<h2 className={'text-gray-300 text-2xl'}>Schedule Trains </h2>
				<hr className={'border-gray-300 w-full my-2'} />
			</section>
			<FindTrain />
			<Trains />
		</>
	);
};

export { Schedule };

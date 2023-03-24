import { FC } from 'react';

const Error: FC = () => {
	return (
		<div className={'flex justify-center items-center h-screen'}>
			<div className={'text-xl text-red-600 absolute'}>This address is incorrect....</div>
		</div>
	);
};

export { Error };

import { FC } from 'react';
import { FaTrain } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header: FC = () => {
	return (
		<aside className={'bg-blue-400 w-40 h-[100%] p-2  '}>
			<section className={'flex flex-col justify-center items-center gap-y-7  text-center'}>
				<div className={'mt-10'}>
					<FaTrain style={{ fontSize: '2rem', transform: 'scale(1.5)' }} />
				</div>

				<NavLink to='/schedule'>
					<nav
						className={
							'text-sm h-10 w-max p-2.5 font-bold cursor-pointer transition-colors duration-200 mt-10' +
							' hover:bg-amber-500 hover:shadow-lg rounded-md'
						}
					>
						Schedule
					</nav>
				</NavLink>

				<NavLink to='/control'>
					<nav
						className={
							'text-sm h-10 w-full  p-2.5 font-bold border-solid cursor-pointer' +
							' transition-colors' +
							' duration-200 hover:bg-amber-500 hover:shadow-lg rounded-md '
						}
					>
						ControlPanel
					</nav>
				</NavLink>
			</section>
		</aside>
	);
};

export { Header };

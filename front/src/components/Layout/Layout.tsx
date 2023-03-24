import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

const Layout: FC = () => {
	return (
		<header className={'flex h-screen'}>
			<Header />
			<div className={'flex-1'}>
				<Outlet />
			</div>
		</header>
	);
};

export { Layout };

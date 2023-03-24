import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { SchedulePage } from './pages/SchedulePage';
import { ControlPage } from './pages/ControlPage';

const App: FC = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Layout />}>
				<Route index element={<Navigate to={'schedule'} />} />
				<Route path={'schedule'} element={<SchedulePage />}></Route>
				<Route path={'control'} element={<ControlPage />}></Route>
				<Route path={'*'} element={<ErrorPage />}></Route>
			</Route>
		</Routes>
	);
};

export { App };

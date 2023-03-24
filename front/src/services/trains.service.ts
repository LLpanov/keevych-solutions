import { axiosService } from './axios.service';
import { ITrain, ITrainUpdate } from '../interfaces';

export const trainsService = {
	getAll: (): Promise<ITrain[]> => axiosService.get('/trains').then(res => res.data),
	getById: (id: number): Promise<ITrain> => axiosService.get(`/trains/${id}`).then(res => res.data),
	getByTrainNumber: (trainNumber: number): Promise<ITrain> =>
		axiosService.get(`/trains/train-number/${trainNumber}`).then(res => res.data),
	create: (data: ITrain): Promise<ITrain> => axiosService.post('/trains/control', data).then(res => res.data),
	update: (id: number, data: ITrainUpdate): Promise<ITrain> =>
		axiosService.put(`/trains/control/${id}`, data).then(res => res.data),
	delete: (id: number): Promise<void> => axiosService.delete(`/trains/control/${id}`)
};

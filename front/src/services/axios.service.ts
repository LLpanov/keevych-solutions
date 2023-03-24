import axios from 'axios';

import { baseUrl } from '../config';

export const axiosService = axios.create({
	baseURL: baseUrl
});

import { ITrain, ITrainUpdate } from '../../interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { trainsService } from '../../services';

interface ITrainState {
	trains: ITrain[];
	currentTrain: ITrain | null;
	currentTrainByNumber: ITrain | null;
	error: null;
	status: 'fulfilled' | 'pending' | 'rejected' | null;
}

export const initialState: ITrainState = {
	trains: [],
	currentTrain: null,
	currentTrainByNumber: null,
	error: null,
	status: null
};

export const getAllTrains = createAsyncThunk('trains/getAllTrains', async (_, { rejectWithValue }) => {
	try {
		const data = await trainsService.getAll();
		return { data };
	} catch (e: any) {
		return rejectWithValue(e.message as string);
	}
});

export const getTrainsById = createAsyncThunk('trains/getTrainsById', async (id: number, { rejectWithValue }) => {
	try {
		const data = await trainsService.getById(id);
		return { data };
	} catch (e: any) {
		return rejectWithValue(e.message as string);
	}
});

export const getTrainsByTrainNumber = createAsyncThunk(
	'trains/getTrainsByTrainNumber',
	async (trainNumber: number, { rejectWithValue }) => {
		try {
			const data = await trainsService.getByTrainNumber(trainNumber);
			return { data };
		} catch (e: any) {
			return rejectWithValue(e.message as string);
		}
	}
);

export const createTrain = createAsyncThunk('trains/createTrain', async (train: ITrain, { rejectWithValue }) => {
	try {
		const data = await trainsService.create(train);
		return { data };
	} catch (e: any) {
		return rejectWithValue(e.message as string);
	}
});

export const updateTrain = createAsyncThunk(
	'trains/updateTrain',
	async ({ id, dataTrain }: { id: number; dataTrain: ITrainUpdate }, { rejectWithValue }) => {
		try {
			const data = await trainsService.update(id, dataTrain);
			return { data };
		} catch (e: any) {
			return rejectWithValue(e.message as string);
		}
	}
);
export const deleteTrain = createAsyncThunk('trains/deleteTrain', async (id: number, { rejectWithValue }) => {
	try {
		await trainsService.delete(id);
	} catch (e: any) {
		return rejectWithValue(e.message as string);
	}
});

export const trainsSlice = createSlice({
	name: 'train',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllTrains.pending, state => {
				state.status = 'pending';
			})
			.addCase(getAllTrains.fulfilled, (state, { payload: { data } }) => {
				state.status = 'fulfilled';
				state.trains = data;
			})
			.addCase(getAllTrains.rejected, (state, action: PayloadAction<string | any>) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(getTrainsById.pending, state => {
				state.status = 'pending';
			})
			.addCase(getTrainsById.fulfilled, (state, { payload: { data } }) => {
				state.status = 'fulfilled';
				state.currentTrain = data;
			})
			.addCase(getTrainsById.rejected, (state, action: PayloadAction<string | any>) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(getTrainsByTrainNumber.pending, state => {
				state.status = 'pending';
			})
			.addCase(getTrainsByTrainNumber.fulfilled, (state, { payload: { data } }) => {
				state.status = 'fulfilled';
				state.currentTrainByNumber = data;
			})
			.addCase(getTrainsByTrainNumber.rejected, (state, action: PayloadAction<string | any>) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(createTrain.fulfilled, (state, action) => {
				state.trains.push(action.payload.data);
			})
			.addCase(updateTrain.fulfilled, (state, action) => {
				const { id, ...data } = action.payload.data as ITrain;
				const index = state.trains.findIndex(train => train.id === id);
				if (index !== -1) {
					state.trains[index] = { ...state.trains[index], ...data };
				}
			})

			.addCase(deleteTrain.fulfilled, (state, action) => {
				const index = state.trains.findIndex(train => train.id === action.payload);
				if (index !== -1) {
					state.trains.splice(index, 1);
				}
			});
	}
});

const trainsReducer = trainsSlice.reducer;
export { trainsReducer };

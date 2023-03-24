export interface ITrain {
	id: number;
	trainNumber: number;
	fromCity: string;
	toCity: string;
	departureTime: Date;
	arrivalTime: Date;
}

export interface ITrainUpdate {
	fromCity?: string;
	toCity?: string;
	departureTime?: string;
	arrivalTime?: string;
}

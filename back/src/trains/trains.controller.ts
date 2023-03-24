import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainsService } from './trains.service';

import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainsEntity } from './entity/trains.entity';

@ApiTags('Schedule')
@Controller('trains')
export class TrainsController {
	constructor(private readonly trainService: TrainsService) {}

	@ApiOperation({ summary: 'get all trains', description: 'get all trains with data base' })
	@ApiResponse({ status: 200, type: [TrainsEntity] })
	@ApiOkResponse({
		status: 200,
		schema: {
			example: [
				{
					id: 1,
					trainNumber: 3344454,
					fromCity: 'Lviv',
					toCity: 'Kharkiv',
					departureTime: '2023-03-20 18:30:00',
					arrivalTime: '2023-03-20 22:30:00'
				},
				{
					id: 2,
					trainNumber: 2244459,
					fromCity: 'Kyiv',
					toCity: 'Yalta',
					departureTime: '2023-05-22 13:30:00',
					arrivalTime: '2023-05-24 9:30:00'
				}
			]
		}
	})
	@Get()
	async getAll() {
		return this.trainService.getAll();
	}

	@ApiOperation({ summary: 'get train by id' })
	@ApiResponse({ status: 200, type: [TrainsEntity] })
	@ApiResponse({ status: 404, description: 'Train not found.' })
	@Get(':id')
	async getById(@Param('id') id: string) {
		console.log(id);
		return this.trainService.getById(id);
	}

	@ApiResponse({ status: 200, description: 'Get train with the number of train ' })
	@ApiResponse({ status: 404, description: 'Train not found.' })
	@Get('train-number/:trainNumber')
	async getByTrainNumber(@Param('trainNumber') trainNumber: string): Promise<TrainsEntity> {
		const train = await this.trainService.getByTrainNumber(trainNumber);
		if (!train) {
			throw new HttpException('Train not found', HttpStatus.NOT_FOUND);
		}
		return train;
	}

	@ApiOperation({ summary: 'Create Train' })
	@ApiResponse({ status: 200, type: [TrainsEntity] })
	@HttpCode(HttpStatus.CREATED)
	@Post('/control')
	async createTrain(@Body() dto: CreateTrainDto) {
		return this.trainService.createTrain(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put('/control/:id')
	async updateTrain(@Param('id') id: string, @Body() dto: UpdateTrainDto) {
		return this.trainService.updateTrain(id, dto);
	}

	@HttpCode(HttpStatus.OK)
	@Delete('/control/:id')
	async deleteTrain(@Param('id') id: string) {
		return this.trainService.deleteTrain(id);
	}
}

import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { TrainsEntity } from './entity/trains.entity';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

@Injectable()
export class TrainsService {
	constructor(
		@InjectRepository(TrainsEntity)
		private readonly trainRepository: Repository<TrainsEntity>
	) {}

	async getAll(): Promise<TrainsEntity[]> {
		try {
			return await this.trainRepository.find();
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getById(id: string): Promise<TrainsEntity> {
		try {
			return await this.trainRepository.findOne({
				where: { id: Number(id) }
			});
		} catch (e) {
			throw new HttpException('This train not found', HttpStatus.NOT_FOUND);
		}
	}

	async getByTrainNumber(trainNumber: string): Promise<TrainsEntity> {
		try {
			return await this.trainRepository.findOneOrFail({
				where: {
					trainNumber: Number(trainNumber)
				}
			});
		} catch (e) {
			throw new HttpException('This train not found', HttpStatus.NOT_FOUND);
		}
	}

	async createTrain(dto: CreateTrainDto): Promise<TrainsEntity> {
		try {
			const train = this.trainRepository.create(dto);
			return this.trainRepository.save(train);
		} catch (e) {
			throw new HttpException(`Train could not be created: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateTrain(id: string, dto: UpdateTrainDto): Promise<TrainsEntity> {
		try {
			const train = await this.getById(id);
			const updatedTrain = { ...train, ...dto };
			await this.trainRepository.update(id, updatedTrain);
			return this.getById(id);
		} catch (e) {
			throw new HttpException(`Train could not be updated: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async deleteTrain(id: string): Promise<DeleteResult> {
		try {
			const train = await this.getById(id);
			return this.trainRepository.delete(train);
		} catch (e) {
			throw new HttpException(`Train could not be deleted ${e.message}`, HttpStatus.BAD_REQUEST);
		}
	}
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString, Length, ValidateIf } from 'class-validator';

export class CreateTrainDto {

	@IsNumber({}, { message: 'must be a number' })
	@IsNotEmpty({ message: 'must be a number of train' })
	@Length(7, 7, { message: 'must be a 7-digit number' })
	@ApiProperty({ example: 3456789, description: ' № of train' })
	readonly trainNumber: number;

	@IsString({ message: 'must be a string' })
	@IsNotEmpty({ message: 'must be a location' })
	@ApiProperty({ example: 'Lviv', description: 'base locate train station' })
	readonly fromCity: string;

	@IsString({ message: 'must be a string' })
	@IsNotEmpty({ message: 'must be a location' })
	@ApiProperty({ example: 'Rivne', description: 'the end locate train station' })
	readonly toCity: string;

	@IsNotEmpty()
	@ValidateIf(dto => dto.departureTime < dto.arrivalTime, {
		message: 'Departure time must be earlier than arrival time'
	})
	@ApiProperty({ example: '2023-03-20 18:30:00', description: 'time from shipment' })
	@Transform(({ value }) => new Date(value))
	readonly departureTime: Date;

	@ApiProperty({ example: '2023-03-20 22:30:00', description: 'time from shipment' })
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	readonly arrivalTime: Date;
}

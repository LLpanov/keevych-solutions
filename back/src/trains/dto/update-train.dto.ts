import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class UpdateTrainDto {
	@IsString()
	@ApiProperty({ example: 'Rivne', description: 'update start train station' })
	readonly fromCity: string

	@IsString()
	@ApiProperty({ example: 'Kyiv', description: 'update end train station' })
	readonly toCity: string

	@Transform(({ value }) => new Date(value))
	readonly departureTime: Date

	@Transform(({ value }) => new Date(value))
	readonly arrivalTime: Date
}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TrainsService } from './trains.service'
import { TrainsController } from './trains.controller'
import { TrainsEntity } from './entity/trains.entity'

@Module({
	imports: [TypeOrmModule.forFeature([TrainsEntity])],
	providers: [TrainsService],
	controllers: [TrainsController]
})
export class TrainsModule {}

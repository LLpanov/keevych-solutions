import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Trains' })
export class TrainsEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'int', unique: true })
	trainNumber: number

	@Column({ type: 'varchar', length: 255 })
	fromCity: string

	@Column({ type: 'varchar', length: 255 })
	toCity: string

	@Column({ type: 'timestamp', precision: 0 })
	departureTime: Date

	@Column({ type: 'timestamp', precision: 0 })
	arrivalTime: Date
}

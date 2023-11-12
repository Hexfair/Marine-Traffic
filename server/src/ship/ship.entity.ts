import { Position } from 'src/position/position.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ship {
	@PrimaryGeneratedColumn({ name: 'ship_id' })
	id: number;

	@Column({ unique: true })
	shipId: number;

	@Column()
	mmsi: number;

	@Column()
	name: string;

	@Column()
	base: string;

	@Column()
	acronym: string;

	@Column()
	type: string;

	@OneToMany(() => Position, (position) => position.ship)
	positions: Position[];

	@CreateDateColumn()
	createdAt: Date;
}

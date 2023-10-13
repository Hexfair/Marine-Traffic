import { Position } from 'src/position/entities/position.entity';
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

	@Column()
	mmsi: number;

	@Column()
	shipName: string;

	@Column()
	navalBase: string;

	@Column()
	abbr: string;

	@OneToMany(() => Position, (position) => position.ship)
	positions: Position[];

	@CreateDateColumn()
	createdAt: Date;
}

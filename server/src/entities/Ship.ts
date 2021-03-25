import {Field, Int, ObjectType} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@ObjectType()
@Entity()
class Ship extends BaseEntity {
    @Field(() => String)
    @PrimaryColumn()
    ship_id!: string;

    @Field(() => String)
    @Column()
    ship_type!: string;

    @Field(() => Int, {nullable: true})
    @Column({type: 'int', nullable: true})
    weight_kg!: number;

    @Field(() => String)
    @Column()
    home_port!: string;

    @Field(() => String)
    @Column()
    ship_name!: string;

    @Field(() => Int, {nullable: true})
    @Column({type: 'int', nullable: true})
    class!: string;

    @Field(() => Int, {nullable: true})
    @Column({type: 'int', nullable: true})
    year_built!: number;
}

export default Ship;
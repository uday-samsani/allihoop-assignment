import {ObjectType, Field, Int} from 'type-graphql';
import {Entity, Column, BaseEntity, PrimaryColumn} from 'typeorm';

@ObjectType()
@Entity()
class Ship extends BaseEntity{
    @Field(() => String)
    @PrimaryColumn()
    ship_id!: string;

    @Field(()=>String)
    @Column()
    ship_type!: string;

    @Field(()=>Int,{nullable:true})
    @Column({type:"int"})
    weight_kg!: number

    @Field(()=>String)
    @Column()
    home_port!:string

    @Field(()=>String)
    @Column()
    ship_name!:string

    @Field(()=>Int)
    @Column({type:"int"})
    class!:string
}

export default Ship;
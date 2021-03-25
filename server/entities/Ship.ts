import {ObjectType, Field, Int} from 'type-graphql';

@ObjectType()
class Ship {
    @Field(() => String)
    ship_id!: string;

    @Field(()=>String)
    ship_type!: string;

    @Field(()=>Int,{nullable:true})
    weight_kg!: number

    @Field(()=>String)
    home_port!:string

    @Field(()=>String)
    ship_name!:string

    @Field(()=>String)
    class!:string
}

export default Ship;
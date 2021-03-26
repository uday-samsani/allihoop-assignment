import {Arg, Field, Float, InputType, Int, Query, Resolver} from 'type-graphql';

import Ship from '../entities/Ship';
import {getConnection} from 'typeorm';

@InputType()
class filterOptions{
    @Field(()=>String,{nullable:true})
    shipType!:string
    @Field(()=>String,{nullable:true})
    homePort!:string
    @Field(()=>String,{nullable:true})
    weight!:string
}

@Resolver(Ship)
class ShipResolvers {
    @Query(() => [Ship])
    async getShips(
        @Arg('filterOptions', () => filterOptions,{nullable:true}) filterOptions: filterOptions,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => Int, {nullable: true}) cursor: number
    ): Promise<Ship[]> {
        const qb = await getConnection()
            .getRepository(Ship)
            .createQueryBuilder('s')
            .orderBy('year_built', 'DESC')
            .take(limit)
        if(filterOptions.shipType && filterOptions.homePort && filterOptions.weight){
            qb.where({
                ship_type: filterOptions.shipType,
                home_port: filterOptions.homePort,
                weight_kg: parseInt(filterOptions.weight)
            })
        }
        if (cursor) {
            qb.where('year_built < :cursor', {cursor});
        }
        return qb.getMany();
    }

    /*
    @Query(() => [Ship])
    async getShipssad(
        @Arg('shipType', () => String) shipType: string,
        @Arg('homePort', () => String) homePort: string,
        @Arg('weight', () => Int) weight: number,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => Int, {nullable: true}) cursor: number
    ): Promise<Ship[]> {
        const qb = await getConnection()
            .getRepository(Ship)
            .createQueryBuilder('s')
            .where({
                ship_type: shipType,
                home_port: homePort,
                weight_kg: weight
            })
            .orderBy('year_built', 'DESC')
            .take(limit);
        if(cursor){
            qb.where('year_built < :cursor', {cursor});
        }
        return qb.getMany();
    }
    */
}

export default ShipResolvers;
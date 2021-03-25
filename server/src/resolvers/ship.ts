import {Arg, Int, Query, Resolver} from 'type-graphql';

import Ship from '../entities/Ship';
import {getConnection} from 'typeorm';

@Resolver(Ship)
class ShipResolvers {
    @Query(() => [Ship])
    async getShips(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => Int, {nullable: true}) cursor: number
    ): Promise<Ship[]> {
        const qb = await getConnection()
            .getRepository(Ship)
            .createQueryBuilder('s')
            .orderBy('year_built', 'DESC')
            .take(limit);
        if (cursor) {
            qb.where('year_built < :cursor', {cursor});
        }
        return qb.getMany();
    }

    @Query(() => [Ship])
    async getShip(
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
}

export default ShipResolvers;
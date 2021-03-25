import {Arg, Int, Query, Resolver} from 'type-graphql';
import axios from 'axios';

import Ship from '../entities/Ship';

@Resolver(Ship)
class ShipResolvers {
    @Query(() => [Ship])
    async getShips(): Promise<Ship[]> {
        let ships: Ship[] = await Ship.find({});
        if (!ships) {
            const result = await axios.get('https://api.spacexdata.com/v3/ships');
            ships = await Ship.save(result.data);
        }
        return ships;
    }

    @Query(() => [Ship])
    async getShip(
        @Arg('shipType', () => String) shipType: string,
        @Arg('homePort', () => String) homePort: string,
        @Arg('weight', () => Int) weight: number,
    ): Promise<Ship[]> {
        const ships: Ship[] = await Ship.find({
            where: {
                ship_type: shipType,
                home_port: homePort,
                weight_kg: weight
            }
        }) || [];
        return ships;
    }
}

export default ShipResolvers;
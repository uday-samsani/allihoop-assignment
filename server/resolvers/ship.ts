import {Query, Resolver} from 'type-graphql';
import axios from 'axios';

import Ship from '../entities/Ship'

@Resolver(Ship)
class ShipResolvers{
    @Query(()=>[Ship])
    async ships():Promise<Ship[]>{
        const ships = await axios.get('https://api.spacexdata.com/v3/ships');
        return ships.data;
    }
}

export default ShipResolvers;
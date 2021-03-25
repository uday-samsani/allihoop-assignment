import schedule from 'node-schedule';
import axios from 'axios';

import Ship from '../entities/Ship';

async function staleShips() {
    try {
        await Ship.delete({});
    } catch (err) {
        console.log(err.message);
    }
}

async function addShips(ships: [Ship]) {
    await Ship.save(ships)
}

const dailyStale = () => {
    schedule.scheduleJob('0 0 * * *', async () => {
        console.log('Scheduler: Staling ...');
        await staleShips();
        const result = await axios.get('https://api.spacexdata.com/v3/ships');
        await addShips(result.data);
        console.log('Scheduler: Staling complete');
    });
};
export default dailyStale;
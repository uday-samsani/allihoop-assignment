import schedule from 'node-schedule';
import axios from 'axios';

import Ship from '../entities/Ship';

const staleShips = async () => {
    try {
        await Ship.delete({});
        const result = await axios.get('https://api.spacexdata.com/v3/ships');
        await Ship.save(result.data.filter((ship: Ship) => ship.year_built !== null));
    } catch (err) {
        console.log(err.message);
    }
};

const dailyStaleSchedule = () => {
    schedule.scheduleJob('0 0 * * *', async () => {
        console.log('Scheduler: Staling ...');
        await staleShips();
        console.log('Scheduler: Staling complete');
    });
};

export {staleShips, dailyStaleSchedule};
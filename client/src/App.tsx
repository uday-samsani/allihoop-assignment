import React, {FC, ReactElement, ReactEventHandler, useState} from 'react';
import './App.css';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client/core';

const getShips = gql`
    query ($limit:Int!, $weight:String, $shipType:String, $homePort:String, $cursor:Int){
        getShips(limit:$limit, filterOptions:{weight:$weight, shipType:$shipType, homePort:$homePort}, cursor:$cursor){
            ship_type
            home_port 
            ship_name
            weight_kg
            class
        }
    }
`;

interface Ship {
    ship_type: string
    home_port: string
    weight_kg: number
    year_built: number
    ship_name: string
    class: number
}

interface filterOptions {
    weight?: string
    shipType?: string
    homePort?: string
}

const App: FC = (): ReactElement => {
    const [filterOptions, setFilterOptions] = useState<filterOptions>({});
    const [searchOptions, setSearchOptions] = useState<filterOptions>({});
    const {loading, data} = useQuery(getShips, {
        variables: {
            limit: 5,
            ...searchOptions
        }
    });
    if (loading) return <h2>Loading</h2>;

    const handleChange: ReactEventHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setFilterOptions({
            ...filterOptions,
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    const handleSearch: ReactEventHandler = () => {
        if (filterOptions.weight && filterOptions.homePort && filterOptions.shipType) {
            setSearchOptions(filterOptions)
        }
    };

    return (
        <div className={'container'}>
            <h3>Ship Type</h3>
            <input type="text" name={'shipType'} onChange={handleChange}/>
            <h4>Home Port</h4>
            <input type="text" name={'homePort'} onChange={handleChange}/>
            <h4>Weight</h4>
            <input type="text" name={'weight'} onChange={handleChange}/>

            <input type={'button'} onClick={handleSearch} value={'submit'}/>
            <table>
                <tr>
                    <th>Ship Type</th>
                    <th>Weight</th>
                    <th>Home port</th>
                    <th>Ship Name</th>
                    <th>class</th>
                    <th></th>
                </tr>
                {data ?
                    data.getShips ?
                        data.getShips.map((ship: Ship) => <tr>
                            <td>{ship.ship_type}</td>
                            <td>{ship.weight_kg}</td>
                            <td>{ship.home_port}</td>
                            <td>{ship.ship_name}</td>
                            <td>{ship.class}</td>
                        </tr>)
                        : null
                    : null}
            </table>
        </div>
    );
};

export default App;

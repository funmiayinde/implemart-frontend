import React, { useState } from 'react';
import axios from '../../../services/axios';
import _ from 'lodash';
import { Input, Form } from 'antd';
import placeholder from 'lodash/fp/placeholder';
import './styles.sass';

type IAutoCompletePlace = {
    onSelect: ((data: any) => any);
    placeHolder?: string;
    className?: any;
    name?: string;
    rules?: any[]
};

const AutoCompletePlace = (props: IAutoCompletePlace) => {

    const { onSelect, rules, name, placeHolder, className } = props;

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    const handleOnClicked = (place: any) => {
        setSearch(place.place_name);
        setResult([]);
        setLoading(false);
        onSelect(place);
    };

    const handleSearchChange = (e: any) => {
        console.log('change:', e.target.value);
        const query = e.target.value;
        if (_.isEmpty(query)) {
            setSearch('');
            setLoading(false);
            return;
        }
        setLoading(true);
        setSearch(query);
        // axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`)
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=sk.eyJ1IjoiZnVubWl0ZSIsImEiOiJja3M2NWlldzIwN20wMzBybnl2dGhjcGprIn0.pxQBNkM6ARTuP4X_ccccLg`)
            .then((resp: any) => {
                console.log('resp:', resp['features']);
                setResult(resp['features']);
                setLoading(false);
            }).catch(err => console.log('map-error:', err));
    };

    return (

        <div className="AutocompletePlace">
            <Input
                className={className ? className : 'form-control'}
                type="text"
                value={search}
                placeholder={placeHolder ? placeHolder : 'Enter your location'}
                onChange={handleSearchChange}
            />
            <ul className="AutocompletePlace-results">
                {!_.isEmpty(search) && result && result.map((place: any) => (
                    <li
                        key={place.id}
                        className="AutocompletePlace-items"
                        onClick={() => handleOnClicked(place)}
                    >
                        {place.place_name}
                    </li>
                ))}
            </ul>
            {loading && <li className="AutocompletePlace-items">Searching...</li>}
        </div>

    );
};

export default AutoCompletePlace;

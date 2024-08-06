// src/App.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Direction5 = () => {
    const [route, setRoute] = useState(null);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await axios.post('https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving', {
                    params: {
                        start: '127.1058342,37.359708',
                        goal: '129.075986,35.179470',
                        option: 'trafast'
                    },
                    headers: {
                        'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NAVER_API_KEY_ID,
                        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_API_KEY
                    }
                });
                setRoute(response.data);
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        fetchRoute();
    }, []);

    return (
        <div>
            <h1>Naver Map API Example</h1>
            {route ? (
                <pre>{JSON.stringify(route, null, 2)}</pre>
            ) : (
                <p>Loading route...</p>
            )}
        </div>
    );
};

export default Direction5;

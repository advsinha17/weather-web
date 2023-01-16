import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';

import WeatherCard from './WeatherCard';
import './App.css';

const App = () => {
    const [places, setPlace] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const [isInList, setIsInList] = useState(false);
    const [isGreen, setIsGreen] = useState([]);

    // Handle click to change card color
    const handleClick = (e) => {
        const placeName = e.target.getAttribute("name");
        setIsGreen((arr) => {
            if ((arr.indexOf(placeName) === -1 && placeName !== null)) {
                return [...arr, placeName];

            }
            else {
                return arr.filter(place => placeName !== place);
            }
        })

    }

    // Remove card when cross is clicked 
    const handleRemoveItem = (e) => {
        const name = e.target.getAttribute("id");
        setPlace(places.filter((place) => {
            return place.data.id !== parseInt(name);
        }));
    }

    // Fetches weather data from OpenWeatherMap API
    async function fetchWeatherData(searchTerm) {
        const weatherConfig = {
            params: {
                q: searchTerm,
                appid: "fceb783f2ec84f7ece8047cab155936e"
            }
        };
        // Handle response from API
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, weatherConfig);
            let inList = false;
            setPlace((arr) => {
                // Check if given loaction is already displayed
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (response.data.name === arr[i].data.name) {
                            inList = true;
                            setIsInList(true);
                            return [...arr];
                        }
                    }
                    if (!inList) {
                        setIsInList(false);
                        return [...arr, response];
                    }
                }
                else {
                    return [...arr, response];
                }
            });
            setError(false);

        }
        catch {
            setError(current => !current);
        }
    }

    // Load data for 5 location on page load
    useEffect(() => {
        fetchWeatherData('Mumbai');
        fetchWeatherData('Bangalore');
        fetchWeatherData('Delhi');
        fetchWeatherData('New York');
        fetchWeatherData('London');
    }, [])

    return (
        <>
            <div className="app">
                <h1 className="title pt-0 is-block">World Weather</h1>
            </div>
            <div className="field pt-4">
                <form id="searchForm"
                    className="is-flex is-justify-content-space-evenly"
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchWeatherData(search);
                        setSearch('');
                    }}>
                    <input className={error ? ("input is-rounded mr-2 error") : (isInList ? "input is-rounded mr-2 in-list" : "input is-rounded mr-2 valid")} type="text"
                        placeholder={error ? "Weather Data Not Found" : (isInList ? "Given location data already displayed" : "Search")} name="query" value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <button className="button is-rounded">
                        <span className="icon is-small">
                            <i className="fa fa-search"></i>
                        </span>
                    </button>
                </form>
            </div>

            {/* Display data on card */}
            {
                places.length > 0
                    ? (<div className="container">
                        {places.map((place) => (<WeatherCard weather={place} handleRemoveItem={handleRemoveItem} handleClick={handleClick} isGreen={isGreen} setIsGreen={setIsGreen} />))
                        }
                    </div>) : (
                        <div className="container">
                            <h2>No results</h2>
                        </div>
                    )
            }
        </>
    )
}
export default App;
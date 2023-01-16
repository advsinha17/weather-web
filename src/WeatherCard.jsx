import React from 'react';
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';

const WeatherCard = ({ weather, handleRemoveItem, handleClick, isGreen, setIsGreen }) => {
    // Display weather data on card
    return (
        <div className="weather-card" style={{
            backgroundColor: (isGreen.indexOf(weather.data.name) !== -1) ? '#198754' : '',
        }}
            onClick={handleClick} name={weather.data.name}
        >

            <>
                <div className="is-flex is-justify-content-center" name={weather.data.name} style={{ position: 'relative' }}>
                    <button className="button is-rounded" id={weather.data.id} onClick={handleRemoveItem} style={{
                        backgroundColor: 'rgba(16, 14, 14, 0)',
                        border: 'none',
                        position: 'absolute',
                        top: '0',
                        left: '0'
                    }}>
                        <span className="icon is-small" id={weather.data.id} onClick={() => {
                            setIsGreen(isGreen.filter((location) => {
                                return location !== weather.data.name
                            }));
                        }}>
                            <i className="fa fa-close" id={weather.data.id}></i>
                        </span>
                    </button>
                    <div id="place" name={weather.data.name} className="pt-5 pb-2 is-flex">
                        <p name={weather.data.name}>{weather.data.name + ', ' + weather.data.sys.country}</p>
                    </div>
                </div>

                <div id="temperature" name={weather.data.name} className="pt-2">
                    <p name={weather.data.name}>{Math.round(weather.data.main.temp - 273.15) + '°C'}</p>
                </div>
            </>
            <div name={weather.data.name} className="is-flex is-justify-content-center is-align-items-center pt-5">
                <>
                    <img src={"https://openweathermap.org/img/wn/" + (weather.data.weather[0].icon).replace('n', 'd') + ".png"} name={weather.data.name} id="icon" alt="Current Condition Icon" />
                    <p id="condition" name={weather.data.name}>{weather.data.weather[0].main}</p></>
            </div>
            <div name={weather.data.name} className="is-flex is-justify-content-center is-align-items-center">
                <p name={weather.data.name} id="extreme-high" className="pr-2 ">{"H:" + Math.round(weather.data.main.temp_max - 273.15) + "°C"}</p>
                <p name={weather.data.name} id="extreme-low" className="pl-2">{"L:" + Math.round(weather.data.main.temp_min - 273.15) + "°C"}</p>

            </div>
        </div>


    )
}

export default WeatherCard;
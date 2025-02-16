import React, { useEffect, useState } from 'react';
import './Weather.css';

function Weather() {
    const [data, setData] = useState();
    const [search, setSearch] = useState("Pune");
    const [city, setCity] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=39e6c5c1de59ad645db3e661147127e8`;
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
        };
        fetchApi();
    }, [search]);

    return (
        <div className="weather-container">
            {/* Search Bar */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter city name"
                    onChange={(event) => setCity(event.target.value)}
                />
                <button onClick={() => setSearch(city)}>Search</button>
            </div>

            {/* Weather Box */}
            {data && (
                <div className="weather-box">
                    <div className="upper-section">
                        <div className="top-left">
                            <h2 className="city">{data.name}</h2>
                            <p className="date">{new Date().toDateString()}</p>
                            <div className="icon-container">
                                <img
                                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                    alt={data.weather[0].description}
                                    className="weather-icon"
                                />
                                <p className="weather-condition">{data.weather[0].description}</p>
                            </div>
                        </div>
                        <h2 className="temperature">{data.main.temp}°C</h2>
                    </div>

                    <div className="lower-section">
                        <div className="info-box">
                            <p>Humidity</p>
                            <h3>{data.main.humidity}%</h3>
                        </div>
                        <div className="info-box">
                            <p>Wind</p>
                            <h3>{data.wind.speed} m/s</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;

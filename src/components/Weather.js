import React, { useEffect, useState } from 'react';

function Weather() {
    const [data, setData] = useState(null);
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
        data && (
            <div>
                <input 
                    type='text' 
                    value={city} 
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Enter city name"
                />
                <button onClick={() => setSearch(city)}>Search</button>
                {data.main && (
                    <div>
                        <h2>City: {data.name}, {data.sys?.country}</h2>
                        <h3>Date: {new Date().toLocaleDateString()}</h3>
                        <h3>Temperature: {data.main.temp}°C</h3>
                        <h3>Condition: {data.weather[0].description}</h3>
                        <h3>Humidity: {data.main.humidity}%</h3>
                        <h3>Wind Speed: {data.wind.speed} m/s</h3>
                    </div>
                )}
            </div>
        )
    );
}

export default Weather;

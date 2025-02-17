import React, { useEffect, useState } from 'react';

function Weather() {
    const [data, setData] = useState(); //Response container
    const [search, setSearch] = useState("Pune"); //Complete city name to search
    const [city, setCity] = useState(""); //Capturing input from search bar
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchApi = async () => {
            if (search && !error) { // Validity check before API Call  
                try {
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=39e6c5c1de59ad645db3e661147127e8`;
                    const response = await fetch(url);
                    const result = await response.json();
                    
                    if (result.cod!=200) {
                        throw new Error("Invalid city name");
                    }
                    setData(result);
                    setError(null); 
                } catch (err) {
                    setData(null);
                    setError("City not found. Please enter a valid city.");
                }
            }
        };
        fetchApi();
    }, [search]);

    const clearSearchField = () => {
        setCity(""); 
        setError(null); 
    };

    const handleSearch = () => {
        // Validate the search term
        if (!city.trim()) { /*Check if input is not blank or doesn't have just whitespaces*/
            setError("Please enter a city name.");
            return;
        } 
        const isValidCity = /^[a-zA-Z\s]+$/.test(city); // Regular expression to allow only letters and spaces
        if (!isValidCity) {
            setError("City name can only contain letters and spaces.");
            return;
        }

        setSearch(city);
        setError(null); 
    };

    //Search on Enter key press as well
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6'>
            <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg text-center'>
                <h1 className='text-4xl font-semibold text-gray-900 mb-8 font-sans'>Weather Finder</h1>

                {/* Search bar */}
                <div className='relative mb-6'>
                    <input 
                        type='text' 
                        placeholder='Enter city name' 
                        className='w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        onKeyDown={handleKeyPress} 
                    />
                    {city && (
                        <span 
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer'
                            onClick={clearSearchField}
                        >
                            X
                        </span>
                    )}
                </div>

                <div className='flex justify-center space-x-4 mb-6'>
                    <button 
                        className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200' 
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>


                {/* Display error message if there's any */}
                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}


                {/* Weather Info */}
                {data && (
                    <div className='mt-6'>
                        <div className='flex items-center justify-center'>
                            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='Weather icon' className='w-32 h-32' />
                        </div>
                        <p className='text-xl text-gray-800 mt-4'>{data.weather[0].description}</p>
                        <h2 className='text-2xl font-semibold text-gray-900 mt-2'>{data.name}</h2>
                        <p className='text-md text-gray-600 mt-1'>{new Date().toDateString()}</p>
                        <h3 className='text-lg font-mono mt-2'>Temperature: {data.main.temp}°C</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;

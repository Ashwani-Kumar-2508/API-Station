import { useState, useEffect } from 'react';
import { fetchWeather } from '../services/api';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDefault = async () => {
            setLoading(true);
            try {
                const data = await fetchWeather('Phagwara');
                setWeatherData(data);
            } catch (err) {
                console.error("Default weather load failed");
            } finally {
                setLoading(false);
            }
        };
        loadDefault();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city) return;

        setLoading(true);
        setError('');

        try {
            const data = await fetchWeather(city);
            setWeatherData(data);
        } catch (err) {
            setError('Could not find weather data for that city. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Weather Forecast</h1>
                <p>Enter a city name to get the current weather conditions.</p>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter city (e.g. London)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {loading && <div className="status-msg">Loading weather data...</div>}
            {error && <div className="status-msg" style={{ color: 'red' }}>{error}</div>}

            {weatherData && !loading && (
                <div className="weather-card">
                    <div style={{ marginBottom: '15px' }}>
                        <h2 style={{ fontSize: '28px' }}>{weatherData.name}, {weatherData.country}</h2>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#3498db' }}>{Math.round(weatherData.temp)}°C</div>
                        <div style={{ fontSize: '20px', textTransform: 'capitalize' }}>{weatherData.condition}</div>
                    </div>

                    <div className="weather-info-grid">
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Wind Speed</div>
                            <div>{weatherData.windspeed} km/h</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Humidity</div>
                            <div>{weatherData.humidity}%</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;

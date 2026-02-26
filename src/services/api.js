import axios from 'axios';

// Weather Service (using Open-Meteo)
export const fetchWeather = async (city) => {
    try {
        // 1. Get coordinates for city
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        if (!geoResponse.data.results) throw new Error('City not found');

        const { latitude, longitude, name, country } = geoResponse.data.results[0];

        // 2. Get weather for coordinates
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);

        return {
            name,
            country,
            temp: weatherResponse.data.current_weather.temperature,
            windspeed: weatherResponse.data.current_weather.windspeed,
            condition: weatherResponse.data.current_weather.weathercode
        };
    } catch (error) {
        console.error("Weather API error", error);
        throw error;
    }
};

// Meals Service (TheMealDB)
export const fetchMeals = async (query) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    return response.data.meals;
};

// Movies Service (TVMaze)
export const fetchMovies = async (query) => {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    return response.data;
};

// Songs Service (iTunes)
export const fetchSongs = async (query) => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${query}&entity=song&limit=12`);
    return response.data.results;
};

// Books Service (Google Books)
export const fetchBooks = async (query) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
    return response.data.items;
};

// News Service (Hacker News Algolia)
export const fetchNews = async (query) => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=12`);
    return response.data.hits;
};

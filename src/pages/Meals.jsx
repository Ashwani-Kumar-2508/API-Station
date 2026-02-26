import { useState, useEffect } from 'react';
import { fetchMeals } from '../services/api';

const Meals = () => {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDefault = async () => {
            setLoading(true);
            try {
                const data = await fetchMeals('Pasta');
                setMeals(data.slice(0, 6));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadDefault();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setError('');

        try {
            const data = await fetchMeals(query);
            if (!data) {
                setError('No recipes found. Try searching for something else.');
                setMeals([]);
            } else {
                setMeals(data);
            }
        } catch (err) {
            setError('Could not fetch the meals.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Meal & Recipe Finder</h1>
                <p>Search for delicious recipes from around the world.</p>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search meal (e.g. Pasta, Burger)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {query ? `Results for: ${query}` : 'Suggested Recipes'}
            </h2>

            {loading && <div className="status-msg">Finding recipes...</div>}
            {error && <div className="status-msg" style={{ color: 'red' }}>{error}</div>}

            <div className="grid">
                {meals.map(meal => (
                    <div key={meal.idMeal} className="card">
                        <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" style={{ width: '100%', borderRadius: '5px' }} />
                        <div style={{ marginTop: '15px' }}>
                            <div style={{ fontSize: '12px', color: '#666' }}>{meal.strCategory.toUpperCase()}</div>
                            <h3 className="card-title" style={{ fontSize: '18px', margin: '5px 0' }}>{meal.strMeal}</h3>
                            <a href={`https://www.themealdb.com/meal/${meal.idMeal}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'block', marginTop: '10px' }}>View Recipe</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meals;

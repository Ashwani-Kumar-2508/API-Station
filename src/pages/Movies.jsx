import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';

const Movies = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDefault = async () => {
            setLoading(true);
            try {
                const data = await fetchMovies('Action');
                setMovies(data.slice(0, 8));
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
            const data = await fetchMovies(query);
            if (!data || data.length === 0) {
                setError('No movies found for this title.');
                setMovies([]);
            } else {
                setMovies(data);
            }
        } catch (err) {
            setError('Could not connect to the movie database.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Movie Search</h1>
                <p>Find details about your favorite movies and TV shows.</p>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search movies (e.g. Inception)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {query ? `Results for: ${query}` : 'Popular Movies'}
            </h2>

            {loading && <div className="status-msg">Searching...</div>}
            {error && <div className="status-msg" style={{ color: 'red' }}>{error}</div>}

            <div className="grid">
                {movies.map(item => (
                    <div key={item.show.id} className="card">
                        <img
                            src={item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295?text=No+Poster'}
                            alt={item.show.name}
                            className="card-img"
                            style={{ width: '100%', borderRadius: '5px' }}
                        />
                        <div style={{ marginTop: '15px' }}>
                            <div style={{ fontSize: '12px', color: '#666' }}>{item.show.type.toUpperCase()} • {item.show.rating?.average || 'N/A'} ★</div>
                            <h3 className="card-title" style={{ fontSize: '18px', margin: '5px 0' }}>{item.show.name}</h3>
                            <a href={item.show.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'block', marginTop: '10px' }}>View Details</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;

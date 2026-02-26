import { useState, useEffect } from 'react';
import { fetchSongs } from '../services/api';

const Songs = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadExamples = async () => {
            setLoading(true);
            try {
                const data = await fetchSongs('2024 hits');
                setSongs(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadExamples();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setError('');

        try {
            const data = await fetchSongs(query);
            if (!data || data.length === 0) {
                setError('No songs found.');
                setSongs([]);
            } else {
                setSongs(data);
            }
        } catch (err) {
            setError('An error occurred while searching for songs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Music Search</h1>
                <p>Find your favorite songs and artists using the iTunes API.</p>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search song or artist (e.g. Coldplay)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {query ? `Results for: ${query}` : 'Trending Music'}
            </h2>

            {loading && <div className="status-msg">Searching for tracks...</div>}
            {error && <div className="status-msg" style={{ color: 'red' }}>{error}</div>}

            <div className="grid">
                {songs.map(song => (
                    <div key={song.trackId} className="card">
                        <img
                            src={song.artworkUrl100.replace('100x100', '400x400')}
                            alt={song.trackName}
                            className="card-img"
                            style={{ width: '100%', borderRadius: '5px' }}
                        />
                        <div style={{ marginTop: '15px' }}>
                            <h3 className="card-title" style={{ fontSize: '18px', margin: '5px 0' }}>{song.trackName}</h3>
                            <p style={{ color: '#666', fontSize: '14px' }}>{song.artistName}</p>
                            <audio controls style={{ width: '100%', marginTop: '15px', height: '35px' }}>
                                <source src={song.previewUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Songs;

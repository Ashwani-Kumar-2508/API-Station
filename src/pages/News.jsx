import { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';

const News = () => {
    const [query, setQuery] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadExamples = async () => {
            setLoading(true);
            try {
                const data = await fetchNews('technology');
                setNews(data);
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
            const data = await fetchNews(query);
            if (!data || data.length === 0) {
                setError('No news articles found.');
                setNews([]);
            } else {
                setNews(data);
            }
        } catch (err) {
            setError('An error occurred while fetching news.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>News Explorer</h1>
                <p>Stay updated with the latest headlines from around the world.</p>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search news (e.g. Technology, Space)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {query ? `Results for: ${query}` : 'Tech News Headlines'}
            </h2>

            {loading && <div className="status-msg">Fetching news...</div>}
            {error && <div className="status-msg" style={{ color: 'red' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto', paddingBottom: '50px' }}>
                {news.map(item => (
                    <div key={item.objectID} className="card" style={{ textAlign: 'left', borderLeft: '4px solid #3498db' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', color: '#666' }}>
                            <span><strong>Author:</strong> {item.author}</span>
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="card-title" style={{ fontSize: '20px', margin: '10px 0' }}>{item.title}</h3>
                        <p style={{ color: '#888', fontSize: '14px', marginBottom: '15px' }}>
                            Source: {item.url ? new URL(item.url).hostname : 'N/A'}
                        </p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: 'fit-content' }}>Read Full Article</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;

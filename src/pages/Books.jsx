import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';

const Books = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadExamples = async () => {
            setLoading(true);
            try {
                const data = await fetchBooks('Science Fiction');
                setBooks(data);
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
            const data = await fetchBooks(query);
            if (!data || data.length === 0) {
                setError('No books found for this title.');
                setBooks([]);
            } else {
                setBooks(data);
            }
        } catch (err) {
            setError('An error occurred while fetching books.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Book Finder</h1>
                <p>Search for books and authors from the Google Books library.</p>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search books (e.g. Harry Potter)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {query ? `Results for: ${query}` : 'Recommended Books'}
            </h2>

            {loading && <div className="status-msg">Searching for books...</div>}
            {error && <div className="status-msg" style={{ color: 'red' }}>{error}</div>}

            <div className="grid">
                {books.map(book => (
                    <div key={book.id} className="card">
                        <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                            <img
                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=No+Cover'}
                                alt={book.volumeInfo.title}
                                style={{ height: '180px', objectFit: 'contain', width: '100%' }}
                            />
                        </div>
                        <h3 className="card-title" style={{ fontSize: '18px', margin: '5px 0' }}>{book.volumeInfo.title}</h3>
                        <p style={{ color: '#666', fontSize: '13px', marginBottom: '15px' }}>
                            {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                        </p>
                        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'block' }}>Read More</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;

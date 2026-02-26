import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <Link to="/" className="logo" style={{ fontSize: '20px' }}>API Station</Link>
                        <p style={{ color: '#666', fontSize: '14px' }}>Simple API Explorer for Everyone.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/" style={{ color: '#333', textDecoration: 'none' }}>Home</Link>
                        <Link to="/about" style={{ color: '#333', textDecoration: 'none' }}>About</Link>
                        <Link to="/contact" style={{ color: '#333', textDecoration: 'none' }}>Contact</Link>
                    </div>

                    <p style={{ color: '#999', fontSize: '12px' }}>&copy; {new Date().getFullYear()} API Station. Built for learning.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

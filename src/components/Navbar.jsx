import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={scrolled ? "navbar scrolled" : "navbar"}>
            <div className="container nav-content">
                <Link to="/" className="logo">API Station</Link>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li className="dropdown">
                        <button className="dropbtn">
                            APIs <i className="bi bi-chevron-down" style={{ fontSize: '0.7rem', marginLeft: '5px' }}></i>
                        </button>
                        <div className="dropdown-content">
                            <Link to="/weather"> Weather</Link>
                            <Link to="/meals"> Meals</Link>
                            <Link to="/movies"> Movies</Link>
                            <Link to="/songs"> Songs</Link>
                            <Link to="/books"> Books</Link>
                            <Link to="/news"> News</Link>
                        </div>
                    </li>
                    <li>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

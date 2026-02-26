import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <section className="hero">
                <h1>Welcome to API Station</h1>
                <p>
                    A simple place to explore different APIs like Weather, Movies, and News.
                    Perfect for students and developers learning how to integrate data!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <Link to="/weather" className="btn-primary">Get Started</Link>
                    <Link to="/about" className="btn">Learn More</Link>
                </div>
            </section>

            <section style={{ padding: '40px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2>Our Services</h2>
                    <p>Check out the cool things you can do here.</p>
                </div>
                <div className="grid">
                    <ServiceCard title="Weather" icon="🌤" link="/weather" desc="Check the weather in any city around the world." />
                    <ServiceCard title="Meals" icon="🍽" link="/meals" desc="Find delicious recipes and meal ideas." />
                    <ServiceCard title="Movies" icon="🎬" link="/movies" desc="Search for your favorite movies and details." />
                    <ServiceCard title="Songs" icon="🎵" link="/songs" desc="Look up songs and music information." />
                    <ServiceCard title="Books" icon="📚" link="/books" desc="Browse through a library of digital books." />
                    <ServiceCard title="News" icon="📰" link="/news" desc="Stay updated with the latest news headlines." />
                </div>
            </section>

            <section style={{ padding: '40px', background: '#eef2f3', borderRadius: '10px', textAlign: 'center', marginBottom: '50px' }}>
                <h2>Ready to explore?</h2>
                <p style={{ marginBottom: '20px' }}>No sign up needed. Just pick an API from the menu and start searching!</p>
                <Link to="/weather" className="btn-primary">Browse APIs</Link>
            </section>
        </div>
    );
};

const ServiceCard = ({ title, icon, link, desc }) => (
    <Link to={link} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ fontSize: '50px', marginBottom: '10px' }}>{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{desc}</p>
        <div style={{ color: '#3498db', fontWeight: 'bold' }}>View Now →</div>
    </Link>
);

export default Home;

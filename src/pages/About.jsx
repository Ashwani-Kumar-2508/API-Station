const About = () => {
    return (
        <div className="container">
            <div className="page-header">
                <h1>About API Station</h1>
                <p>Learn more about our mission and what we do.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
                <div>
                    <h2>Our Mission</h2>
                    <p style={{ marginBottom: '15px' }}>
                        API Station was created to help students and developers explore the world of public APIs.
                        We believe that learning to work with data shouldn't be complicated.
                    </p>
                    <p>
                        Our website brings together several useful APIs in one place, so you can easily test how they work
                        and see the kind of information they provide.
                    </p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <h3>Our Tech Stack</h3>
                    <ul style={{ listStyle: 'none', marginTop: '15px' }}>
                        <li style={{ marginBottom: '10px' }}>✅ React for UI</li>
                        <li style={{ marginBottom: '10px' }}>✅ Basic CSS for Styling</li>
                        <li style={{ marginBottom: '10px' }}>✅ Public APIs for Data</li>
                        <li style={{ marginBottom: '10px' }}>✅ React Router for Navigation</li>
                    </ul>
                </div>
            </div>

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <h2>Why Use API Station?</h2>
                <div className="grid">
                    <div className="card">
                        <h3>Easy to Use</h3>
                        <p>Simple interface designed for everyone.</p>
                    </div>
                    <div className="card">
                        <h3>No Keys Needed</h3>
                        <p>All APIs used here are free and open.</p>
                    </div>
                    <div className="card">
                        <h3>Fast Results</h3>
                        <p>Get data instantly with a click.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

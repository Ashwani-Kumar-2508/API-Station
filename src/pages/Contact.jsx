import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1>Contact Us</h1>
                <p>Have a question or feedback? Send us a message!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                    <h2>Get in Touch</h2>
                    <p style={{ marginBottom: '20px' }}>
                        We would love to hear from you. Whether you have a suggestion for a new API or just want to say hi,
                        feel free to reach out.
                    </p>
                    <div style={{ marginTop: '20px' }}>
                        <p><strong>Email:</strong> contact@apistation.com</p>
                        <p><strong>Support:</strong> support@apistation.com</p>
                        <p><strong>Location:</strong> Phagwara, Punjab</p>
                    </div>
                </div>

                <div>
                    {submitted ? (
                        <div style={{ backgroundColor: '#e2f3f5', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
                            <h3>Thanks for your message!</h3>
                            <p>We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text" required placeholder="Enter your name"
                                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email" required placeholder="Enter your email"
                                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    rows="5" required placeholder="Write your message here..."
                                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="search-btn" style={{ width: '100%' }}>
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;

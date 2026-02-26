import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Weather from './pages/Weather';
import Meals from './pages/Meals';
import Movies from './pages/Movies';
import Songs from './pages/Songs';
import Books from './pages/Books';
import News from './pages/News';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/books" element={<Books />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Facilities from './components/Facilities';
import Notices from './components/Notices';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Facilities />
        <Notices />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

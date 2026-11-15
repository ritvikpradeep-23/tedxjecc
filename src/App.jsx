import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Speakers from "./components/Speakers";
import Tickets from "./components/Tickets";
import Team from "./components/Team";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-tedx-black min-h-screen animate-[page-fade-in_0.6s_ease]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Speakers />
        <Tickets />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;

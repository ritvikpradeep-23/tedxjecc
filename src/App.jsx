import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Speakers from "./components/Speakers";
import Tickets from "./components/Tickets";
import Team from "./components/Team";
import JoinTeam from "./components/JoinTeam";
import About from "./components/About";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";

function App() {
  return (
    <div className="bg-tedx-black min-h-screen animate-[page-fade-in_0.6s_ease]">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Speakers />
        <SectionDivider />
        <Tickets />
        <SectionDivider />
        <Team />
        <SectionDivider />
        <JoinTeam />
      </main>
      <Footer />
    </div>
  );
}

export default App;

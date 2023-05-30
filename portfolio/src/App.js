import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import Experiences from "./Components/Experiences";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Experiences />
      <Skills />
      <Work />
      <Contact />
    </div>
  );
}

export default App;

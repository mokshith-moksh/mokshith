import { Dock, Navbar, Welcome } from "#components/index";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import TerminalWindow from "#windows/Terminal";
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <TerminalWindow name="mokshith" />
    </main>
  );
};

export default App;

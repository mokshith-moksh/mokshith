import { Dock, Navbar, Welcome } from "#components/index";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import TerminalWindow from "#windows/Terminal";
import SafariWindow from "#windows/Safari";
import ResumeWindow from "#windows/Resume";
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <TerminalWindow name="mokshith" />
      <SafariWindow name="mokshith" />
      <ResumeWindow name="mokshith" />
    </main>
  );
};

export default App;

import { Dock, Navbar, Welcome } from "#components/index";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import {
  Terminal,
  Finder,
  Resume,
  SafariWindow,
  ContactWindow,
} from "#windows/index";
import TextViewerWindow from "#windows/TextViewer";
import ImageViewerWindow from "#windows/ImageViewer";
import Desktop from "#windows/Desktop";
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal name="mokshith" />
      <SafariWindow name="mokshith" />
      <Resume name="mokshith" />
      <Finder />
      <TextViewerWindow />
      <ImageViewerWindow />
      <Desktop />
      <ContactWindow />
    </main>
  );
};

export default App;

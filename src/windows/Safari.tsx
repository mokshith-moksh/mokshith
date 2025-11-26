import WindowWrapper from "#hoc/windowWrapper";
import {
  Globe,
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
} from "lucide-react";
import { useState, useRef } from "react";
import SafariHome from "./SafariHome";

const Safari = ({ name }: { name: string }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isHome, setIsHome] = useState(true);
  const [history, setHistory] = useState([searchQuery]);
  const [index, setIndex] = useState(0);

  const loadURL = (url: string) => {
    setIsHome(false);
    const formatted = url.startsWith("http") ? url : `https://${url}`;
    setSearchQuery(formatted);
    iframeRef.current?.setAttribute("src", formatted);
    const updated = [...history.slice(0, index + 1), formatted];
    setHistory(updated);
    setIndex(updated.length - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") loadURL(searchQuery);
  };

  const goBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      iframeRef.current?.setAttribute("src", history[index - 1]);
    } else {
      setSearchQuery("home");
      iframeRef.current?.setAttribute("src", "home");
    }
  };

  const goForward = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      iframeRef.current?.setAttribute("src", history[index + 1]);
    }
  };

  const reload = () => {
    iframeRef.current?.setAttribute("src", history[index]);
  };

  return (
    <div className="w-full h-full bg-white text-[#1c1c1e] overflow-hidden rounded-bl-lg rounded-br-lg border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
      <div className="px-3 py-2 bg-[#f5f5f7] border-b border-black/10 flex items-center gap-3 text-[12px]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={goBack}
            className="h-6 w-6 rounded-full bg-[#e5e5e7] hover:bg-[#d7d7db] transition flex items-center justify-center"
          >
            <ArrowLeft className="w-3 h-3 text-[#6e6e73]" />
          </button>
          <button
            onClick={goForward}
            className="h-6 w-6 rounded-full bg-[#e5e5e7] hover:bg-[#d7d7db] transition flex items-center justify-center"
          >
            <ArrowRight className="w-3 h-3 text-[#6e6e73]" />
          </button>
          <button
            onClick={reload}
            className="h-6 w-6 rounded-full bg-[#e5e5e7] hover:bg-[#d7d7db] transition flex items-center justify-center"
          >
            <RotateCcw className="w-3 h-3 text-[#6e6e73]" />
          </button>
          <button
            onClick={() => setIsHome(true)}
            className="h-6 w-6 rounded-full bg-[#e5e5e7] hover:bg-[#d7d7db] transition flex items-center justify-center"
          >
            <Home className="w-3 h-3 text-[#6e6e73]" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full w-full max-w-[480px] shadow-inner bg-white border border-black/10">
            <Lock className="w-3.5 h-3.5 text-[#34C759]" />

            <input
              className="text-[11px] text-[#3a3a3c] truncate w-full bg-transparent focus:outline-none"
              type="text"
              placeholder="Search or enter website name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#6e6e73]">
          <Globe className="w-4 h-4" />
          <span className="text-[11px] hidden sm:inline">{name}@web</span>
        </div>
      </div>
      {isHome ? (
        <SafariHome loadURL={loadURL} />
      ) : (
        <iframe
          src={searchQuery}
          className="w-full h-[calc(100%-44px)] bg-white"
        />
      )}
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;

import { Star, FolderKanban, Globe, ExternalLink } from "lucide-react";

const SafariHome = ({ loadURL }: { loadURL: (url: string) => void }) => {
  const favorites = [
    { title: "Shipfilez", url: "https://shipfilez.app", icon: Globe },
    { title: "Portfolio", url: "https://mokshith.dev", icon: Star },
    { title: "GitHub", url: "https://github.com", icon: FolderKanban },
  ];

  const projects = [
    {
      title: "Shipfilez",
      subtitle: "P2P File Sharing App",
      url: "shipfilez.app",
    },
    {
      title: "ColorCord",
      subtitle: "Discord Colored Text Generator",
      url: "colorcord.vercel.app",
    },
    {
      title: "Shipfilez Reaches an Exciting Milestone",
      subtitle: "newsletter",
      url: "heapheaphurray.com/p/heap-heap-hurray-ed-347",
    },
  ];

  const openLink = (url: string) => {
    loadURL(url);
  };

  return (
    <div
      className="w-full h-full bg-[#fafafa] text-[#1c1c1e] overflow-auto px-6 py-6"
      style={{
        backgroundImage: 'url("/images/safariWall.jpeg")',
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-2xl font-bold text-white">Start Page</h1>

        {/* Favorites */}
        <section>
          <h2 className="text-[12px] uppercase tracking-wider text-[#8e8e93] mb-3">
            Favorites
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
            {favorites.map(({ title, url, icon: Icon }) => (
              <button
                key={title}
                onClick={() => openLink(url)}
                className="flex flex-col items-center gap-2 transition hover:opacity-80"
              >
                <div className="h-12 w-12 rounded-xl bg-white shadow-sm border border-black/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#4d4d4f]" />
                </div>
                <span className="text-[12px] text-[#3a3a3c]">{title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-[12px] uppercase tracking-wider text-[#8e8e93] mb-3">
            Projects
          </h2>

          <div className="space-y-3">
            {projects.map(({ title, subtitle, url }) => (
              <div
                key={title}
                onClick={() => openLink(url)}
                className="flex items-center justify-between bg-white shadow-sm border border-black/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-[#f1f1f1] transition"
              >
                <div>
                  <h3 className="font-medium text-[#1c1c1e]">{title}</h3>
                  <p className="text-[12px] text-[#6e6e73]">{subtitle}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8e8e93]" />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-[11px] text-[#8e8e93] text-center pt-4">
          Built with ❤️ by Mokshith
        </footer>
      </div>
    </div>
  );
};

export default SafariHome;

import WindowControl from "#components/WindowControl";
import WindowWrapper from "#hoc/windowWrapper";
import { Globe, Lock, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

const Safari = ({ name }: { name: string }) => {
  return (
    <div className="bg-[#050608] resize w-full h-full text-[#E5E7EB] rounded-xl border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)] overflow-hidden">
      <WindowControl name={name} windowName="safari" />

      <div className="px-3 py-2 bg-[#0b0d10] border-b border-white/10 flex items-center gap-3 text-[12px]">
        <div className="flex items-center gap-1.5">
          <button className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center">
            <ArrowLeft className="w-3 h-3 text-white/60" />
          </button>
          <button className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-white/60" />
          </button>
          <button className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center">
            <RotateCcw className="w-3 h-3 text-white/60" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-full max-w-[460px]">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-white/70 truncate">
              https://mokshith.dev
            </span>
          </div>
        </div>

        {/* Right side - profile / globe */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-white/60" />
          <span className="text-[11px] text-white/60 hidden sm:inline">
            {name}@portfolio
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-gradient-to-b from-[#050608] via-[#050608] to-[#020308] h-[calc(100%-44px)] px-6 py-5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              Preview
            </p>
            <h1 className="text-xl font-semibold text-white/90">
              Mokshith’s Portfolio
            </h1>
            <p className="text-sm text-white/55">
              A snapshot of the technologies, projects, and ideas that power
              this developer workspace.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 space-y-2">
            <p>
              This Safari window is a preview surface for your site — you can
              use it to showcase:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li>Hero section or landing page mock</li>
              <li>Project thumbnails or case studies</li>
              <li>Live preview of sections in your portfolio</li>
            </ul>
          </div>

          <div className="text-xs text-white/45">
            Tip: replace this content with a real preview of your main page or
            sections from your portfolio.
          </div>
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;

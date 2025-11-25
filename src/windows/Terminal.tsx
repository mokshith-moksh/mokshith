import { techStack } from "#constants/index";
import WindowWrapper from "#hoc/windowWrapper";
import { Check } from "lucide-react";

const Terminal = ({ name }: { name: string }) => {
  return (
    <div className="bg-[#050608] w-full h-full text-[#E5E7EB] rounded-bl-lg rounded-br-lg border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)] overflow-hidden font-mono ">
      <div className="px-[10%] w-full py-3 bg-gradient-to-b from-[#050608] via-[#050608] to-[#050608]/95">
        <div className="mb-3">
          <p className="text-[13px] text-[#A5B4FC]">
            <span className="text-[#4ADE80] font-semibold">@{name}</span>
            <span className="text-[#64748B]"> %</span>{" "}
            <span className="text-[#E5E7EB]">show tech-stack</span>
          </p>
        </div>

        <div className="flex items-center gap-[10%] font-medium border-b border-white/10 pb-2 mb-3 text-[12px] uppercase tracking-[0.12em] text-white/50">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="space-y-[2%]  pr-1 overflow-y-auto">
          {techStack.map(({ category, items }) => (
            <li
              key={category}
              className="flex items-start gap-4 text-[13px] text-white/85"
            >
              <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-[#22C55E]" />
              <h3 className="w-32 font-medium text-[#E5E7EB]">{category}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="px-2 py-[2px] rounded-md bg-white/5 border border-white/10 text-[12px] text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;

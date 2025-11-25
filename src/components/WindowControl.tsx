import { useDispatch } from "react-redux";
import { closeWindow } from "#store/windows/windowSlice";
import { Window } from "#store/windows/windowSlice";
import { WINDOW_CONFIG } from "#constants/index";
import { useRef } from "react";
const WindowControl = ({
  name,
  windowName,
}: {
  name: string;
  windowName: Window["window"];
}) => {
  const dispatch = useDispatch();
  const handleClose = (windowKey: string) => {
    dispatch(
      closeWindow({ windowKey: windowKey as keyof typeof WINDOW_CONFIG })
    );
  };
  const dragHelper = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={dragHelper}
      className="flex items-center gap-3 px-4 py-[6px] bg-[#f5f5f7] border-b border-black/10 select-none cursor-grab active:cursor-grabbing"
    >
      <div
        onClick={() => handleClose(windowName)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBB2E] border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840] border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
      </div>
      <p className="text-[11px] text-white/60 select-none">
        {name}@portfolio — zsh — tech-stack.sh
      </p>
      <div className="w-10" />
    </div>
  );
};

export default WindowControl;

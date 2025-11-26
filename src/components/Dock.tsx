import { dockApps } from "#constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { openWindow, closeWindow } from "#store/windows/windowSlice";
import { RootState } from "#store/store";
const Dock = () => {
  const dockRef = useRef(null);
  const dispatch = useDispatch();
  const windows = useSelector((state: RootState) => state.windows.windows);
  useGSAP(() => {
    const dock = dockRef.current as HTMLElement | null;
    if (!dock) return () => {};
    const icons = dock.querySelectorAll(".dock-icon");
    const animateIcon = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width: iconWidth } =
          icon.getBoundingClientRect();
        const center = iconLeft - left + iconWidth / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 2000);
        gsap.to(icon, {
          scale: 1 + 0.5 * intensity,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    };
    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();
      animateIcon(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      );
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);
  const toggleApp = ({
    id,
    canOpen,
  }: {
    id: keyof typeof windows;
    canOpen: boolean;
  }) => {
    if (!canOpen) return;
    const appWindow = windows[id];
    if (appWindow.isOpen) {
      dispatch(closeWindow({ windowKey: id }));
    } else {
      dispatch(openWindow({ windowKey: id, data: null }));
      console.log("workings");
    }
    console.log(windows);
  };
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              disabled={!canOpen}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              // @ts-ignore
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                loading="lazy"
                alt="images"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;

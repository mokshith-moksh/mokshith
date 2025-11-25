import { Window } from "#store/windows/windowSlice";
import { useSelector } from "react-redux";
import React, { useLayoutEffect, useRef } from "react";
import { RootState } from "#store/store";
import { JSX } from "react/jsx-runtime";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { focusWindow } from "#store/windows/windowSlice";
import { useDispatch } from "react-redux";
import { Draggable } from "gsap/Draggable";
const WindowWrapper = <P extends object>(
  Component: React.ComponentType<P>,
  windowKey: Window["window"]
) => {
  const Wrapped = (props: JSX.IntrinsicAttributes & P) => {
    const dispatch = useDispatch();
    const windows = useSelector((state: RootState) => state.windows.windows);
    const { zIndex, isOpen } = windows[windowKey];
    const ref = useRef(null);
    useGSAP(() => {
      const ele = ref.current as HTMLElement | null;
      if (!ele || !isOpen) return;
      ele.style.display = "block";
      gsap.fromTo(
        ele,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
    }, [isOpen]);
    useGSAP(() => {
      const ele = ref.current as HTMLElement | null;
      if (!ele) return;
      const [instance] = Draggable.create(ele, {
        onPress: () => {
          dispatch(focusWindow({ windowKey }));
        },
      });

      return () => {
        instance.kill();
      };
    }, []);
    useLayoutEffect(() => {
      const ele = ref.current as HTMLElement | null;
      if (!ele) return;
      ele.style.display = isOpen ? "block" : "none";
    }, [isOpen]);
    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex: zIndex, minWidth: 320, minHeight: 200 }}
        className={`absolute resize overflow-auto`}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;

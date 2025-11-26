import { locations } from "#constants/index";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import { useDispatch } from "react-redux";
import { openWindow } from "#store/windows/windowSlice";
import { setActiveLocation } from "#store/windows/locationSlice";
const Desktop = () => {
  const dispatch = useDispatch();
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);
  return (
    <section id="home">
      <ul>
        {locations.work.children.map((folder) => (
          <li
            key={folder.id}
            className={clsx(
              folder.windowPosition,
              "cursor-pointer",
              "group folder"
            )}
            onClick={() => {
              dispatch(setActiveLocation(folder));
              dispatch(openWindow({ windowKey: "finder", data: null }));
            }}
          >
            <img src={folder.icon} />
            <p>{folder.name.slice(0, 13)}...</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Desktop;

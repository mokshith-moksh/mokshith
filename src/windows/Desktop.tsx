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
    Draggable.create("#img");
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
      <div id="img" className="absolute w-30 top-10 right-30">
        <img
          src="/images/os.png"
          className=""
          onClick={() =>
            dispatch(
              openWindow({
                windowKey: "imgfile",
                // @ts-ignore
                data: { imageUrl: "/images/os.png" },
              })
            )
          }
        />
        <p className="text-white">Open Source</p>
      </div>
      <div id="img" className="absolute w-30 top-80 right-60">
        <img
          src="/images/hack4.png"
          className=""
          onClick={() =>
            dispatch(
              openWindow({
                windowKey: "imgfile",
                // @ts-ignore
                data: { imageUrl: "/images/hack4.png" },
              })
            )
          }
        />
        <p className="text-white">Badge 4</p>
      </div>
      <div id="img" className="absolute w-30 top-120 right-20">
        <img
          src="/images/hack2.png"
          className=""
          onClick={() =>
            dispatch(
              openWindow({
                windowKey: "imgfile",
                // @ts-ignore
                data: { imageUrl: "/images/hack2.png" },
              })
            )
          }
        />
        <p className="text-white">Badge 3</p>
      </div>
      <div id="img" className="absolute w-30 top-120 left-20">
        <img
          src="/images/hack3.png"
          className=""
          onClick={() =>
            dispatch(
              openWindow({
                windowKey: "imgfile",
                // @ts-ignore
                data: { imageUrl: "/images/hack3.png" },
              })
            )
          }
        />
        <p className="text-white">Badge 2</p>
      </div>
      <div id="img" className="absolute w-30 top-80 left-40">
        <img
          src="/images/hack1.png"
          className=""
          onClick={() =>
            dispatch(
              openWindow({
                windowKey: "imgfile",
                // @ts-ignore
                data: { imageUrl: "/images/hack1.png" },
              })
            )
          }
        />
        <p className="text-white">Badge 1</p>
      </div>
      <div id="img" className="absolute w-30 top-20 right-[45%]">
        <img
          src="/images/Digi.png"
          className=""
          onClick={() =>
            dispatch(
              openWindow({
                windowKey: "imgfile",
                // @ts-ignore
                data: { imageUrl: "/images/Digi.png" },
              })
            )
          }
        />
        <p className="text-white">Digital Ocean</p>
      </div>
    </section>
  );
};

export default Desktop;

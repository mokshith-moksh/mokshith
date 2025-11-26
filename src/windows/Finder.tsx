import { locations } from "#constants/index";
import WindowWrapper from "#hoc/windowWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "#store/store";
import { setActiveLocation } from "#store/windows/locationSlice";
import clsx from "clsx";
import { openWindow } from "#store/windows/windowSlice";
const Finder = () => {
  const dispatch = useDispatch();
  const activeLocation = useSelector(
    (state: RootState) => state.location.activeLocation
  );
  // @ts-ignore
  const openItem = (item) => {
    if (item.fileType === "pdf") {
      return dispatch(
        openWindow({
          windowKey: "resume",
          data: null,
        })
      );
    }
    if (item.kind === "folder") {
      return dispatch(setActiveLocation(item));
    }
    if (["fig", "url"].includes(item.fileType)) {
      let finalUrl = item.href;

      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = "https://" + finalUrl;
      }

      window.open(finalUrl, "_blank", "noopener,noreferrer");
    }

    if (item.fileType === "txt") {
      return dispatch(
        openWindow({
          windowKey: "txtfile",
          data: item.description,
        })
      );
    }
    if (item.fileType === "img") {
      return dispatch(
        openWindow({
          windowKey: "imgfile",
          data: item,
        })
      );
    }
  };
  return (
    <>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>
              {Object.values(locations).map((location) => (
                <li
                  key={location.id}
                  onClick={() => dispatch(setActiveLocation(location))}
                  className={clsx(
                    location.id === activeLocation?.id ? "active" : "not-active"
                  )}
                >
                  <img src={location.icon} alt={location.name} />
                  <p className="text-sm font-medium truncate">
                    {location.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>
              {locations.work.children.map((location) => (
                <li
                  key={location.id}
                  onClick={() => dispatch(setActiveLocation(location))}
                  className={clsx(
                    location.id === activeLocation?.id ? "active" : "not-active"
                  )}
                >
                  <img
                    src={location.icon}
                    alt={location.name}
                    width={30}
                    height={30}
                  />
                  <p className="text-sm font-medium truncate">
                    {location.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={`${item.position} cursor-pointer`}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;

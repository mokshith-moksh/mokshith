import { navLinks, navIcons } from "#constants/index";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openWindow } from "#store/windows/windowSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav>
      <div>
        {" "}
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Mokshith</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => {
                console.log("Opening window:", name);
                dispatch(openWindow({ windowKey: type, data: null }));
              }}
            >
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map((icon) => (
            <li key={icon.id}>
              <img src={icon.img} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;

import { navLinks, navIcons } from "#constants/index";
import dayjs from "dayjs";
const Navbar = () => {
  return (
    <nav>
      <div>
        {" "}
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Mokshith</p>
        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>{item.name}</li>
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

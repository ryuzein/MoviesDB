import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import TopNav from "./TopNav";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggle = () => {
    setActive(!active);
  };
  return (
    <div>
      <nav className=" flex flex-row  p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 ">
        <div className="flex-1  ">
          {/* <button onClick={toggle} className="s">
            <GiHamburgerMenu className="w-8 h-8" />
          </button> */}
          <div
          // style={{
          //   display: active ? "block" : "none",
          //   transitionTimingFunction: "ease",
          //   transitionDuration: "0.5s",
          // }}
          >
            <ul className="flex flex-row justify-center ">
              <Link to="/">
                <li className="list">Home</li>
              </Link>
              <Link to="/top">
                <li className="list">Top</li>
              </Link>
              <Link to="/trending">
                <li className="list">Trending</li>
              </Link>
              <Link to="/genre">
                <li className="list">Genre</li>
              </Link>
            </ul>
          </div>
        </div>
        <div>
          <TopNav />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

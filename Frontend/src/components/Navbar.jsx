import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useAuth } from "../context/authContext";
// import axiosInstance from "../services/axiosInstance";

const Navbar = () => {
  const { user, logout } = useAuth();

  const hamBurger = () => {
    const menu1 = document.getElementById("hamBurger-menu-list");
    const menu2 = document.getElementById("hamBurger-menu-buttons");
    menu1.classList.toggle("hidden");
    menu2.classList.toggle("hidden");
  };

  const toggleNav = () => {
    const menu1 = document.getElementById("hamBurger-menu-list");
    const menu2 = document.getElementById("hamBurger-menu-buttons");
    menu1.classList.toggle("hidden");
    menu2.classList.toggle("hidden");
  };

  return (
    <nav className="md:flex px-5 py-2 w-full items-center backdrop-blur justify-between m-auto">
      <div>
        <p className="flex justify-between nav-title text-lg font-bold hover:underline nav-title">
          <Link to="/">SlamBook</Link>
          <span className="block md:hidden">
            <i className="fa-solid fa-bars" onClick={hamBurger}></i>
          </span>
        </p>
      </div>
      <div className="hidden md:block" id="hamBurger-menu-list">
        <ul className="md:flex gap-4 text-center">
          <li>
            <CustomButton
              text="Home"
              buttonStyle={"hover:bg-cyan-400 nav-elements"}
              routeTo={"/"}
              onClick={toggleNav}
            />
          </li>
          <li>
            <CustomButton
              text="Create Slam"
              buttonStyle={"hover:bg-yellow-400 nav-elements"}
              routeTo={"/createslam"}
              onClick={toggleNav}
            />
          </li>
          <li>
            <CustomButton
              text="Pricing"
              buttonStyle={"hover:bg-cyan-400 nav-elements"}
              routeTo={"/pricing"}
              onClick={toggleNav}
            />
          </li>
        </ul>
      </div>
      <div
        className="flex gap-3 pr-3 items-center justify-center hidden md:block"
        id="hamBurger-menu-buttons"
      >
        {!user && (
          <>
            <CustomButton
              text="Login"
              buttonStyle={"bg-cyan-400 hover:bg-cyan-300 nav-elements"}
              routeTo={"/login"}
              onClick={toggleNav}
            />
            <CustomButton
              text="Signup"
              buttonStyle={"bg-yellow-400 hover:bg-yellow-300 nav-elements"}
              routeTo={"/register"}
              onClick={toggleNav}
            />
          </>
        )}

        {user && (
          <>
            <CustomButton
              text="Profile"
              buttonStyle={"bg-cyan-400 hover:bg-cyan-300 nav-elements"}
              routeTo={"/profile"}
              onClick={toggleNav}
            />
            <CustomButton
              text="Sign out"
              buttonStyle={"bg-yellow-400 hover:bg-yellow-300 nav-elements"}
              routeTo={"/"}
              onClick={() => {
                logout();
                toggleNav();
              }}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import axios from "axios";

const Navbar = () => {
  const user = true;
  const hamBurger = () => {
    const menu1 = document.getElementById("hamBurger-menu-list");
    const menu2 = document.getElementById("hamBurger-menu-buttons");
    menu1.classList.toggle("hidden");
    menu2.classList.toggle("hidden");
  };

  const logout = async () => {
    // eslint-disable-next-line no-undef
    const res = await axios.get(`http://localhost:3000/auth/logout`, {
      withCredentials: true,
    });
    console.log(res.data);
  };

  return (
    <nav className="md:flex px-5 py-2 sticky top-0 w-full items-center backdrop-blur justify-between m-auto z-20">
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
            />
          </li>
          <li>
            <CustomButton
              text="Create Slam"
              buttonStyle={"hover:bg-yellow-400 nav-elements"}
              routeTo={"/createslam"}
            />
          </li>
          <li>
            <CustomButton
              text="Pricing"
              buttonStyle={"hover:bg-cyan-400 nav-elements"}
              routeTo={"/"}
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
            />
            <CustomButton
              text="Signup"
              buttonStyle={"bg-yellow-400 hover:bg-yellow-300 nav-elements"}
              routeTo={"/register"}
            />
          </>
        )}

        {user && (
          <>
            <CustomButton
              text="Slambrary"
              buttonStyle={"bg-cyan-400 hover:bg-cyan-300 nav-elements"}
              routeTo={"/slambrary"}
            />
            <CustomButton
              text="Sign out"
              buttonStyle={"bg-yellow-400 hover:bg-yellow-300 nav-elements"}
              routeTo={"/"}
              onClick={logout}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import axiosInstance from "../services/axiosInstance";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Slambrary = () => {
  const [slams, setslams] = useState([]);

  const navigate = useNavigate();

  const copySlam = (id) => {
    let slamLink = `${import.meta.env.VITE_CLIENT_URL}/slam/${id}`;
    try {
      navigator.clipboard.writeText(slamLink);
      toast.success("Link Copied to ClipBoard");
    } catch (e) {
      toast.warn("Link Can't be copied");
    }
  };

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axiosInstance.get(`/slambrary`, {
          withCredentials: true,
        });
        setslams(res.data);
      };
      fetch();
    } catch (error) {
      toast.warn("Error fetching slams");
      navigate("/login");
    }
  });

  return (
    <>
      <section>
        <div className="flex flex-col justify-center items-center">
          <div className="text-6xl font-extrabold p-6">
            <h1>Slambrary</h1>
          </div>
          <div>
            <ul className="w-screen">
              {slams.map((slam, index) => (
                <li
                  key={index}
                  className="block flex flex-col md:flex-row justify-between items-center p-6 bg-fuchsia-300 border border-black rounded-lg shadow hover:bg-fuchsia-300 dark:bg-fuchsia-300 dark:hover:bg-fuchsia-400 hover:border-black hover:border-2 m-4 text-2xl text-black"
                >
                  {slam.slamname}
                  <div>
                    <Link to={`/slamresponses/${slam._id}`} key={index}>
                      <button
                        type="submit"
                        className="p-3 m-1 rounded-3xl hover:shadow-xl bg-lime-400 hover:bg-lime-300 border-2 sm:text-xs text-sm md:text-xl border-black gsap-form-button"
                      >
                        <i className="fa-solid fa-eye"></i> Responses
                      </button>
                    </Link>
                    <Link to={`/editslam/${slam._id}`}>
                      <button
                        type="submit"
                        className="p-3 m-1 rounded-3xl hover:shadow-xl bg-orange-400 hover:bg-orange-300 border-2 sm:text-xs text-sm md:text-xl border-black gsap-form-button"
                      >
                        <i className="fa-solid fa-pen"></i> Edit
                      </button>
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        copySlam(slam._id);
                      }}
                      className="p-3 m-1 rounded-3xl hover:shadow-xl bg-sky-400 hover:bg-sky-300 border-2 sm:text-xs text-sm md:text-xl border-black gsap-form-button"
                    >
                      <i className="fa-solid fa-share-nodes"></i> Share Slam
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slambrary;

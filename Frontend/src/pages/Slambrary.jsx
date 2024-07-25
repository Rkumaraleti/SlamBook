import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Slambrary = () => {
  const [slams, setslams] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3000/slambrary");
      setslams(res.data);
    };
    fetch();
  }, []);

  return (
    <>
      <section>
        <div className="flex flex-col justify-center items-center">
          <div className="text-6xl font-extrabold p-6">
            <h1>Slambrary</h1>
          </div>
          <div>
            <ul>
              {slams.map((slam, index) => (
                <Link to={`/slam/${slam._id}`} key={index}>
                  <li className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-white m-4">
                    {slam.slamname}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slambrary;

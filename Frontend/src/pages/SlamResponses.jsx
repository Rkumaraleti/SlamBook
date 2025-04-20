import axiosInstance from "../services/axiosInstance";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SlamResponses = () => {
  const { id } = useParams();
  const [slams, setslams] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(`/slam/${id}/slamresponses`, {
        withCredentials: true,
      });
      setslams(res.data.slams);
    };
    fetch();
  }, [id]);

  return (
    <>
      <section>
        <div className="flex flex-col justify-center items-center mt-[3rem]">
          <div className="text-6xl font-extrabold p-6">
            <h1>SlamResponses</h1>
          </div>
          <div>
            {slams.length === 0 ? (
              <p className="text-xl font-semibold text-gray-600">
                No responses found.
              </p>
            ) : (
              <ul>
                {slams.map((slam, index) => (
                  <Link to={`/slam/${slam._id}/showslam`} key={index}>
                    <li className="block p-6 bg-indigo-300 border border-1 border-gray-900 rounded-lg shadow hover:border-2 text-dark m-4 font-bold">
                      See Response of {slam.answersOwnedBy.username}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SlamResponses;

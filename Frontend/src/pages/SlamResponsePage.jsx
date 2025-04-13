import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
// import { useAuth } from "../context/authContext";

const SlamResponsePage = () => {
  const { id } = useParams();

  // const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [slamer, setSlamer] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(`/slam/${id}/showslam`, {
        withCredentials: true,
      });
      const slam = res.data.slams[0];
      setQuestions(slam.questions);
      setAnswers(slam.answers);
      setSlamer(slam.answersOwnedBy);
    };
    fetch();
    return () => {};
  }, [id]);

  return (
    <>
      <section className="flex flex-col min-h-screen items-center justify-center text-center block">
        <div className="text-6xl font-extrabold p-6">
          <h1>{slamer.username}</h1>
        </div>
        <div className="p-5">
          {questions.map((question, index) => (
            <div
              key={index}
              className="p-3 flex w-100 items-center justify-center border m-3"
            >
              <div className="w-[60vw] items-center justify-center">
                <h1
                  htmlFor={"question" + index}
                  className="block text-2xl font-bold"
                >
                  {question}
                </h1>
                <p htmlFor={"answer" + index} className="block">
                  {answers[index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SlamResponsePage;

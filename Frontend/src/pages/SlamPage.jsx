import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Context:

// Toaster:
import { toast } from "react-toastify";

function Slam() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [slamname, setSlamname] = useState("");

  const { id } = useParams(); // To fetch params of url
  const slamId = id;

  const Navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const slam = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/slam/${slamId}`
      );
      setQuestions(slam.data[0].questions);
      setSlamname(slam.data[0].slamname);
    })();
  }, [slamId]);

  const handleTodoChange = (e, i) => {
    const newAnswers = [...answers];
    newAnswers[i] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-dupe-keys

    let theuser = JSON.parse(user);

    if (!user) {
      toast.warn("Login to submit the slam response");
      Navigate("/login");
    }

    const submit = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/slam/${slamId}`,
      [questions, answers, theuser._id],
      { withCredentials: true }
    );
    if (submit.data.status == 200) {
      Navigate("/");
    } else {
      Navigate("/error");
    }
  };

  return (
    <>
      <section className="flex flex-col min-h-screen items-center justify-center text-center block">
        <div className="text-6xl font-extrabold p-6">
          <h1>{slamname}</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-screen">
          <div className="p-5 ">
            {questions.map((question, index) => (
              <div
                key={index}
                className="p-3 flex w-100 items-center justify-center"
              >
                <div className="w-[60vw] items-center justify-center">
                  <label
                    htmlFor={"question" + index}
                    className="block gsap-form-label"
                  >
                    {question}
                  </label>
                  <input
                    type="text"
                    placeholder="Answer"
                    name={"question" + index}
                    onChange={(e) => handleTodoChange(e, index)}
                    required
                    className={`m-2 w-[60vw] border-b-2 focus:border-black focus:outline-none text-center gsap-form-input}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="p-3 m-1 rounded-3xl hover:shadow-xl bg-cyan-400 hover:bg-cyan-300 gsap-form-button"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Slam;

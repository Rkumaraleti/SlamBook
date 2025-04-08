/* eslint-disable no-dupe-keys */
import { useState, useEffect } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditSlam() {
  const Navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [slamName, setSlamName] = useState("");

  const { id } = useParams(); // To fetch params of url
  const slamId = id;

  useEffect(() => {
    (async () => {
      const slam = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/slam/${slamId}`
      );
      setQuestions(slam.data[0].questions);
      setSlamName(slam.data[0].slamname);
    })();
  }, [slamId]);

  const handleSlamName = (e) => {
    const newSlamName = e.target.value;
    setSlamName(newSlamName);
  };

  const handleTodoChange = (e, i) => {
    const newformFields = [...questions];
    newformFields[i] = e.target.value;
    setQuestions(newformFields);
  };

  const handleAddTodo = () => {
    setQuestions([...questions, { question: "" }]);
  };

  const handleDeleteTodo = (i) => {
    const newformFields = [...questions];
    newformFields.splice(i, 1);
    setQuestions(newformFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const clearState = () => {
    //   setSlamName("");
    //   setQuestions([{ question: "" }]);
    // };
    if (!user) {
      toast.warn("Login to create slam");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/slam/${slamId}/editslam`,
        [questions, slamName],
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      Navigate("/pricing");
    }
  };

  return (
    <>
      <section
        className={`flex min-h-screen items-center justify-center text-center block w-[90vw] m-auto`}
      >
        <form onSubmit={handleSubmit} className="w-screen">
          <div className="p-5">
            <div className="p-3 flex w-screen justify-center">
              <div className="">
                <input
                  type="text"
                  placeholder="Enter your Slamcard Name"
                  name="slamname"
                  onChange={(e) => handleSlamName(e)}
                  value={slamName}
                  required
                  className="m-3 w-[80vw] focus:outline-none text-center gsap-form-inpu text-xl md:text-4xl font-bold gsap-title"
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div className="p-5">
            {questions.map((question, index) => (
              <div
                key={index}
                className="p-3 flex w-screen items-center justify-center"
              >
                <div className="w-[60vw] items-center justify-center">
                  <input
                    type="text"
                    placeholder={`Enter Question ${index + 1}`}
                    name={"question" + index}
                    onChange={(e) => handleTodoChange(e, index)}
                    value={question}
                    required
                    className="m-2 w-[60vw] border-b-2 focus:border-black focus:outline-none text-center gsap-form-input"
                  />
                </div>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="p-3 m-3 mt-6 rounded-3xl hover:shadow-xl bg-red-400 hover:bg-red-500 gsap-form-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddTodo}
            className="p-3 m-1 rounded-3xl hover:shadow-xl bg-yellow-400 hover:bg-yellow-300 gsap-form-button"
          >
            Add New
          </button>
          <button
            type="submit"
            className="p-3 m-1 rounded-3xl hover:shadow-xl bg-cyan-400 hover:bg-cyan-300 gsap-form-button"
          >
            Update Slam
          </button>
        </form>
      </section>
      {/* <Slambrary /> */}
    </>
  );
}

export default EditSlam;

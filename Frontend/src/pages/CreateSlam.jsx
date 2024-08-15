/* eslint-disable no-dupe-keys */
import { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";

function CreateSlamForm() {
  const user = true;

  const [formFields, setformFields] = useState([{ question: "" }]);
  const [slamName, setSlamName] = useState("");

  const handleSlamName = (e) => {
    const newSlamName = e.target.value;
    setSlamName(newSlamName);
  };

  const handleTodoChange = (e, i) => {
    const newformFields = [...formFields];
    newformFields[i] = e.target.value;
    setformFields(newformFields);
  };

  const handleAddTodo = () => {
    setformFields([...formFields, { question: "" }]);
  };

  const handleDeleteTodo = (i) => {
    const newformFields = [...formFields];
    newformFields.splice(i, 1);
    setformFields(newformFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const clearState = () => {
      setSlamName("");
      setformFields([{ question: "" }]);
    };
    // eslint-disable-next-line no-dupe-keys
    axios.post("http://localhost:3000/createslam", [formFields, slamName]);
    clearState();
  };

  return (
    <>
      {!user && <Navigate to="/login" />}
      <section className="flex min-h-screen items-center justify-center text-center block w-[90vw] m-auto">
        <form onSubmit={handleSubmit} className="w-screen">
          <div className="p-5">
            <div className="p-3 flex w-screen justify-center">
              <div className="">
                <input
                  type="text"
                  placeholder="Enter your Slamcard Name"
                  name="slamname"
                  onChange={(e) => handleSlamName(e)}
                  required
                  className="m-3 w-[80vw] focus:outline-none text-center gsap-form-inpu text-4xl font-bold gsap-title"
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div className="p-5">
            {formFields.map((question, index) => (
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
            Make My Slam
          </button>
        </form>
      </section>
      {/* <Slambrary /> */}
    </>
  );
}

export default CreateSlamForm;

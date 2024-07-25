const Login = () => {
  return (
    <>
      <div className="container flex w-screen h-screen items-center m-auto">
        <section className="flex min-h-screen items-center text-center block pt-[50px] w-[90vw] m-auto">
          <form className="w-screen">
            <div className="border rounded-md border-black min-w-[400px] max-w-[500px] m-auto p-5">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold gsap-title">Login</h1>
              </div>
              <div className="">
                <div className=" flex flex-col items-center m-4">
                  <input
                    type="text"
                    placeholder="username"
                    className="m-4 min-w-[100px] w-[80%] border-b-2 focus:border-black focus:outline-none gsap-form-input"
                    autoFocus
                  />
                  <input
                    type="password"
                    placeholder="password"
                    className="m-4 min-w-[100px] w-[80%] border-b-2 focus:border-black focus:outline-none gsap-form-input"
                  />
                </div>
                <button
                  type="Submit"
                  className={
                    "p-3 m-1 rounded-3xl hover:shadow-xl p-3 m-1 rounded-3xl hover:shadow-xl bg-yellow-400 hover:bg-yellow-300 gsap-form-button"
                  }
                >
                  Login
                </button>
              </div>

              <div className="w-100 border-2 border-black py-3 bg-white-500 hover:bg-cyan-400 rounded m-2 hover:text-white">
                <button className="text-md">
                  <i className="fa-brands fa-google"></i> Google
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;

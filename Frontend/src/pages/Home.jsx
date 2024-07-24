import CustomButton from "../components/CustomButton";

const Home = () => {
  return (
    <>
      <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-t from-cyan-500 to-transparent">
        <div id="title" className="text-center">
          <div className="p-6" id="title-text">
            <h1 className="md:text-6xl font-bold py-3 text-3xl">
              The SlamBook
            </h1>
            <p className="md:text-4xl text-xl gsap-description">
              Never Forget to share your Slam.
            </p>
          </div>
          <CustomButton
            text="Create Your Slam"
            buttonStyle={"bg-yellow-400 hover:bg-yellow-300"}
            routeTo={"/createslam"}
          />
        </div>
      </section>
    </>
  );
};

export default Home;

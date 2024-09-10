import CustomButton from "../components/CustomButton";

// eslint-disable-next-line react/prop-types
const Pricing = ({ backgroundStyle }) => {
  return (
    <section
      className={`w-screen min-h-screen flex justify-center items-center ${
        backgroundStyle
          ? backgroundStyle
          : "bg-gradient-to-t from-amber-500 to-transparent"
      }`}
    >
      <div id="title" className="text-center">
        <div className="" id="title-text">
          <h1 className="md:text-6xl font-bold  text-3xl">Have a Free Slam</h1>
          <p className="md:text-4xl text-xl gsap-description">
            Create a Slam and share it with your friends.
          </p>
        </div>
        <div
          id="pricing-section"
          className="md:flex-row gap-6 mt-[4rem] flex flex-col"
        >
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-6 m-2 bg-white hover:shadow-sm hover:bg-zinc-100">
            <img
              className="w-[150px] p-2 m-auto"
              src="../src/assets/images/free.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-3xl mb-2">Free</div>
              <p className="text-gray-700 text-base">
                Have a Free Slam to share it with your friends and save it
                forever.
              </p>
            </div>
          </div>
          <div className="max-w-sm rounded-lg overflow-hidden bg-pink-400 shadow-lg p-6 m-2 hover:shadow-sm hover:bg-pink-300">
            <img
              className="w-[150px] p-2 m-auto"
              src="../src/assets/images/premium.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-3xl mb-2">₹30/slam</div>
              <p className="text-gray-700 text-base">
                More Friends? No Problem, but new slam forever.
              </p>
            </div>
          </div>
        </div>
        {backgroundStyle ? (
          ""
        ) : (
          <CustomButton
            text="Create Your Slam"
            buttonStyle={"bg-yellow-400 hover:bg-yellow-300 m-6"}
            routeTo={"/createslam"}
          />
        )}
      </div>
    </section>
  );
};

export default Pricing;

import Slambrary from "./Slambrary";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <div id="profile" className="w-screen mt-[5rem]">
        <div className="bg-fuchsia-400 p-5 text-black border-black border-2 text-2xl text-center w-[80%] m-auto my-5 border rounded-2xl">
          {`Hello ` + user.username}
        </div>
        <Slambrary />
      </div>
    </>
  );
};

export default Profile;

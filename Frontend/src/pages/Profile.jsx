import Slambrary from "./Slambrary";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <div id="profile" className="w-full mt-[1.2rem]">
        <div className="bg-black p-5 text-white text-center w-[80%] m-auto my-5 bg-[rgba(124,58,237,0.5)] border rounded-2xl">
          {user.username}
        </div>
        <Slambrary />
      </div>
    </>
  );
};

export default Profile;

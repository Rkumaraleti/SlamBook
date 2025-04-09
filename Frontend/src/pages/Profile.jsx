import { useAuth } from "../context/authContext";
import Slambrary from "./Slambrary";

const Profile = () => {
  const { user } = useAuth();

  // If user is not available, show a loading message or redirect to login
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Loading...</h1>
      </div>
    );
  }

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

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <div className="w-100 border-2 border-black py-3 bg-white-500 hover:bg-cyan-400 rounded m-2 hover:text-white">
      <button type="button" className="text-md" onClick={handleGoogleLogin}>
        <i className="fa-brands fa-google"></i> Google
      </button>
    </div>
  );
};
export default GoogleLogin;

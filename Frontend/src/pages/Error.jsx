const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
      <p className="text-gray-600 mt-4">
        Please try refreshing the page or contact support.
      </p>
    </div>
  );
};

export default ErrorPage;

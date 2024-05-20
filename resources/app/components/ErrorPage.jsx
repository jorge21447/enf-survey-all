
const ErrorPage = ({ title, message }) => {
  return (
    <div className="bg-gray-100 rounded-xl dark:bg-slate-800 text-gray-800 dark:text-white flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl font-bold">{title}</div>
      <div className="mt-4 text-lg">{message}</div>
    </div>
  );
};

export default ErrorPage;

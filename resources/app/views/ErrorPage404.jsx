import { Link } from "react-router-dom";

const ErrorPage404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-700 dark:bg-gray-900 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-gray-200 mb-10 text-center">
        Error 404
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-400 mb-5 text-center">
        Página no encontrada
      </p>
      <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-400 mb-10 text-center">
        Parece que te has desviado del camino...
      </p>
      <Link
        to={"/"}
        className="bg-white text-black rounded-full px-4 py-2 font-bold hover:bg-gray-200 dark:bg-gray-200 dark:text-black"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default ErrorPage404;

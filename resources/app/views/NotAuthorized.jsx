import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-300 to-red-500 dark:bg-gray-900 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-gray-200 mb-10 text-center">
        Acceso Denegado
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-400 mb-10 text-center">
        No tienes permiso para acceder a esta página.
      </p>
      <Link
        to="/auth/login"
        className="bg-white text-black rounded-full px-4 py-2 font-bold hover:bg-gray-200 dark:bg-gray-200 dark:text-black"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default NotAuthorized;
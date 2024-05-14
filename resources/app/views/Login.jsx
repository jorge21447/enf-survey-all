import { Link } from "react-router-dom";
import logo from "../assets/logo-enf.png";
import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [errores, setErrores] = useState();

  const identifierRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores([]);

    const datos = {
      identifier: identifierRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores);
  };

  return (
    <>
      <div className="relative  z-10">
        <div className="flex relative items-center justify-center my-auto   z-40">
          <div className="min-h-screen flex items-center justify-center my-auto ">
            <div
              className="md:max-w-[450px] w-full md:w-[450px]  p-10 bg-white
           dark:bg-gray-700  rounded-3xl shadow-2xl  dark:shadow-2xl dark:shadow-slate-600"
            >
              <div className="flex justify-center mb-10">
                <img src={logo} alt="Logo" className="h-2/5 w-2/5 " />
              </div>
              <h2 className="text-3xl font-bold text-center my-4 font-mont">
                Iniciar Sesión
              </h2>
              <form onSubmit={handleSubmit} noValidate>
                {errores
                  ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
                  : null}
                <div className="mb-6 mt-4">
                  <label
                    htmlFor="identifier"
                    className="font-mont block text-sm font-semibold text-gray-600 dark:text-white"
                  >
                   Correo electrónico o CI
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                    placeholder="Correo o CI"
                    ref={identifierRef}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="font-mont block text-sm font-semibold text-gray-600 dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                    placeholder="Contraseña"
                    ref={passwordRef}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-bluenf text-white rounded-3xl py-2 px-4 w-full hover:bg-blue-800 font-mont font-semibold"
                >
                  Iniciar Sesión
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4 text-center font-mont dark:text-white">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/auth/register"
                  className="text-bluenf font-semibold hover:text-blue-700 hover:font-bold uppercase dark:text-cyan-400 dark:hover:text-cyan-600 "
                >
                  REGISTRARSE
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

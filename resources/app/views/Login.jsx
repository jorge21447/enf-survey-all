import { Link } from "react-router-dom";
import logo from "../assets/logo-enf.png";
import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth"; 

const Login = () => {

  const {login} = useAuth()

  const [errores, setErrores] = useState();

  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrores([])

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(datos, setErrores)
  };

  return (
    <>
      <div className="flex items-center justify-center my-auto  md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="min-h-screen flex items-center justify-center my-auto ">
          <div className="md:max-w-[450px] w-full md:w-[450px] p-4 md:p-14 bg-white  dark:bg-gray-700 rounded-3xl shadow-2xl dark:shadow-slate-600">
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
                  htmlFor="email"
                  className="font-mont block text-sm font-semibold text-gray-600 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="TuCorreo@example.com"
                  ref={emailRef}
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
    </>
  );
};

export default Login;

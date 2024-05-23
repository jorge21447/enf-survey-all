import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();

  const [errores, setErrores] = useState([]);

  const nameRef = createRef();
  const emailRef = createRef();
  const ciRef = createRef();
  const passwordRef = createRef();
  const password_ConfirmationRef = createRef();
  const [role_id, setRole_id] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores([]);

    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_ConfirmationRef.current.value,
      ci: ciRef.current.value,
      role_id: role_id,
    };
    register(datos, setErrores);
  };

  return (
    <>
    <div className="relative  z-10">
      <div className="flex relative items-center justify-center my-auto   z-40">
        <div className="min-h-screen flex items-center justify-center my-auto ">
          <div
            className="md:max-w-[450px] w-full  md:w-[450px]  p-10 bg-white
           dark:bg-gray-700  rounded-3xl shadow-2xl  dark:shadow-2xl dark:shadow-slate-600"
          >
            <h2 className="text-3xl font-bold text-center my-4 font-mont mb-6">
              Registro
            </h2>
            <form noValidate onSubmit={handleSubmit}>
              {errores
                ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
                : null}
              <div className="mb-6 ">
                <label
                  htmlFor="name"
                  className="font-mont block text-sm font-semibold text-gray-600 dark:text-white mt-4"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="Juan Pedro Linares Molina"
                  ref={nameRef}
                />
              </div>
              <div className="mb-6 ">
                <label
                  htmlFor="ci"
                  className="font-mont block text-sm font-semibold text-gray-600 dark:text-white mt-4"
                >
                  Cédula de Identidad
                </label>
                <input
                  type="text"
                  id="ci"
                  name="ci"
                  className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="9876541"
                  ref={ciRef}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="dark:text-white font-mont block text-sm font-semibold text-gray-600"
                >
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="example@example.com"
                  ref={emailRef}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className=" dark:text-white font-mont block text-sm font-semibold text-gray-600"
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

              <div className="mb-6">
                <label
                  htmlFor="password_confirmation"
                  className="dark:text-white font-mont block text-sm font-semibold text-gray-600"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="mt-1 p-2 w-full border rounded-md font-mont focus:outline-none focus:border-blue-500 focus:border-2"
                  placeholder="Repite la contraseña"
                  ref={password_ConfirmationRef}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm  font-mont font-semibold text-gray-900 dark:text-white"
                >
                  Tipo de Usuario
                </label>
                <select
                  id="role"
                  className="bg-gray-50 border font-mont border-gray-300 focus:border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={role_id}
                  onChange={(e) => setRole_id(e.target.value)}
                >
                  <option value={3}>Docente Asistencial</option>
                  <option value={4}>Estudiante</option>
                  <option value={5}>Docente</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-bluenf text-white rounded-3xl py-2 px-4 w-full hover:bg-blue-800 font-mont font-semibold"
              >
                Registrarse
              </button>
            </form>
            
            <p className="text-sm  dark:text-white text-gray-600 mt-4 text-center font-mont">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/auth/login"
                className="text-bluenf dark:text-cyan-400 dark:hover:text-cyan-600 font-semibold hover:text-blue-700 hover:font-bold uppercase"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </>

  );
};

export default Register;

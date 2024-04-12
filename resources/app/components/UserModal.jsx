import { createRef, useState } from "react";
import useSurvey from "../hooks/useSurvey";
import { MdClose } from "react-icons/md";
import Alerta from "./Alerta";

const UserModal = () => {
  const { changeStateModalUser, createUser } = useSurvey();
  const [errores, setErrores] = useState([]);

  const nameRef = createRef();
  const emailRef = createRef();
  const role_idRef = createRef();
  const date_of_birthRef = createRef();
  const is_activeRef = createRef();
  const photo_profileRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores([]);


    const formData = new FormData();

    // Agregar los valores de los campos del formulario al FormData
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("role_id", role_idRef.current.value);
    formData.append("date_of_birth", date_of_birthRef.current.value);
    formData.append("is_active", is_activeRef.current.value);
    formData.append("password", passwordRef.current.value);

    // Si photo_profile es un archivo, agrega el archivo al FormData
    if (photo_profileRef.current.files.length > 0) {
      formData.append("photo_profile", photo_profileRef.current.files[0]);
    } else {
      formData.append("photo_profile", photo_profileRef.current.value);
    }
    createUser(formData, setErrores);
  };

  return (
    <>
      <div className="z-[100] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        {/* Fondo oscuro */}
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-10"></div>

        <div className="relative p-4 w-full max-w-2xl max-h-full z-20">
          {/* Modal contenido */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal cabecera */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Nuevo Usuario
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={changeStateModalUser}
              >
                <MdClose size={20} />
                <span className="sr-only">Cerrar</span>
              </button>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              encType={`multipart/form-data`}
            >
              {errores
                ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
                : null}
              <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Alan Montes Castillo"
                    ref={nameRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rol
                  </label>
                  <select
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    ref={role_idRef}
                  >
                    <option value={1}>Administrador</option>
                    <option value={2}>Administrativo</option>
                    <option value={3}>Docente</option>
                    <option value={4}>Estudiante</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="example@example.com"
                    ref={emailRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_of_birth"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    id="date_of_birth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    ref={date_of_birthRef}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="************"
                    ref={passwordRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="is_active"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Activo
                  </label>
                  <select
                    id="is_active"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    ref={is_activeRef}
                  >
                    <option value={1}>Activo</option>
                    <option value={0}>No activo</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="photo_profile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Foto de perfil
                  </label>
                  <input
                    type="file"
                    name="photo_profile"
                    id="photo_profile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="105"
                    ref={photo_profileRef}
                  />
                </div>
              </div>
              <div className="items-center space-y-10 sm:flex sm:space-y-0 sm:space-x-4 ">
                <button
                  type="submit"
                  className="w-full sm:w-auto justify-center text-white inline-flex bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Añadir usuario
                </button>
                <button
                  type="button"
                  className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={changeStateModalUser}
                >
                  <MdClose className="mr-1 -ml-1 w-5 h-5" />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;

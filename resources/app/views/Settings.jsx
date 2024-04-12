import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import { MdClose } from "react-icons/md";
import Loader from "../components/Loader";
import clienteAxios from "../config/axios";
import useSWR from "swr";

const Settings = () => {
  const { userSurvey, roles } = useSurvey();

  const { editUser } = useSurvey();
  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [role_id, setRole_id] = useState("");
  const [photo_profile, setPhoto_profile] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [is_active, setIs_active] = useState(1);
  const [changePassword, setChangePassword] = useState(false);

  const token = localStorage.getItem("AUTH_TOKEN");

  const handleCheckboxChange = () => {
    setChangePassword(!changePassword);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPhoto_profile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores([]);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("role_id", role_id);
    formData.append("date_of_birth", date_of_birth);
    formData.append("is_active", is_active);
    formData.append("photo_profile", photo_profile);
    formData.append("id", userSurvey.id);

    if (changePassword) {
      formData.append("password_confirmation", password_confirmation);
      formData.append("password", password);
    }
    formData.append("_method", "put");

    const resultado = await editUser(formData, setErrores);
    if (resultado) {
      navigate(`/${roles[userSurvey.role.name]}`);
    }
  };

  const fetcher = () =>
    clienteAxios(`/api/users/${userSurvey.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading, mutate } = useSWR(
    userSurvey.id ? `/api/users/${userSurvey.id}` : null,
    fetcher
  );

  useEffect(() => {
    if (userSurvey.id && !isLoading) {
      setName(data.user.name);
      setEmail(data.user.email);
      setRole_id(data.user.role_id);
      setDate_of_birth(data.user.date_of_birth || "");
      setIs_active(data.user.is_active ? 1 : 0);
      //setPhoto_profile(data.user.photo_profile || '');
    }
  }, [isLoading, data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className=" overflow-y-auto overflow-x-hidden  right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full z-20">
          {/* Modal contenido */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal cabecera */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Editar Usuario
              </h3>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={role_id}
                    disabled={userSurvey.role.name !== "Administrador"}
                    onChange={(e) => setRole_id(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={date_of_birth}
                    onChange={(e) => setDate_of_birth(e.target.value)}
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
                    className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={is_active}
                    onChange={(e) => setIs_active(e.target.value)}
                    disabled={userSurvey.role.name !== "Administrador"}
                  >
                    <option value={1}>Activo</option>
                    <option value={0}>No activo</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="photo_profile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Foto de perfil
                  </label>
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    name="photo_profile"
                    id="photo_profile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-4 sm:col-span-2 space-y-4 sm:flex sm:space-y-0">
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-checkbox"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onClick={handleCheckboxChange}
                      value={changePassword}
                    />
                    <label
                      htmlFor="inline-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Cambiar Contraseña
                    </label>
                  </div>
                </div>
                {changePassword && (
                  <>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="************"
                        value={password_confirmation}
                        onChange={(e) =>
                          setPassword_confirmation(e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="items-center space-y-10 sm:flex sm:space-y-0 sm:space-x-4 ">
                <button
                  type="submit"
                  className="w-full sm:w-auto justify-center text-white inline-flex bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => {
                    navigate(`/${roles[userSurvey.role.name]}`);
                  }}
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

export default Settings;

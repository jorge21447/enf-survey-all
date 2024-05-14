import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import surveyHome from "../assets/surveyHome.png";
import logoEnf from "../assets/logo-enf.png";
import CryptoJS from "crypto-js";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserLocal = localStorage.getItem("user");

        if (storedUserLocal) {
            const informacionDesencriptada = CryptoJS.AES.decrypt(
                localStorage.getItem("user"),
                "@enf_survey"
            );
            const usuarioJSON = informacionDesencriptada.toString(
                CryptoJS.enc.Utf8
            );
            const storedUser = JSON.parse(usuarioJSON);
            // Redirigir al layout correspondiente del usuario
            switch (storedUser.role.name) {
                case "Administrador":
                    navigate("/admin");
                    break;
                case "Docente":
                    navigate("/teacher");
                    break;
                case "Estudiante":
                    navigate("/student");
                    break;
                case "Administrativo":
                    navigate("/administrativo");
                    break;

                default:
                    navigate("/auth"); // Redirigir a la página principal si no hay un rol válido
            }
        }
    }, [navigate]);
    return (
        <div className="flex flex-col md:flex-row h-screen  dark:bg-gray-900">
            <div
                className={`md:w-1/2 flex justify-center items-center bg-gradient-to-l  from-white from-0%  to-blue-950 ${" dark:from-gray-800 dark:from-10%  dark:to-blue-700"}`}
            >
                <img
                    src={surveyHome}
                    alt="Imagen"
                    className="w-1/3 md:w-2/4 py-5 transition duration-500 ease-in-out transform hover:scale-110"
                />
            </div>
            <div
                className={`md:w-1/2 flex flex-col justify-center items-start p-10 md:p-20 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
            >
                <h1
                    className={`text-3xl md:text-5xl font-bold text-blue-900 mb-5 transition duration-500 ease-in-out transform hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-400`}
                >
                    Sistema Web de Encuestas y Estadísticas para Docentes
                    Asistenciales
                </h1>
                <p
                    className={`text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-400`}
                >
                    El sistema brinda información de encuestas y estadísticas
                    para el seguimiento a docentes asistenciales.
                </p>
                <div className="mx-auto w-full md:mx-0 flex flex-col md:flex-row md:gap-4  justify-center md:justify-start">
                    <Link
                        to="/auth/login"
                        className=" transition duration-300  ease-in-out transform hover:scale-105  p-3 px-6  bg-blue-800 text-gray-100 hover:bg-blue-900 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800 rounded-full text-center justify-center items-center my-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 border-2 border-blue-800 dark:border-blue-700 "
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        to="/auth/register"
                        className=" transition duration-300  ease-in-out transform hover:scale-105  p-3 px-6  bg-white text-gray-700 hover:bg-gray-800 hover:text-white dark:bg-transparent dark:border-gray-200 border-2 dark:text-gray-200 dark:hover:bg-gray-50 rounded-full text-center justify-center items-center my-auto focus:outline-none focus:ring-2 dark:hover:text-gray-800 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 
                        md:mt-0 mt-6"
                    >
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Home;

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomGradientWaveSVG from "../components/CustomGradientWaveSVG";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

const AuthLayout = () => {
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
                    navigate("/auth/login"); // Redirigir a la página principal si no hay un rol válido
            }
        }
    }, [navigate]);

    return (
        <>
            <div className=" bg-bluenf sm:bg-white dark:bg-gray-900 h-full w-full md:h-screen md:w-full">
                <div>
                    <CustomGradientWaveSVG />
                </div>

                <Outlet />
            </div>

            <ToastContainer />
        </>
    );
};

export default AuthLayout;

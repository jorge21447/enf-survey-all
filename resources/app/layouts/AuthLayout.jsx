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
      const usuarioJSON = informacionDesencriptada.toString(CryptoJS.enc.Utf8);
      const storedUser = JSON.parse(usuarioJSON);
      // Redirigir al layout correspondiente del usuario
      switch (storedUser.role.name) {
        case "Administrador":
          navigate("/admin");
          break;
        case "Docente":
          navigate("/user");
          break;
        case "Estudiante":
          navigate("/user");
          break;
        case "Docente Asistencial":
          navigate("/user");
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
      <div className="relative bg-white dark:bg-gray-900 w-full h-full">
        <CustomGradientWaveSVG />
        <Outlet />
      </div>

      <ToastContainer />
    </>
  );
};

export default AuthLayout;

import { useEffect, useState } from "react";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const PettyCashBox = () => {
  const { userSurvey, roles } = useSurvey();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios(`/api/pettycashbox/user/${userSurvey.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    `/api/pettycashbox/user/${userSurvey.id}`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error) {
      // Si hay un error diferente a 404, console.log el error para depuración
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorText("No se encontró una caja chica asociada a este usuario.");
      } else {
        setErrorText("Ocurrió un error al cargar la caja chica.");
      }
    }
  }, [error]);

  
  useEffect(() => {
    if (data) {
      navigate(`/administrativo/pettycash/${data.id}/expenses`);
    }
  }, [data, navigate]);


  if (error) {
    return (
      <div className="bg-gray-100 rounded-xl dark:bg-slate-800 text-gray-800 dark:text-white flex flex-col items-center justify-center min-h-screen">
        <div>
          <h2 className="text-4xl font-bold text-red-800 dark:text-red-500  ">
            Error
          </h2>
        </div>
        <div className="mt-4 text-lg">{errorText}</div>
      </div>
    );
  }


  if (isLoading) return <Loader />;
};

export default PettyCashBox;

import { useEffect, useState } from "react";
import SurveyCard from "../components/SurveyCard";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";

const SurveysParticipate = () => {
  const navigate = useNavigate();
  const [error401, setError401] = useState(false);
  const [stopRefresh, setStopRefresh] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/api/surveys/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.data)
      .catch((error) => {
        if (error.response.status === 401) {
          setError401(true);
        } else if (error.response.status === 403) {
          setStopRefresh(true);
          throw new Error('Forbidden');
        } else {
          setStopRefresh(true);
          throw error;
        }
      });

  const { data, error, isLoading } = useSWR("/api/surveys/users", fetcher, {
    refreshInterval: stopRefresh ? 0 : 5000,
  });

  useEffect(() => {
    if (error401) {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("user");
      navigate("/auth/login");
    }
  }, [error401]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && data.length > 0 ? ( // Changed condition for empty data
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 justify-center md:justify-start">
              <div className="flex flex-wrap md:justify-start justify-center p-2">
                {data.map((survey, index) => (
                  <SurveyCard key={index} data={survey} />
                ))}
              </div>
            </div>
          ) : (
            <ErrorPage
              title="No hay encuestas disponibles" // Added more specific title
              message="En este momento no hay encuestas disponibles para responder."
            />
          )}
        </>
      )}
    </>
  );
};

export default SurveysParticipate;

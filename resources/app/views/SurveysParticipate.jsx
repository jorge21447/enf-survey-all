import SurveyCard from "../components/SurveyCard";
import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";

const SurveysParticipate = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/api/surveys/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/surveys/admin", fetcher, {
    refreshInterval: 1000,
  });


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-wrap md:justify-start  justify-center p-2 ">
            {data.map((survey, index) => (
              <SurveyCard key={index} data={survey} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SurveysParticipate;

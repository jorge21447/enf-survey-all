import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import SurveyTableReports from "../components/SurveyTableReports";

const Reports = () => {
  const navigate = useNavigate();
  const [error401, setError401] = useState(false);
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
        }
      });

  const { data, error, isLoading } = useSWR("/api/surveys/users", fetcher, {
    refreshInterval: 1000,
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
        <div className="mx-auto bg-slate-50 dark:bg-gray-900  min-h-screen max-w-screen-xl md:py-6">
          <SurveyTableReports surveys={data} />
        </div>
      )}
    </>
  );
};

export default Reports;

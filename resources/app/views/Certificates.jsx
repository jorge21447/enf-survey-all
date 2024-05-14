import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import SurveyCertificate from "../components/SurveyCertificate";

const Certificates = () => {

  const { deleteSurvey, userSurvey, roles } = useSurvey();

  const navigate = useNavigate();

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/api/surveys/certificates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/surveys/certificates", fetcher, {
    refreshInterval: 1000,
  });



  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto bg-slate-50 dark:bg-gray-900  min-h-screen max-w-screen-xl md:py-6">
          <SurveyCertificate
            surveys={data}
          />
        </div>
      )}
    </>
  );
};

export default Certificates;

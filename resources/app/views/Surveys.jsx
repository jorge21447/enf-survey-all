import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import SurveyTable from "../components/SurveyTable";
import Loader from "../components/Loader";

const Surveys = () => {

  const { deleteSurvey, userSurvey, roles } = useSurvey();

  const navigate = useNavigate();

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/api/surveys/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/surveys/users", fetcher, {
    refreshInterval: 1000,
  });


  const handleDelete = (name, id) => {
    deleteSurvey(name, id);
  };

  const handleCreateSurvey = (e) => {
    e.preventDefault();
    navigate(`/${roles[userSurvey.role.name]}/surveys/create`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto bg-slate-50 dark:bg-gray-900  min-h-screen max-w-screen-xl md:py-6">
          <SurveyTable
            surveys={data}
            handleCreateSurvey={handleCreateSurvey}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </>
  );
};

export default Surveys;

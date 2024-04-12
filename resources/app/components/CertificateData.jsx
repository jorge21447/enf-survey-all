import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Loader from "./Loader";
import clienteAxios from "../config/axios";
import useSurvey from "../hooks/useSurvey";
import { IoReturnUpBackOutline } from "react-icons/io5";

const CertificateData = () => {
  const { userSurvey, roles } = useSurvey();
  const { id } = useParams();
  const navigate = useNavigate();


  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios(`/api/certificates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR(`/api/certificates/${id}`, fetcher);

  const handleReturn = (e) => {
    e.preventDefault();

    navigate(`/${roles[userSurvey.role.name]}/certificates`);
  };  

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && (
            <>
             Aqui hay certificado 
            </>
          )}
        </>
      )}
    </>
  );
};

export default CertificateData;

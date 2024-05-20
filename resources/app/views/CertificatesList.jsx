import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import CertificatesCard from "../components/CertificatesCard";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";

const CertificatesList = () => {
  const navigate = useNavigate();
  const { userSurvey } = useSurvey();
  const [error401, setError401] = useState(false);
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios(`/api/certificates/user/${userSurvey.id}`, {
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

  const { data, error, isLoading } = useSWR(
    `/api/certificates/user/${userSurvey.id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

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
          {data && data?.certificates?.length > 0 ? (
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-wrap md:justify-start  justify-center p-2 ">
                {data.certificates.map((certificate, index) => (
                  <CertificatesCard key={index} data={certificate} />
                ))}
              </div>
            </div>
          ) : (
            <ErrorPage
              title="No hay certificados" // Added more specific title
              message="En este momento no cuentas con certificados disponibles."
            />
          )}
        </>
      )}
    </>
  );
};

export default CertificatesList;

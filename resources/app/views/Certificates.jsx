

import CertificatesCard from "../components/CertificatesCard"
import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";


const Certificates = () => {
  const navigate = useNavigate();
  const {userSurvey} = useSurvey()
  

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios(`/api/certificates/user/${userSurvey.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR(`/api/certificates/user/${userSurvey.id}`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-wrap md:justify-start  justify-center p-2 ">
            {data.certificates.map((certificate, index) => (
              <CertificatesCard key={index} data={certificate} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;

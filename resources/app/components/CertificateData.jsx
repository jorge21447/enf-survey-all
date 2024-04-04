import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Loader from "./Loader";
import clienteAxios from "../config/axios";
import useSurvey from "../hooks/useSurvey";
import { IoReturnUpBackOutline } from "react-icons/io5";
import CertificatePDF from "./CertificatePDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const CertificateData = () => {
  const { userSurvey, roles } = useSurvey();
  const { id } = useParams();
  const navigate = useNavigate();
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");

  const degreeOptions = [
    { value: "Sr.", label: "Sr." },
    { value: "Sra.", label: "Sra." },
    { value: "Dra.", label: "Dra." },
    { value: "Dr.", label: "Dr." },
    { value: "Lic.", label: "Lic." },
    { value: "PhD.", label: "PhD." },
  ];

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

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && (
            <>
              <div className="flex flex-col items-center justify-center h-[85vh] dark:bg-gray-800">
                <form className="w-full max-w-md p-5">
                  <div className="mb-4">
                    <label
                      htmlFor="degree"
                      className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    >
                      Mención académica
                    </label>
                    <select
                      id="degree"
                      name="degree"
                      value={degree}
                      onChange={handleDegreeChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-gray-200 dark:bg-gray-700 uppercase"
                    >
                      <option value="">Selecciona una opción</option>
                      {degreeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    >
                      Nombre para el certificado
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-gray-200 dark:bg-gray-700 uppercase"
                      placeholder="Ingresa tu nombre"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="flex rounded-xl items-center px-6 py-2  hover:bg-slate-400 hover:text-white hover:transition-all  bg-slate-200  text-black font-semibold my-5 "
                      onClick={handleReturn}
                    >
                      <IoReturnUpBackOutline className="mr-2" /> Volver
                    </button>

                    <div className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                      <PDFDownloadLink
                        document={
                          <CertificatePDF degree={degree} name={name} />
                        }
                        fileName="somename.pdf"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Cargando ..." : "Descargar Certificado"
                        }
                      </PDFDownloadLink>
                    </div>
                  </div>
                </form>
              </div>
              <div className="h-screen ">
                <PDFViewer className="h-screen w-full">
                  <CertificatePDF degree={degree} name={name} />
                </PDFViewer>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CertificateData;

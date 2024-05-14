import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import Loader from "../components/Loader";
import ResponseChart from "../components/ResponseChart";

const ReportSurvey = () => {
  const {
    questions,
    action,
    formData,
    getSurveyID,
    
  } = useSurvey();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const surveyID = async (id) => {
      const resultado = await getSurveyID(id);
      if (resultado) {
        setIsLoading(false);
      }
    };
    surveyID(id);
  }, [id]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ResponseChart formData={formData} questions={questions} />
      )}
    </>
  );
};

export default ReportSurvey;

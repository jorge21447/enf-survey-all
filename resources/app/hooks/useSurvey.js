import { useContext } from "react";
import SurveyContext from "../context/SurveyProvider";

const useSurvey = () => {
    return useContext(SurveyContext)
}

export default useSurvey
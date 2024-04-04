import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthLayout from "./layouts/AuthLayout";
import Index from "./views/Index";
import Users from "./views/Users";
import Surveys from "./views/Surveys";
import SurveyCreator from "./views/SurveyCreator";
import Reports from "./views/Reports";
import Pettycash from "./views/Pettycash";
import Settings from "./views/Settings";

// Con fines de testeo

import IndexAdmin from "./views/IndexAdmin";
import UsersEdit from "./views/UsersEdit";
import SurveyEditor from "./views/SurveyEditor";
import SurveysParticipate from "./views/SurveysParticipate";
import SurveyFill from "./views/SurveyFill";
import ReportSurvey from "./views/ReportSurvey";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage"
import EncuestadorLayout from "./layouts/EncuestadorLayout";
import AdministrativoLayout from "./layouts/AdministrativoLayout";
import Certificates from "./views/Certificates";
import CertificateData from "./components/CertificateData";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  
  {
    path: "/encuestador",
    element: <EncuestadorLayout />,
    children: [
      {
        index:true,
        element: <Surveys />,
      },
      {
        path: "/encuestador/surveys",
        element: <Surveys />,
      },
      {
        path: "/encuestador/surveys/create",
        element: <SurveyCreator />,
      },
      {
        path: "/encuestador/surveys/edit/:id",
        element: <SurveyEditor />,
      },
      {
        path: "/encuestador/surveysList",
        element: <SurveysParticipate />,
      },
      {
        path: "/encuestador/surveysList/fill/:id",
        element: <SurveyFill />,
      },
      {
        path: "/encuestador/reports",
        element: <Reports />,
      },
      {
        path: "/encuestador/reports/:id",
        element: <ReportSurvey />,
      },
      {
        path: "/encuestador/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SurveysParticipate />,
      },
      {
        path: "/user/surveys",
        element: <SurveysParticipate />,
      },
      {
        path: "/user/surveys/fill/:id",
        element: <SurveyFill />,
      },
      {
        path: "/user/reports",
        element: <Reports />,
      },
      {
        path: "/user/reports/:id",
        element: <ReportSurvey />,
      },
      
      {
        path: "/user/certificates",
        element: <Certificates />,
      },
      {
        path: "/user/certificates/:id",
        element: <CertificateData />,
      },
      {
        path: "/user/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/administrativo",
    element: <AdministrativoLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/administrativo/users",
        element: <Users />,
      },
      {
        path: "/administrativo/users/edit/:id",
        element: <UsersEdit />,
      },
      {
        path: "/administrativo/surveys",
        element: <Surveys />,
      },
      {
        path: "/administrativo/surveys/create",
        element: <SurveyCreator />,
      },
      {
        path: "/administrativo/surveys/edit/:id",
        element: <SurveyEditor />,
      },
      {
        path: "/administrativo/surveysList",
        element: <SurveysParticipate />,
      },
      {
        path: "/administrativo/surveysList/fill/:id",
        element: <SurveyFill />,
      },
      {
        path: "/administrativo/reports",
        element: <Reports />,
      },
      {
        path: "/administrativo/pettycash",
        element: <Pettycash />,
      },
      {
        path: "/administrativo/pettycash/create",
        element: <Pettycash />,
      },
      {
        path: "/administrativo/pettycash/edit/:id",
        element: <Pettycash />,
      },
      {
        path: "/administrativo/reports/:id",
        element: <ReportSurvey />,
      },
      {
        path: "/administrativo/settings",
        element: <Settings />,
      },
      { }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/users/edit/:id",
        element: <UsersEdit />,
      },
      {
        path: "/admin/surveys",
        element: <Surveys />,
      },
      {
        path: "/admin/surveys/create",
        element: <SurveyCreator />,
      },
      {
        path: "/admin/surveys/edit/:id",
        element: <SurveyEditor />,
      },
      {
        path: "/admin/reports",
        element: <Reports />,
      },
      {
        path: "/admin/reports/:id",
        element: <ReportSurvey />,
      },
      {
        path: "/admin/settings",
        element: <Settings />,
      },
    ],
  },
  
]);

export default router;

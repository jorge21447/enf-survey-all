import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DocenteLayout from "./layouts/DocenteLayout";
import AdministrativoLayout from "./layouts/AdministrativoLayout";
import EstudianteLayout from "./layouts/EstudianteLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthLayout from "./layouts/AuthLayout";
import Users from "./views/Users";
import Surveys from "./views/Surveys";
import SurveyCreator from "./views/SurveyCreator";
import Reports from "./views/Reports";
import Settings from "./views/Settings";

import UsersEdit from "./views/UsersEdit";
import SurveyEditor from "./views/SurveyEditor";
import SurveysParticipate from "./views/SurveysParticipate";
import SurveyFill from "./views/SurveyFill";
import ReportSurvey from "./views/ReportSurvey";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";

import CertificatesList from "./views/CertificatesList";
import CertificateData from "./components/CertificateData";
import Certificates from "./views/Certificates";
import UsersCertificate from "./components/UsersCertificate";
import PettyCashList from "./views/PettyCashList";
import UserNotActivated from "./views/UserNotActivated";
import ExpensesTable from "./components/ExpensesTable";
import ExpenseCreate from "./components/ExpenseCreate";
import EditPettyCashBox from "./components/EditPettyCashBox";
import PettyCashBox from "./views/PettyCashBox";
import ExpensesTableAdministrative from "./components/ExpensesTableAdministrative";
import PettyCashBoxRecord from "./components/PettyCashBoxRecord";
import RefillCreate from "./components/RefillCreate";

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
    path: "/teacher",
    element: <DocenteLayout />,
    children: [
      {
        index: true,
        element: <Surveys />,
      },
      {
        path: "/teacher/surveys",
        element: <Surveys />,
      },
      {
        path: "/teacher/surveys/create",
        element: <SurveyCreator />,
      },
      {
        path: "/teacher/surveys/edit/:id",
        element: <SurveyEditor />,
      },
      {
        path: "/teacher/surveysList",
        element: <SurveysParticipate />,
      },
      {
        path: "/teacher/surveysList/fill/:id",
        element: <SurveyFill />,
      },
      {
        path: "/teacher/reports",
        element: <Reports />,
      },
      {
        path: "/teacher/reports/:id",
        element: <ReportSurvey />,
      },
      {
        path: "/teacher/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/student",
    element: <EstudianteLayout />,
    children: [
      {
        index: true,
        element: <SurveysParticipate />,
      },
      {
        path: "/student/surveysList",
        element: <SurveysParticipate />,
      },
      {
        path: "/student/surveysList/fill/:id",
        element: <SurveyFill />,
      },
      {
        path: "/student/reports",
        element: <Reports />,
      },
      {
        path: "/student/reports/:id",
        element: <ReportSurvey />,
      },

      {
        path: "/student/certificatesList",
        element: <CertificatesList />,
      },
      {
        path: "/student/certificatesList/:id",
        element: <CertificateData />,
      },
      {
        path: "/student/settings",
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
        element: <PettyCashBox />,
      },
      {
        path: "/administrativo/pettycash/:id/record",
        element: <PettyCashBoxRecord />,
      },
      {
        path: "/administrativo/pettycash/:id/record/create",
        element: <RefillCreate />,
      },
      {
        path: "/administrativo/pettycash/:id/expenses",
        element: <ExpensesTableAdministrative />,
      },
      {
        path: "/administrativo/pettycash/:id/expenses/create",
        element: <ExpenseCreate />,
      },
      {
        path: "/administrativo/pettycash/:id/expenses/edit/:idE",
        element: <ExpenseCreate />,
      },
      {
        path: "/administrativo/reports/:id",
        element: <ReportSurvey />,
      },
      {
        path: "/administrativo/settings",
        element: <Settings />,
      },
      {},
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
        path: "/admin/certificates",
        element: <Certificates />,
      },
      {
        path: "/admin/certificates/:id",
        element: <UsersCertificate />,
      },
      {
        path: "/admin/certificates/user/:id",
        element: <CertificateData />,
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
        path: "/admin/pettycash",
        element: <PettyCashList />,
      },
      {
        path: "/admin/pettycash/edit/:id",
        element: <EditPettyCashBox />,
      },
      {
        path: "/admin/pettycash/:id/expenses",
        element: <ExpensesTable />,
      },
      {
        path: "/admin/pettycash/:id/expenses/create",
        element: <ExpenseCreate />,
      },
      {
        path: "/admin/pettycash/:id/expenses/edit/:idE",
        element: <ExpenseCreate />,
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
  {
    path: "/not-activated",
    element: <UserNotActivated />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;

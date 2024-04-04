import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Header from "../components/Header/Index";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSurvey from "../hooks/useSurvey";
import NotAuthorized from "../views/NotAuthorized";

const Layout = () => {
  const { userSurvey, modalUser, changeStateModalUser } = useSurvey();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!userSurvey || !Object.keys(userSurvey).length) {
    return <NotAuthorized />;
  }


  return (
    <>
      {userSurvey &&
      userSurvey.role &&
      userSurvey.role.name === "Participante" ? (
        <>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <div className="relative flex flex-1 bg-gray-50 min-h-screen dark:bg-gray-900 flex-col overflow-y-auto overflow-x-hidden">
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <main className="bg-gray-50 h-screen dark:bg-gray-900">
                  <div className="mx-auto bg-gray-50 dark:bg-gray-900 max-w-screen-2xl p-4 md:p-6 2xl:p-6">
                    <Outlet />
                  </div>
                </main>
              </div>
            </div>
          </div>

          <ToastContainer />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default Layout;

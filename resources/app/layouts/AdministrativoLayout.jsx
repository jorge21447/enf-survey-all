import SidebarAdmin from "../components/SidebarAdmin";
import { useState } from "react";
import Header from "../components/Header/Index";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserModal from "../components/UserModal";
import useSurvey from "../hooks/useSurvey";
import NotAuthorized from "../views/NotAuthorized";
import PettyCashBoxExpenseModal from "../components/PettyCashBoxExpenseModal";
import ShareSurveyModal from "../components/ShareSurveyModal";

const AdministrativoLayout = () => {
  const {
    userSurvey,
    modalUser,
    modalPettyCashExpense,
    modalPettyCashHistory,
    modalShareSurvey,
  } = useSurvey();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!userSurvey || !Object.keys(userSurvey).length) {
    return <NotAuthorized />;
  }

  const customStyles2 = {
    overlay: {
      zIndex: 200,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      border: "none",
    },
  };
  const customStyles = {
    overlay: {
      zIndex: 200,
    },
    content: {
      position: "absolute",
      background: "none",
      overflow: "auto",
      border: "none",
    },
  };

  Modal.setAppElement("#root");

  return (
    <>
      {userSurvey &&
      userSurvey.role &&
      userSurvey.role.name === "Administrativo" ? (
        <>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
              <SidebarAdmin
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <div className="relative flex flex-1 min-h-screen dark:bg-gray-900  flex-col overflow-y-auto overflow-x-hidden">
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <main className="bg-gray-50 h-screen   dark:bg-gray-900">
                  <div className="mx-auto min-h-screen">
                    <Outlet />
                  </div>
                </main>
              </div>
            </div>
          </div>

          <Modal isOpen={modalUser} style={customStyles}>
            <UserModal />
          </Modal>

          <Modal isOpen={modalPettyCashExpense} style={customStyles2}>
            <PettyCashBoxExpenseModal />
          </Modal>

          <Modal isOpen={modalPettyCashHistory} style={customStyles2}>
            <PettyCashBoxExpenseModal />
          </Modal>

          <Modal isOpen={modalShareSurvey} style={customStyles}>
            <ShareSurveyModal />
          </Modal>

          <ToastContainer />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default AdministrativoLayout;

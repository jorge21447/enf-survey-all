import { useEffect, useState } from "react";
import { useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CryptoJS from "crypto-js";

// React icons
import { RiMenuLine } from "react-icons/ri";

import { IoLogOutOutline } from "react-icons/io5";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiSurveyLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi";
import { TbUserCircle } from "react-icons/tb";
import { TbReportMoney } from "react-icons/tb";

// Img
import LogoIcon from "../assets/logo-enf.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const [storedUser, setStoreUser] = useState({});
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const informacionDesencriptada = CryptoJS.AES.decrypt(
        localStorage.getItem("user"),
        "@enf_survey"
      );
      const usuarioJSON = informacionDesencriptada.toString(CryptoJS.enc.Utf8);
      setStoreUser(JSON.parse(usuarioJSON));
    }
  }, []);
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      <div
        ref={sidebar}
        className={` bg-white dark:bg-[#182235]  border-b border-slate-200 dark:border-slate-700 text-gray shadow-xl    h-full 
        transition-all duration-200 ease-in-out  flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 lg:w-16 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0  ${
          sidebarExpanded ? "lg:w-64" : "lg:w-16"
        }  ${sidebarOpen ? "translate-x-0" : "-translate-x-72"}`}
      >
        {/* Header del sidebar */}

        <div className=" max-h-16 h-full flex items-center align-middle gap-2.5  whitespace-pre  font-medium border-b border-slate-300  mx-3 dark:border-slate-500">
          <div className="flex gap-2">
            <div className="flex gap-2.5  whitespace-pre ">
              <img src={LogoIcon} alt="Logo" className=" w-9" />
              <div
                className={`my-auto block  2xl:block ${
                  sidebarExpanded ? "" : "lg:hidden"
                }`}
              >
                <p className="text-sm font-bold  leading-none pt-1 uppercase">
                  Carrera de Enfermería
                </p>

                <small>Sistema de Encuestas</small>
              </div>
            </div>
            
            <button
              ref={trigger}
              className="lg:hidden text-slate-500 hover:text-slate-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <RiMenuLine size={25} />
            </button>
            
          </div>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden   ]">
          {storedUser && storedUser?.role?.name == "Administrador" ? (
              <>
                <li>
                  <NavLink
                    to={"/admin"}
                    end
                    className=" p-2.5 theme1 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <BiHomeAlt2 size={23} className="min-w-max" />
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/admin/surveys"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <RiSurveyLine size={23} className="min-w-max" />
                    Encuestas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/admin/certificates"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <PiCertificate size={23} className="min-w-max" />
                    Certificados
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/admin/users"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <TbUserCircle size={23} className="min-w-max" />
                    Usuarios
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/admin/reports"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <HiOutlineDocumentReport size={23} className="min-w-max" />
                    Reportes
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/admin/pettycash"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <TbReportMoney size={23} className="min-w-max" />
                    Caja Chica
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/admin/settings"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <AiOutlineSetting size={23} className="min-w-max" />
                    Ajustes
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}

            {storedUser && storedUser?.role?.name == "Administrativo" ? (
              <>
                <li>
                  <NavLink
                    to={"/administrativo"}
                    end
                    className=" p-2.5 theme1 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <BiHomeAlt2 size={23} className="min-w-max" />
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/administrativo/surveys"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <RiSurveyLine size={23} className="min-w-max" />
                    Encuestas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/administrativo/users"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <TbUserCircle size={23} className="min-w-max" />
                    Usuarios
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/administrativo/reports"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <HiOutlineDocumentReport size={23} className="min-w-max" />
                    Reportes
                  </NavLink>
                </li>

                {storedUser && storedUser.hasPettyCashBox ? (
                  <li>
                    <NavLink
                      to={"/administrativo/pettycash"}
                      className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                      style={({ isActive, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          color: isActive ? "white" : "",
                          background: isActive ? "#1242bf" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                    >
                      <TbReportMoney size={23} className="min-w-max" />
                      Caja Chica
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <NavLink
                    to={"/administrativo/settings"}
                    className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "",
                        background: isActive ? "#1242bf" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                  >
                    <AiOutlineSetting size={23} className="min-w-max" />
                    Ajustes
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-5 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className={`${
                  sidebarExpanded ? "rotate-180" : ""
                } w-6 h-6 fill-current sidebar-expanded:rotate-180`}
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex text-sm z-50    whitespace-pre   w-full  py-5 justify-end ">
          <div className="flex border-y w-full border-slate-300  items-center px-2.5">
            <button
              type="button"
              className="flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium w-full  bg-white dark:bg-[#182235] dark:text-white dark:hover:bg-red-500 p-3  text-black hover:bg-red-500  hover:text-white hover:font-bold"
              onClick={logout}
            >
              {" "}
              <IoLogOutOutline size={23} className="" />
              <p className={`${sidebarExpanded ? "" : "lg:hidden"} 2xl:block`}>
                Cerrar Sesion
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

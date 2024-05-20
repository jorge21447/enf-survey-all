import  { useState, useEffect } from "react";
import useSurvey from "../hooks/useSurvey";
import { MdClose, MdContentCopy } from "react-icons/md";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ShareSurveyModal = () => {
  const [copied, setCopied] = useState(false);
  const { changeStateModalShareSurvey, surveySelected } = useSurvey();

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(shareLink);
    toast.success("Enlace copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const shareLink = `${baseUrl}/user/surveysList/fill/${surveySelected}`;


  return (
    <>
      <div className="z-[100] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full h-full">
        <div
          className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-10"
          onClick={changeStateModalShareSurvey}
        ></div>

        <div className="relative p-4 w-full max-w-lg md:max-w-2xl max-h-full z-20">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-white">
                Compartir Encuesta
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={changeStateModalShareSurvey}
              >
                <MdClose size={20} />
                <span className="sr-only">Cerrar</span>
              </button>
            </div>

            <div className="flex flex-col items-center space-y-6 md:p-5 md:pb-0">
              <div className="flex space-x-2  md:space-x-8">
                <div className="flex flex-col items-center">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      shareLink
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-blue-700"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
                      <FaWhatsapp size={25} />
                    </div>
                  </a>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                    WhatsApp
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href={`https://telegram.me/share/url?url=${encodeURIComponent(
                      shareLink
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-blue-700"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
                      <FaTelegramPlane size={25} />
                    </div>
                  </a>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                    Telegram
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href={`mailto:?subject=Encuesta&body=${encodeURIComponent(
                      shareLink
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-blue-700"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
                      <FaEnvelope size={25} />
                    </div>
                  </a>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                    Correo
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareLink
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-blue-700"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
                      <FaFacebookF size={25} />
                    </div>
                  </a>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                    Facebook
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareLink
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-blue-700"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
                      <FaTwitter size={25} />
                    </div>
                  </a>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                    Twitter
                  </span>
                </div>
              </div>

              <div className="items-center flex ">
                <p className="text-gray-700 dark:text-gray-300  text-lg">
                  O copiar enlace
                </p>
              </div>
              <div className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4">
                
                <div className="flex-grow">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <button
                  onClick={handleCopyLink}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-800  "
                >
                  <MdContentCopy size={20} />
                  <span>{copied ? "Copiado!" : "Copiar Enlace"}</span>
                </button>
              </div>
              <div className="border-t w-full flex dark:border-gray-600  pt-4">
                <div className="flex justify-center w-full">
                  <button
                    type="button"
                    className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      changeStateModalShareSurvey();
                    }}
                  >
                    <MdClose className="mr-1 -ml-1 w-5 h-5" />
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareSurveyModal;

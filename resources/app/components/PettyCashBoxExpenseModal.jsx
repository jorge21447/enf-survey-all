import React from "react";
import useSurvey from "../hooks/useSurvey";
import PettyCashBoxPDF from "./PettyCashBoxPDF";

const PettyCashBoxExpenseModal = () => {
  const { changeStateModalPettyCashExpense, expenseSelected } = useSurvey();


  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-800 border-gray-300 border-2 shadow-lg rounded-lg dark:border-gray-600">
        <div className="flex justify-between items-center pb-3">
          <p className="font-bold uppercase text-2xl text-gray-900 dark:text-gray-100">
            PDF GASTO
          </p>
          <button onClick={changeStateModalPettyCashExpense} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-rose-700 dark:text-rose-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="md:h-[37rem] md:w-[50rem] h-[30rem] overflow-hidden relative overflow-y-auto text-gray-800 dark:text-gray-100">
          <PettyCashBoxPDF expenseSelected={expenseSelected}/>
        </div>
      </div>
    </>
  );
};

export default PettyCashBoxExpenseModal;

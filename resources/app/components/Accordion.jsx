import { useState } from 'react';

const Accordion = ({ title, onChanges, expanded = false, children }) => {


  return (
    <div className="border rounded shadow-md mb-5">
      <div className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-200" onClick={onChanges}>
        <h3 className="text-lg font-bold">{title}</h3>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5 5-5" />
        </svg>
      </div>
      <div className={`px-4 py-4 ${expanded ? 'block' : 'hidden'} w-full`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
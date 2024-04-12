import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import UserDefault from "../../assets/userDefault.png";

import { useAuth } from "../../hooks/useAuth";
import useSurvey from "../../hooks/useSurvey";

function DropdownProfile({ align }) {
  const { logout } = useAuth();
  const {userSurvey, roles} = useSurvey()

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);


  // Cierra si sales del div
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Cierra si se presionar ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={userSurvey?.photo_profile ? userSurvey.photo_profile : UserDefault}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
          Bienvenido,  {userSurvey?.name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>
      <div
        className={` ${dropdownOpen? '' : 'hidden'}
        origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'} ` }
      >
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
      >
        <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
          <div className="font-medium text-slate-800 dark:text-slate-100">
          {userSurvey?.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 italic">
            {userSurvey?.role?.name}
          </div>
        </div>
        <ul>
          <li>
            <Link
              className="font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-600 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 flex items-center py-1 px-3"
              to={`/${roles[userSurvey.role.name]}/settings`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Ajustes
            </Link>
          </li>
          <li>
            <Link
              className="font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-600 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 flex items-center py-1 px-3"
              
              onClick={logout}
            >
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>

      </div>
    </div>
  );
}

export default DropdownProfile;

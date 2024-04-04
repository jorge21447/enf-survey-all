import { useState, useRef, useEffect } from "react";

const HeadForm = ({
  hasEditAccess,
  title,
  description,
  onInputChange,
  colorSS = "default",
  colors
}) => {
  const textareaRef = useRef(null);
  const { background, text, border } = colors[colorSS];
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [title]);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    };

    const handleResize = () => {
      adjustHeight();
    };

    window.addEventListener('resize', handleResize);
    adjustHeight(); // Ajustar la altura inicial
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`${isInputFocused ? 'ring-teal-300 ring-4 ' : ''} rounded-3xl border-l-[40px]  ${background} text-${text} px-6 shadow ${border}`}
    >
      <div className="space-y-2 pt-6 pb-6">
        <textarea
          className={`w-full resize-none disabled:hover:ring-0 hover:ring-1 font-bold font-mont hover:ring-slate-300 py-3 text-3xl outline-none  placeholder-slate-300   p-4 ${background} text-${text} focus:outline-none focus:ring-teal-300 focus:ring-2 focus:text-teal-300 rounded-lg`}
          disabled={!hasEditAccess}
          ref={textareaRef}
          name="title"
          onChange={onInputChange}
          placeholder="Título"
          value={title}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          rows={1}
        />
        <textarea
          className={`h-auto disabled:hover:ring-0 w-full rounded-lg resize-y hover:ring-1  font-mont placeholder-slate-300 py-2 hover:ring-gray-300 focus:outline-none focus:ring-teal-300 focus:ring-2 ${background} text-${text} p-4 `}
          disabled={!hasEditAccess}
          name="description"
          onChange={onInputChange}
          placeholder="Descripción"
          value={description}
          
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        ></textarea>
      </div>

    </div>
  );
};

export default HeadForm;

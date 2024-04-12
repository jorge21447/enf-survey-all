
const SurveyError = () => {
  return (
    <div className="bg-gray-100 rounded-xl dark:bg-slate-800 text-gray-800 dark:text-white flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl font-bold">Error de Encuesta</div>
      <div className="mt-4 text-lg">
        No puedes responder esta encuesta.
      </div>
    </div>
  );
};

export default SurveyError;

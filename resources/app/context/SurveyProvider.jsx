import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [userSurvey, setUserSurvey] = useState({});

  const token = localStorage.getItem("AUTH_TOKEN");

  const [modalUser, setModalUser] = useState(false);
  const [modalPettyCash, setModalPettyCash] = useState(false);
  const [modalPettyCashExpense, setModalPettyCashExpense] = useState(false);
  const [modalPettyCashHistory, setModalPettyCashHistory] = useState(false);
  const [modalShareSurvey, setModalShareSurvey] = useState(false);

  const [expenseSelected, setExpenseSelected] = useState({});
  const [surveySelected, setSurveySelected] = useState('');

  const [formData, setFormData] = useState({ title: "", description: "" });

  const [filtrado, setFiltrado] = useState("");

  const [questions, setQuestions] = useState([]);
  const [loadingFormData, setLoadingFormData] = useState(true);

  const [colorSS, setColorSS] = useState("default");
  const [hasEditAccess, setHasEditAccess] = useState(true);

  const [error404, setError404] = useState(false);

  const roles = {
    Administrador: "admin",
    Docente: "user",
    Administrativo: "administrativo",
    Estudiante: "user",
    'Docente Asistencial': "user",
  };

  // Funcione para cambiar el valor de los modal
  const changeStateModalUser = () => {
    setModalUser(!modalUser);
  };

  const changeStateModalPettyCash = () => {
    setModalPettyCash(!modalPettyCash);
  };

  const changeStateModalPettyCashExpense = () => {
    setModalPettyCashExpense(!modalPettyCashExpense);
  };

  const changeStateModalPettyCashHistory = () => {
    setModalPettyCashHistory(!modalPettyCashHistory);
  };

  const changeStateModalShareSurvey = () => {
    setModalShareSurvey(!modalShareSurvey);
  };


  ////////////////////////////////////
  // CONSULTAS PARA LOS USUARIOS
  ////////////////////////////////////

  const createUser = async (datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/users/`, datos, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      changeStateModalUser();
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
    }
  };

  const editUser = async (datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(
        `/api/users/${datos.get("id")}`,
        datos,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${data?.message}`, {
        position: "top-right",
      });

      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
    }
  };

  const deleteUser = async (name, id) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar al usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1242bf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await clienteAxios.delete(`/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: "¡Usuario eliminado!",
            text: data?.message,
            icon: "success",
          });
          toast.success(`${data?.message}`, {
            position: "top-right",
          });
        } catch (error) {
          Swal.fire({
            title: "¡Error al eliminar el usuario!",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  ////////////////////////////////////
  // ACCIONES PARA LAS ENCUESTAS
  ////////////////////////////////////

  const colors = {
    default: {
      background: "bg-gray-700",
      text: "white",
      border: "border-gray-900",
    },
    c1: {
      background: "bg-orange-600",
      text: "white",
      border: "border-orange-500",
    },
    c2: {
      background: "bg-teal-700",
      text: "white",
      border: "border-gray-900",
    },
  };

  const action = {
    addInputType(inputType) {
      action.expandCloseAll();
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          questionTitle: "",
          withDescription: false,
          type: inputType,
          options:
            inputType === "rating" || inputType === "boolean"
              ? arrayData(inputType)
              : [],
          respondents: [],
          open: true,
          require: false,
        },
      ]);
    },

    duplicateQuestion(i, targetIndex) {
      const newQuestion = {
        ...questions[i],
        options: questions[i].options,
      };

      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(targetIndex, 0, newQuestion); // Insertar en targetIndex
        return updatedQuestions;
      });
    },

    addQuestion(targetIndex) {
      const newQuestions = [...questions];
      newQuestions.splice(targetIndex, 0, {
        questionTitle: "",
        type: "text",
        options: [],
        respondents: [],
        open: true,
        require: false,
      });
      setQuestions(newQuestions);
    },

    deleteQuestion(i) {
      setQuestions((prevQuestions) => {
        const newQuestions = prevQuestions.filter((_, index) => index !== i);
        if (newQuestions.length === 0) {
          toast.error("La encuesta debe contar con al menos 1 pregunta.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return prevQuestions;
        }
        newQuestions[newQuestions.length - 1].open = true;
        return newQuestions;
      });
    },

    onTitleQuestionChange(text, i) {
      var optionsOfQuestion = [...questions];
      optionsOfQuestion[i].questionTitle = text;
      setQuestions(optionsOfQuestion);
    },

    changeQuestionType(targetIndex, type) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question, index) => {
          if (index === targetIndex) {
            if (type === "rating" || type === "boolean") {
              return { ...question, type, options: arrayData(type) };
            }
            return { ...question, type, options: [] };
          } else {
            return question;
          }
        })
      );
    },

    addOption(targetIndex) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question, index) => {
          if (index === targetIndex) {
            return { ...question, options: [...question.options, ""] };
          } else {
            return question;
          }
        })
      );
    },

    setOptionName(targetIndex, optionIndex, value) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question, index) => {
          if (index === targetIndex) {
            return {
              ...question,
              options: question.options.map((option, optIndex) =>
                optIndex === optionIndex ? value : option
              ),
            };
          } else {
            return question;
          }
        })
      );
    },

    showAsQuestion(i) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[i].open = false;
        return updatedQuestions;
      });
    },

    removeOption(targetIndex, optionIndex) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question, index) => {
          if (index === targetIndex) {
            return {
              ...question,
              options: question.options.filter(
                (_, optIndex) => optIndex !== optionIndex
              ),
            };
          } else {
            return question;
          }
        })
      );
    },

    expandCloseAll() {
      setQuestions((questions) =>
        questions.map((question) => ({
          ...question,
          open: false,
        }))
      );
    },

    handleExpand(i) {
      setQuestions((questions) => {
        return questions.map((question, index) => ({
          ...question,
          //open: index === i ? !question.open : false,
          open: index === i ? true : false,
        }));
      });
    },

    addMoreQuestionField() {
      action.expandCloseAll();

      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          questionTitle: "",
          withDescription: false,
          type: "text",
          options: [],
          respondents: [],
          open: true,
          require: false,
        },
      ]);
    },

    responseQuestion(targetIndex, value) {
      const newData = [...questions];

      const response = {
        user_id: userSurvey?.id,
        user_name: userSurvey?.name,
        response: value,
        createdAt: new Date(Date.now()).toISOString(),
      };

      const respondentIndex = newData[targetIndex].respondents.findIndex(
        (el) => el.user_id === userSurvey?.id
      );

      if (respondentIndex === -1)
        newData[targetIndex].respondents.push(response);
      else newData[targetIndex].respondents[respondentIndex] = response;

      setQuestions([...questions]);
    },

    clearUserResponses(userId) {
      const newData = questions.map((question) => {
        // Filtra las respuestas del usuario actual
        const filteredRespondents = question.respondents.filter(
          (respondent) => respondent.user_id !== userId
        );

        // Devuelve una nueva pregunta con las respuestas filtradas
        return {
          ...question,
          respondents: filteredRespondents,
        };
      });

      // Actualiza el estado de las preguntas
      setQuestions(newData);
    },
  };

  function onHeadFormInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const arrayData = (label) => {
    const labels = {
      rating: [
        "Totalmente en desacuerdo",
        "En desacuerdo",
        "Ni de acuerdo ni en desacuerdo",
        "De acuerdo",
        "Totalmente de acuerdo",
      ],
      boolean: ["Si", "No"],
    };
    return labels[label] || [];
  };

  ////////////////////////////////////
  // CONSULAS PARA LAS ENCUESTAS
  ////////////////////////////////////

  const deleteSurvey = async (name, id) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar la encuests '${name}'?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1242bf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await clienteAxios.delete(`/api/surveys/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: "¡Encuesta eliminado!",
            text: data?.message,
            icon: "success",
          });
          toast.success(`${data?.message}`, {
            position: "top-right",
          });
        } catch (error) {
          Swal.fire({
            title: "¡Error al eliminar la encuesta!",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  const submitSurvey = async (datos) => {
    if (!datos.title) {
      toast.error(`No hay título`, {
        position: "bottom-center",
      });
      return;
    }
    if (!datos.questions.length) {
      toast.error(`No hay preguntas`, {
        position: "bottom-center",
      });
      return;
    }
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/surveys/new`, datos, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      setFormData({ title: "", description: "" });
      setQuestions([]);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.errors}`, {
        position: "top-right",
      });
    }
  };

  const editSurvey = async (datos) => {
    if (!datos.title) {
      toast.error(`No hay título`, {
        position: "bottom-center",
      });
      return;
    }
    if (datos.questions.length < 1) {
      toast.error(`No hay preguntas`, {
        position: "bottom-center",
      });
      return;
    }
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(
        `/api/surveys/edit/${datos.id}`,
        datos,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      setFormData({ title: "", description: "" });
      setQuestions([]);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.errors}`, {
        position: "top-right",
      });
    }
  };

  const getSurveyID = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.get(`/api/surveys/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(data[0]);
      setQuestions(data[0].questions);
      return data[0];
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, {
        position: "top-right",
      });
    }
  };

  const getSurveyFillID = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.get(`/api/surveys/fill/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(data[0]);
      setQuestions(data[0].questions);
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        setError404(true);
      } else {
        toast.error(`${error?.response?.data?.errors}`, {
          position: "top-right",
        });
      }
    }
  };

  // RESPUESTAS DEL SURVEY DESDE USUARIO
  const submitSurveyResponses = async (datos) => {
    if (!datos.comment) {
      toast.error(`Comentario vacio`, {
        position: "bottom-center",
      });
      return;
    }
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/responses/new`, datos, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({ title: "", description: "" });
      setQuestions([]);

      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true;
    } catch (error) {
      console.log(error);
      if (error) {
        error?.response?.data?.errors?.map((err, i) => {
          toast.error(`${(i, err)}`, {
            position: "top-right",
          });
        });
      }
    }
  };

  // CAJA CHICA
  const createPettyCash = async (datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/pettycashbox/new`, datos, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      changeStateModalPettyCash();
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
      return false;
    }
  };

  const editPettyCashBox = async (datos, setErrores, id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.put(`/api/pettycashbox/${id}`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
      return false;
    }
  };



  const deletePettyCashBox = async (id, onSucess) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar la caja chica?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1242bf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await clienteAxios.delete(`/api/pettycashbox/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: "Caja Chica eliminada!",
            text: data?.message,
            icon: "success",
          });
          toast.success(`${data?.message}`, {
            position: "top-right",
          });
          onSucess()
        } catch (error) {
          Swal.fire({
            title: "¡Error al eliminar la Caja Chica!",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  ////////////////////////////////////
  // GASTOS
  ////////////////////////////////////

  const createExpense = async (datos, setErrores, id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/expenses/new/${id}`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
      return false;
    }
  };


  const editExpense = async (datos, setErrores, id) => {

    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.put(`/api/expenses/${id}`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
      return false;
    }
  };

  const deleteExpense = async (id, onSucess) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar el gasto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1242bf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await clienteAxios.delete(`/api/expenses/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: "Gasto eliminado!",
            text: data?.message,
            icon: "success",
          });
          toast.success(`${data?.message}`, {
            position: "top-right",
          });
          onSucess()
        } catch (error) {
          Swal.fire({
            title: "¡Error al eliminar el gasto!",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  const createRefill = async (datos, setErrores, id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/refills/new/${id}`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
      return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const informacionDesencriptada = CryptoJS.AES.decrypt(
        localStorage.getItem("user"),
        "@enf_survey"
      );
      const usuarioJSON = informacionDesencriptada.toString(CryptoJS.enc.Utf8);
      setUserSurvey(JSON.parse(usuarioJSON));
    }
  }, []);

  return (
    <SurveyContext.Provider
      value={{
        deleteUser,
        createUser,
        editUser,
        modalUser,
        modalPettyCash,
        modalPettyCashExpense,
        modalPettyCashHistory,
        modalShareSurvey,
        changeStateModalPettyCash,
        changeStateModalUser,
        changeStateModalPettyCashExpense,
        changeStateModalPettyCashHistory,
        changeStateModalShareSurvey,
        action,
        colors,
        colorSS,
        formData,
        questions,
        loadingFormData,
        onDragEnd,
        onHeadFormInputChange,
        hasEditAccess,
        submitSurvey,
        deleteSurvey,
        getSurveyID,
        editSurvey,
        filtrado,
        setFiltrado,
        submitSurveyResponses,
        userSurvey,
        setUserSurvey,
        roles,
        getSurveyFillID,
        createPettyCash,
        editPettyCashBox,
        deletePettyCashBox,
        createExpense,
        editExpense,
        deleteExpense,
        setExpenseSelected,
        expenseSelected,
        createRefill,
        setSurveySelected,
        surveySelected,
        error404,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyContext;
export { SurveyProvider };

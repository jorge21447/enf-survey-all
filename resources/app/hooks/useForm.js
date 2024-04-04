import { useEffect, useState, useCallback } from "react"
import useSWR from 'swr'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"


export const useForm = () => {

    const { id } = useParams()

    const [userSurvey, setUserSurvey] = useState(JSON.parse(localStorage.getItem("usuario")) || "")


    const token = localStorage.getItem("AUTH_TOKEN");

    const [formData, setFormData] = useState({ title: "", description: "" });


    const [questions, setQuestions] = useState([]);

    const [colorSS, setColorSS] = useState("c2");

    const location = useLocation();


  
    const hasEditAccess = false



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
                (el) => el.user_id === userSurvey?.id,
            );

            if (respondentIndex === -1) newData[targetIndex].respondents.push(response);
            else newData[targetIndex].respondents[respondentIndex] = response;

            console.log('Dentro de funcion', newData)

            setQuestions([ ...newData]);
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
                "Option 1",
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
            setFormData({ title: "", description: "" })
            setQuestions([])
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
            const { data } = await clienteAxios.post(`/api/surveys/edit/${datos.id}`, datos, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(`${data?.message}`, {
                position: "top-right",
            });
            setFormData({ title: "", description: "" })
            setQuestions([])
            return true;
        } catch (error) {
            console.log(error);
            toast.error(`${error?.response?.data?.errors}`, {
                position: "top-right",
            });
        }
    };

    

    const getSurveyID = useCallback(async () => {
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
            console.log('dentor de ger', questions)
            return true;
        } catch (error) {
            console.log(error);
            toast.error(`${error?.response?.data?.errors}`, {
                position: "top-right",
            });
            return false;
        }
    }, [id]);
    
    useEffect(() => {
        getSurveyID();
        return () => setFormData({ title: '', description: '', questions: [] });
      }, [getSurveyID]);


    return {

        action,
        colors,
        colorSS,
        formData,
        questions,
        onDragEnd,
        onHeadFormInputChange,
        hasEditAccess,
        submitSurvey,
        deleteSurvey,
        getSurveyID,
        editSurvey,
    }
}

export default useForm
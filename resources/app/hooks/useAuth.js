import useSWR from 'swr'
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"
import CryptoJS from "crypto-js"
import useSurvey from "./useSurvey"

export const useAuth = () => {
    const { setUserSurvey } = useSurvey()
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()


    const { data: user, error, mutate } = useSWR('/api/user', () => (
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    ), {
        refreshInterval: 0,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    })

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)

            if (data.user.is_active == '0') {
                navigate('/not-activated')
                return
            }

            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data.user), '@enf_survey');
            localStorage.setItem('user', encryptedData)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setUserSurvey(data.user)
            setErrores([])
            await mutate()


            if (data.user.role.name == 'Administrador') {
                navigate('/admin')
            }
            if (data.user.role.name == 'Administrativo') {
                navigate('/administrativo')
            }
            if (data.user.role.name == 'Docente') {
                navigate('/teacher')
            }

            if (data.user.role.name == 'Estudiante') {
                navigate('/student')
            }


        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors || []))
        }
    }

    const register = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/register', datos)


            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data.user), '@enf_survey');
            localStorage.setItem('user', encryptedData)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setUserSurvey(data.user)
            setErrores([])
            await mutate()

            toast.success(`${data?.message}`, {
                position: "top-right",
            });
            setTimeout(() => {
                // Redirigir a la página deseada después de un breve retraso
                if (data.user.role.name == 'Administrador') {
                    navigate('/admin')
                }
                if (data.user.role.name == 'Administrativo') {
                    navigate('/administrativo')
                }
                if (data.user.role.name == 'Docente') {
                    navigate('/teacher')
                }
                if (data.user.role.name == 'Estudiante') {
                    navigate('/student')
                }
            }, 3000); // Cambiar el tiempo según sea necesario
        } catch (error) {
            // toast.error(`${error}`, {
            //     position: "top-right",
            // });
            setErrores(Object.values(error?.response?.data?.errors || []))
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

    }

    const logout = async () => {

        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            localStorage.removeItem('user')
            await mutate(undefined)
            navigate('/')
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    return {
        login,
        register,
        logout,
        user,
        error
    }
}

export default useAuth
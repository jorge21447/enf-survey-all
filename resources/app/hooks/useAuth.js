import { useEffect, useState } from "react"
import useSWR from 'swr'
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"
import CryptoJS from "crypto-js"

export const useAuth = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const [respuesta, setRespuesta] = useState('')

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
    ))

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)


            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data.user), '@enf_survey');
            localStorage.setItem('user', encryptedData)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()


            if (data.user.role.name == 'Administrador') {
                navigate('/admin')
            }

            if (data.user.role.name == 'Encuestador') {
                navigate('/encuestador')
            }

            if (data.user.role.name == 'Participante') {
                navigate('/user')
            }


        } catch (error) {
            console.log(error)
            setErrores(Object.values(error.response?.data?.errors || []))
        } finally {
            //setCargando(false)
        }
    }

    const register = async (datos, setErrores) => {
        try {
            //setCargando(true);
            const { data } = await clienteAxios.post('/api/register', datos)


            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data.user), '@enf_survey');
            localStorage.setItem('user', encryptedData)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
            console.log(data)

            toast.success(`${data?.message}`, {
                position: "top-right",
            });
            setTimeout(() => {
                // Redirigir a la página deseada después de un breve retraso
                if (data.user.role.name == 'Administrador') {
                    navigate('/admin')
                }

                if (data.user.role.name == 'Encuestador') {
                    navigate('/encuestador')
                }

                if (data.user.role.name == 'Participante') {
                    navigate('/user')
                }
            }, 4000); // Cambiar el tiempo según sea necesario
        } catch (error) {
            toast.error(`${error}`, {
                position: "top-right",
            });
            setErrores(Object.values(error?.response?.data?.errors || []))
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
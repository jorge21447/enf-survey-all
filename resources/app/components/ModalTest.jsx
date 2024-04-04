
import useSurvey from "../hooks/useSurvey";

const ModalTest = () => {
    const { modalUser, changeStateModalUser } = useSurvey();

    return (

        <>
            <div className="flex justify-between items-center pb-3">
                <p className='font-bold uppercase text-2xl'>Edita una respuestaAgrega una nueva respue</p>
                <button onClick={changeStateModalUser}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-rose-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <div className='md:h-[37rem] md:w-[50rem] h-[30rem] overflow-hidden relative overflow-y-auto'>
            </div>

        </>

    )
}

export default ModalTest
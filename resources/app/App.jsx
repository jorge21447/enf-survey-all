import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import QuestionsTab from "./components/QuestionsTab";
function App() {
  
  const [formDetails, setFormDetails] = useState({});
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''></div>
    <QuestionsTab formData={formDetails} />
    </>
  )
}

export default App

import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';


function App() {
  const [currentForm,setCurrentForm]=useState('login')
  return(
    <div className='App'>
         {currentForm === 'login' ? <LoginPage/> : <SignupPage />}
    </div>
   
    
  )
  
}

export default App;

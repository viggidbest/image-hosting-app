import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import {
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import UserPage from './components/UserPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/signup" element={<SignupPage/>} />
    <Route path="/user-page" element={<UserPage/>} />
    
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

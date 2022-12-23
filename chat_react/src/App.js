import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import LogoutPage from './pages/LogoutPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function BasicExample() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<JoinPage/>}></Route>
      <Route path='/logout' element={<LogoutPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default BasicExample;
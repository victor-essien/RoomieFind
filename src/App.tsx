import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Appe from './Page'
import Login from './pages/Login';
import Signup from './pages/SignUp';

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  
    </>
  )
}

export default App

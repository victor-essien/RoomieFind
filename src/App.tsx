import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Appe from './Page'
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Discover from './pages/Discover';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/discover' element={<Discover />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/profile' element={<Profile />}/>
      <Route path='/homee' element={<Appe />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/onboarding' element={<Onboarding />} />
    </Routes>
  
    </>
  )
}

export default App


import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AppContext);
  

  const login = () => {
    if(isLoggedIn){
      navigate('/');
      toast.info('You are already logged in.');
      return;
    }
    navigate('/login');
  }

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center
    text-gray-800'>
        <img src={assets.header_img} alt="" 
        className='w-36 h-36 rounded-full mb-6'/>

        <h1 className='flex items-center gap-2 text-5xl sm:text-3xl md:text-7xl
        font-bold mb-2'>Hey <span className='text-blue-700'>{userData ? userData.name : 'User'}!</span>
            <img src={assets.hand_wave} alt="" 
            className='w-8 aspect-square'/>
        </h1>

        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to Our Web App</h2>
        <p className='mb-8 max-w-md'>Let's start with a quick product tour and we will get you up and running in no time!</p>
        <button onClick={login} className='border border-gray-500 rounded-full px-8 py-2.5
        hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header
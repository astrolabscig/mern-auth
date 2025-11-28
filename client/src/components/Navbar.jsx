// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

//     const logout = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const { data } = await axios.post(backendUrl + '/api/auth/logout');
//         if(data.success) {
//           setIsLoggedIn(false);
//           setUserData(null);
//           navigate('/');
//         } 
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }

//     const sendVerificationOtp = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');

//         if(data.success) {
//           navigate('/verify-email');
//           toast.success(data.message);
//         } 
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }

//     const resetPassword = () => {
//       navigate('/reset-password');
//     }

//   return (
//     <div className='w-full flex justify-between items-center p-4 sm:p-6
//     sm:px-24 absolute top-0'>

//         <img src={assets.logo} alt=""  className="w-28 sm:w-32" />

//         {userData ?
//           (<div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
//               {userData.name[0].toUpperCase()}

//               <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
//                 <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
//                   {!userData.isAccountVerified && 
//                     <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>
//                       Verify Account
//                     </li>
//                   }
//                   <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Logout</li>
//                   <li onClick={resetPassword} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Reset Password</li>
//                 </ul> 
//               </div>

//           </div>)  
//           : (
//           <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500
//           rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 
//           transition-all'>
//               Login <img src={assets.arrow_icon} alt="" className='w-4'/>
//           </button>
//           )
//         }
//     </div>
//   )
// }

// export default Navbar


import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';

// 💡 Best Practice: Centralize configuration to avoid repetition.
// Assuming this is handled globally now, but defining the Axios configuration utility.
const axiosInstance = axios.create({
    withCredentials: true,
});

const Navbar = () => {
    const navigate = useNavigate();
    // Destructure required data and functions
    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AuthContext);

    const [ isOpen, setIsOpen ] = useState(false);
    
    // Check if the user is authenticated and if their account is verified
    const isAuthenticated = !!userData;
    const isVerified = userData?.isAccountVerified;
    const userNameInitial = userData?.name?.[0]?.toUpperCase();

    // --- Action Handlers ---

    // Handler for logging out the user
    const logout = async () => {
        try {
            const { data } = await axiosInstance.post(backendUrl + '/api/auth/logout');
            
            if(data.success) {
                // Clear state on successful logout
                setIsLoggedIn(false);
                setUserData(null);
                toast.success(data.message || 'Logged out successfully.');
                navigate('/');
            } else {
                 toast.error(data.message || 'Logout failed.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Network error during logout.');
        }
    }

    // Handler for sending a new verification OTP
    const sendVerificationOtp = async () => {
        if (isVerified) {
            return toast.info('Your account is already verified.');
        }

        try {
            // Note: The backend route should typically use the userId from the cookie/token
            const { data } = await axiosInstance.post(backendUrl + '/api/auth/send-verify-otp');

            if(data.success) {
                toast.success(data.message);
                navigate('/verify-email');
            } else {
                 toast.error(data.message || 'Failed to send OTP.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error sending verification email.');
        }
    }

    // Handler for navigating to reset password screen
    const resetPassword = () => {
        navigate('/reset-password');
    }

    // --- JSX Rendering ---

    return (
        <div className='w-full flex justify-between items-center py-4 px-6 sm:py-6 sm:px-24 absolute top-0 z-50'>
            
            {/* Logo - Made clickable to return Home */}
            <img 
                src={assets.logo} 
                alt="Logo" 
                className="w-28 sm:w-32 cursor-pointer transition-transform duration-300 hover:scale-[1.03]" 
                onClick={() => navigate('/')}
            />

            {/* Conditional Rendering: Authenticated vs. Guest */}
            {isAuthenticated ? (
                // Authenticated User Profile Dropdown
                <div className='relative'>
                    <div onClick={() => setIsOpen(!isOpen)} className='w-10 h-10 flex justify-center items-center rounded-full bg-indigo-600 text-white font-semibold text-lg shadow-md transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-indigo-400 group'>
                        {userNameInitial}
                    </div>

                        {/* Dropdown Menu */}
                        <div className={`absolute ${isOpen ? "hidden" : " "} top-full right-0 mt-2 min-w-[180px] z-10 bg-white rounded-lg shadow-xl overflow-hidden transition-opacity duration-200 border border-gray-100`}>
                            <div className='p-3 border-b border-gray-200'>
                                <p className='text-sm font-medium text-gray-900'>{userData.name}</p>
                                {/* Display verification status */}
                                <p className={`text-xs ${isVerified ? 'text-green-600' : 'text-red-500'}`}>
                                    {isVerified ? 'Verified Account' : 'Unverified'}
                                </p>
                            </div>

                            <ul className='list-none m-0 p-0 text-sm'>
                                {!isVerified && (
                                    <li 
                                        onClick={sendVerificationOtp} 
                                        className='flex items-center gap-2 py-2 px-3 hover:bg-indigo-50 cursor-pointer text-indigo-600 font-medium'
                                    >
                                        <img src={assets.mail_icon} alt="Verify" className='w-4 h-4'/>
                                        Verify Account
                                    </li>
                                )}
                                <li 
                                    onClick={resetPassword} 
                                    className='flex items-center gap-2 py-2 px-3 hover:bg-gray-50 cursor-pointer text-gray-700'
                                >
                                    {/* <img src={assets.settings_icon} alt="Settings" className='w-4 h-4'/> */}
                                    <FaLock size={20} color="#333" />
                                    Change Password
                                </li>
                                <li 
                                    onClick={logout} 
                                    className='flex items-center gap-2 py-2 px-3 hover:bg-red-50 cursor-pointer text-red-600 border-t border-gray-100'
                                >
                                    {/* <img src={assets.logout_icon} alt="Logout" className='w-4 h-4'/> */}
                                    <IoMdLogOut size={20} color="#E53E3E" />
                                    Logout
                                </li>
                            </ul> 
                        </div>

                </div>
            ) : (
                // Guest Login Button
                <button 
                    onClick={() => navigate('/login')} 
                    className='flex items-center gap-2 border border-indigo-500 bg-indigo-500 text-white
                    rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 
                    hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
                >
                    Login <img src={assets.arrow_icon} alt="" className='w-3.5 invert'/> 
                    {/* The 'invert' class assumes assets.arrow_icon is dark and needs to be white */}
                </button>
            )}
        </div>
    )
}

export default Navbar;

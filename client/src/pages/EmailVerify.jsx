import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const EmailVerify = () => {
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text')
    const pasteValues = pasteData.split('');
    pasteValues.forEach((char, index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArr = inputRefs.current.map(e => e.value);
      const otp = otpArr.join('');
      //send otp to backend for verification
      
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp }, { withCredentials: true});

      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  
  useEffect(() => {
    if(isLoggedIn && userData && userData.isAccountVerified){
      toast.info('Your account is already verified');
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen px-6
    sm:px-0 bg-linear-to-br from-white to-emerald-400'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
        <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Verify Email With OTP</h1>
          <p className="text-center mb-6 text-indigo-300">
            Please enter the OTP sent to your email to verify your account.
          </p>
          <div 
            className="flex justify-between mb-8" 
            onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type="text" maxLength="1" key={index}  required 
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl
              rounded-md'
              ref={(e) => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button className='w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
            Verify Email
          </button>
        </form>
    </div>
  )
}

export default EmailVerify


// import React, { useContext, useEffect, useRef } from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { toast } from 'react-toastify';

// // 💡 Best Practice: axios.defaults.withCredentials should be set once in the application's entry file (e.g., main.jsx). 
// // Keeping it here for now, but noting the best practice.
// axios.defaults.withCredentials = true;

// const OTP_LENGTH = 6;

// const EmailVerify = () => {
//     // Destructure userId from userData for direct use and clarity
//     const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);
    
//     // 1. Destructure userId from userData for use in onSubmitHandler
//     const userId = userData?.id; 

//     const inputRefs = useRef([]);
//     const navigate = useNavigate();

//     // --- OTP Input Handlers ---
    
//     // Handles char input and auto-focuses the next field
//     const handleInput = (e, index) => {
//         // Only auto-focus if a value was entered
//         if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
//             inputRefs.current[index + 1]?.focus();
//         }
//     }
    
//     // Handles Backspace and auto-focuses the previous field
//     const handleKeyDown = (e, index) => {
//         if (e.key === 'Backspace' && e.target.value === '' && index > 0){
//             inputRefs.current[index - 1]?.focus();
//         }
//     }

//     // Handles pasting a multi-digit OTP string
//     const handlePaste = (e) => {
//         e.preventDefault(); // Prevent default paste behavior
//         const pasteData = e.clipboardData.getData('text').trim();
//         const pasteValues = pasteData.split('');
        
//         pasteValues.forEach((char, index) => {
//             // Only paste if the char is a digit and the ref exists
//             if (/\d/.test(char) && inputRefs.current[index]) {
//                 inputRefs.current[index].value = char;
//             }
//         });
        
//         // Focus the last filled input or the next one if available
//         const lastIndex = Math.min(pasteValues.length - 1, OTP_LENGTH - 1);
//         inputRefs.current[lastIndex]?.focus();
//     }

//     // --- Submission Handler ---
//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const otpArr = inputRefs.current.map(e => e?.value || '');
//             const otp = otpArr.join('');

//             // 2. Add validation for OTP length
//             if (otp.length !== OTP_LENGTH) {
//                 return toast.error(`Please enter the full ${OTP_LENGTH}-digit OTP.`);
//             }

//             // 3. CRITICAL FIX: Include userId in the payload (required by the backend controller)
//             if (!userId) {
//                 toast.error("User session data missing. Please log in and try again.");
//                 return navigate('/login'); // Redirect to login if ID is missing
//             }

//             const payload = { userId, otp };
            
//             const { data } = await axios.post(backendUrl + '/api/auth/verify-account', payload);

//             if(data.success){
//                 toast.success(data.message);
//                 // Call getUserData to update the context state (isAccountVerified=true)
//                 getUserData(); 
//                 navigate('/');
//             } else {
//                 toast.error(data.message);
//             }

//         } catch (error) {
//             toast.error(error.message);
//         }
//     }
    
//     // --- Side Effects ---
//     useEffect(() => {
//         // Redirect logic moved to the top of the component body for clearer execution flow
//         if(isLoggedIn && userData && userData.isAccountVerified){
//             toast.info('Your account is already verified');
//             navigate('/');
//         }
//     }, [isLoggedIn, userData, navigate])

//     // --- Render ---
//     return (
//         <div className='flex items-center justify-center min-h-screen px-6
//         sm:px-0 bg-linear-to-br from-white to-emerald-400'>
//             <img onClick={() => navigate('/')} src={assets.logo} alt="ASTROLAB Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
//             <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
//                 <h1 className='text-white text-2xl font-semibold text-center mb-4'>Verify Email With OTP</h1>
//                 <p className="text-center mb-6 text-indigo-300">
//                     Please enter the 6-digit OTP sent to your email to verify your account.
//                 </p>
//                 <div 
//                     className="flex justify-between mb-8" 
//                     onPaste={handlePaste}>
//                     {/* Use the defined constant for array length */}
//                     {Array(OTP_LENGTH).fill(0).map((_, index) => (
//                         <input 
//                             type="text" 
//                             maxLength="1" 
//                             key={index} 
//                             required 
//                             className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
//                             // Use callback ref with optional chaining for safety
//                             ref={(e) => inputRefs.current[index] = e} 
//                             onInput={(e) => handleInput(e, index)}
//                             onKeyDown={(e) => handleKeyDown(e, index)}
//                         />
//                     ))}
//                 </div>
//                 {/* Explicitly set type="submit" */}
//                 <button type="submit" className='w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
//                     Verify Email
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default EmailVerify;
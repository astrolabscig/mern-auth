// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";    
// import { AuthContext } from "./AuthContext";


// export const AppContextProvider = (props) => {
    
    
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userData, setUserData] = useState(null);

//     const getAuthState = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
//             if(data.success){
//                 setIsLoggedIn(true);
//                 getUserData();
//             }

//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     const getUserData = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/user/data');
//             data.success ? setUserData(data.userData) : toast.error(data.message);
    
//         } catch (error) {
//             toast.error(error.message);
//         }
//     } 

//     useEffect(() => {
//         getAuthState();
//     }, [getAuthState]);

//     const value = {
//         backendUrl,
//         isLoggedIn, setIsLoggedIn,
//         userData, setUserData,
//         getUserData
//     }

//     return (
//         <AuthContext.Provider value={value}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }


import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";


export const AppContextProvider = (props) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // <-- NEW: Initial loading state is TRUE

    // 1. Memoize getUserData
    const getUserData = useCallback(async () => {
        // ... (no change to getUserData logic)
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
            
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
                setUserData(null);
            }
        } catch (error) {
            toast.error(error.message);
            setUserData(null);
        }
    }, [backendUrl, setUserData]);


    // 2. Memoize getAuthState and manage the loading state
    const getAuthState = useCallback( async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
            
            if(data.success){
                setIsLoggedIn(true);
                await getUserData(); // <-- Use await here to ensure data is fetched before finishing the function
            } else {
                setIsLoggedIn(false);
                setUserData(null);
            }
        } catch (error) {
            toast.error(error.message);
            setIsLoggedIn(false);
            setUserData(null);
        } finally {
            // <-- NEW: Set loading to FALSE once the check is COMPLETE (success or error)
            setIsLoading(false); 
        }
    }, [backendUrl, setIsLoggedIn, getUserData, setUserData]);


    // 3. Effect runs once on mount
    useEffect(() => {
        getAuthState();
    }, [getAuthState]);


    const value = {
        backendUrl,
        isLoggedIn, 
        setIsLoggedIn,
        userData, 
        setUserData,
        getUserData,
        isLoading // <-- NEW: Expose the loading state
    }

    return (
        <AuthContext.Provider value={value}>
            {/* <-- NEW: Only render children when loading is complete --> */}
            {isLoading ? <div>Loading...</div> : props.children}
        </AuthContext.Provider>
    )
}
import {createContext, useContext, useReducer} from "react";
import reducer from "./reducer";
import {
    DISPLAY_ALERT, LOGOUT_USER,
    REMOVE_ALERT, SETUP_USER_ERROR, SETUP_USER_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS
} from "./actions";
import axios from "axios";

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const location = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token || null,
    userLocation: location || '',
    jobLocation: location || '',
    showSidebar: false
}

const AppContext = createContext()


const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: '/api/v1/',

    })
    authFetch.interceptors.request.use((config) => {
        //config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    authFetch.interceptors.response.use((response) => {
        return response

    }, (error) => {
        if (error.response.status === 401)
            logoutUser()
        return Promise.reject(error)
    })


    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const toggleSidebar = () => {
        dispatch({type: "TOGGLE_SIDEBAR"})
    }

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: REMOVE_ALERT})
        }, 3000)
    }

    const setupUser = async ({curUser, endPoint, alertText}) => {
        dispatch({type: "SETUP_USER_BEGIN"})
        try {
            const response = await axios.post(`/api/v1/auth/${endPoint}`, curUser)
            const {user, location, token} = response.data
            dispatch({type: SETUP_USER_SUCCESS, payload: {user, location, token, alertText}})
            addUserToLocalStorage({user, token, location})


        } catch (e) {
            dispatch({type: SETUP_USER_ERROR, payload: {msg: e.response.data.msg}})

        }
        clearAlert()

    }

    const logoutUser = () => {
        dispatch({type: LOGOUT_USER})
        removeUserToLocalStorage()

    }

    const updateUser = async (currentUser) => {
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch('auth/update', currentUser)
            const {user, location, token} = data

            dispatch({type: UPDATE_USER_SUCCESS, payload: {user, location, token}})
            addUserToLocalStorage({user, location, token})

        } catch (e) {
            if (e.response.status !== 401)
                dispatch({type: UPDATE_USER_ERROR, payload: {msg: e.respense.data.msg}})

        }
    }


    return <AppContext.Provider
        value={{
            ...state,
            displayAlert,
            setupUser,
            toggleSidebar,
            logoutUser,
            updateUser
        }}>{children}</AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}



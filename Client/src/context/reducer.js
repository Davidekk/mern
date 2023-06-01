import {
    DISPLAY_ALERT,
    LOGOUT_USER,
    REMOVE_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN, UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "./actions";

import {initialState} from "./appContext";


const reducer = (state, action) => {
    console.log(action.type)
    // eslint-disable-next-line default-case
    switch (action.type) {
        case DISPLAY_ALERT:
            return {...state, showAlert: true, alertText: "Please provide valid input", alertType: "danger"}
        case REMOVE_ALERT:
            return {...state, showAlert: false, alertText: "", alertType: ""}
        case SETUP_USER_BEGIN:
            return {...state, isLoading: true}
        case SETUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.userLocation,
                alertType: 'success',
                alertText: action.payload.alertText
            }
        case SETUP_USER_ERROR:
            return {...state, showAlert: true, alertText: action.payload.msg, alertType: "danger", isLoading: false}
        case TOGGLE_SIDEBAR:
            return {...state, showSidebar: !state.showSidebar}
        case LOGOUT_USER:
            return {
                ...initialState, token: null,
                user: null,
                userLocation: '',
                jobLocation: ''

            }
        case UPDATE_USER_BEGIN:
            return {...state, isLoading: true}
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.userLocation,
                alertType: 'success',
                alertText: 'User Profile Updated!'
            }
        case UPDATE_USER_ERROR:
            return {...state, showAlert: true, alertText: action.payload.msg, alertType: "danger", isLoading: false}

    }
    throw new Error(`no such action: ${action.type}`)
}

export default reducer
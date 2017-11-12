import { combineReducers } from "redux"
import { REQUEST_ISLOGIN, RECEIVE_LOGINED, RECEIVE_NOT_LOGIN, REQUEST_IMAGES, RECEIVE_IMAGES, UPLOAD_IMAGES, EXIT_LOGIN, CLEAR_IMAGES, UPDATE_IMAGES } from "../actions"

const user = (state = "", action) => {
    switch (action.type) {
        case RECEIVE_LOGINED:
            return action.user;
        case REQUEST_ISLOGIN:
        case RECEIVE_NOT_LOGIN:
        case EXIT_LOGIN:
            return "";
        default:
            return state
    }
}

const token = (state = "", action) => {
    switch (action.type) {
        case RECEIVE_LOGINED:
            return action.token
        default:
            return state
    }
}

const images = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_LOGINED:
            return [ ...action.images]
        case RECEIVE_IMAGES:
            return [ ...action.images]
        case UPLOAD_IMAGES:
            return [ ...action.images]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    images,
    token
})
export default rootReducer
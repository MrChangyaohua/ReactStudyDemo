import { combineReducers } from "redux"
import { RECEIVE_LOGINED, RECEIVE_NOT_LOGIN, RECEIVE_IMAGES, EXIT_LOGIN } from "../actions"

const user = (state = "", action) => {
    switch (action.type) {
        case RECEIVE_LOGINED:
            return action.user;
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
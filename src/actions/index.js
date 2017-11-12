
export const RECEIVE_LOGINED = "RECEIVE_LOGINED"
export const RECEIVE_NOT_LOGIN = "RECEIVE_NOT_LOGIN"
export const RECEIVE_IMAGES = "RECEIVE_IMAGES"
export const EXIT_LOGIN = "EXIT_LOGIN"



export const receiveLogined = json => ({
    type: RECEIVE_LOGINED,
    user: json.user,
    images: json.user.imageUpload,
    token: json.token
})

export const receiveNotLogined = () => ({
    type: RECEIVE_NOT_LOGIN
})

export const receiveImages = json => ({
    type: RECEIVE_IMAGES,
    images: json
})



export const fetchIslogin = () => dispatch => {
    return fetch("/isLogin", {
        method: "get",
        credentials: 'include',
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            if (json.code == 200) {
                dispatch(receiveLogined(json));
            } else {
                dispatch(receiveNotLogined())
            }
        })
}

export const exitLogin = () => dispatch => {
    return fetch("/logout", {
        method: "post",
        credentials: 'include',
        header: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            dispatch({ type: EXIT_LOGIN });
        }
    })
}

export const  fetchImages = () => dispatch => {
    return fetch("/getImages", {
        method: "get",
        credentials: 'include',
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => dispatch(receiveImages(json)))
}

// const shouldFetchImages = state => {
//     const isLogin = state.user;
//     if (isLogin.length > 0) {
//         return true
//     }
//     return false;
// }

// export const fetchImagesIfNeeded = () => (dispatch, getState) => {
//     console.log(getState());
//     if (shouldFetchImages(getState())) {
//         return dispatch(fetchImages())
//     }
// }

export const uploadImages = formData => dispatch => {
    return fetch("/upload", {
        method: "post",
        credentials: 'include',
        header: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })
        .then(res => res.json())
        .then(json => dispatch(receiveImages(json)))
}

export const delPicById = (id,token) => (dispatch,getState) => {
    return fetch("/deleteImages",{
        method : "POST",
        credentials: 'include',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRF-Token': token
        },
        body : JSON.stringify({
            num : id
        })
    }).then(res => {
        if(res.ok){
            console.log("图片删除成功");
        }
    })
}


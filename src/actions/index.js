export const REQUEST_ISLOGIN = "REQUEST_ISLOGIN"
export const RECEIVE_LOGINED = "RECEIVE_LOGINED"
export const RECEIVE_NOT_LOGIN = "RECEIVE_NOT_LOGIN"
export const REQUEST_IMAGES = "REQUEST_IMAGES"
export const RECEIVE_IMAGES = "RECEIVE_IMAGES"
export const UPLOAD_IMAGES = "UPLOAD_IMAGES"
export const UPDATE_IMAGES = "UPDATE_IMAGES"
export const EXIT_LOGIN = "EXIT_LOGIN"
export const CLEAR_IMAGES = "CLEAR_IMAGES"


export const requestIslogin = () => ({
    type: REQUEST_ISLOGIN,
})

export const receiveLogined = json => ({
    type: RECEIVE_LOGINED,
    user: json.user,
    images: json.user.imageUpload,
    token: json.token
})

export const receiveNotLogined = () => ({
    type: RECEIVE_NOT_LOGIN
})

export const requestImages = () => ({
    type: REQUEST_IMAGES
})

export const updateImages = json => ({
    type: UPDATE_IMAGES,
    images: json
})

export const receiveImages = json => ({
    type: RECEIVE_IMAGES,
    images: json
})

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
            dispatch({ type: CLEAR_IMAGES });
        }
    })
}

export const fetchIslogin = () => dispatch => {
    dispatch(requestIslogin())
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

export const fetchImages = () => dispatch => {
    dispatch(requestImages())
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

const shouldFetchImages = state => {
    const isLogin = state.user;
    if (isLogin.length > 0) {
        return true
    }
    return false;
}

export const fetchImagesIfNeeded = () => (dispatch, getState) => {
    console.log(getState());
    if (shouldFetchImages(getState())) {
        return dispatch(fetchImages())
    }
}

export const uploadImages = images => dispatch => {
    // let formData = new FormData(images);
    // let image = images[0];
    // formData.append({"name" : 'upload', 'filename': image.name, 'Content-Type': image.type});
    return fetch("/upload", {
        method: "post",
        credentials: 'include',
        header: {
            "Content-Type": "multipart/form-data"
        },
        body: images
    })
        .then(res => res.json()
        )
        .then(json =>
            dispatch(receiveImages(json))
        // console.log("上传图片后返回的数据" + JSON.stringify((json)))
        )
}


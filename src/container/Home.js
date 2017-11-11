import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { uploadImages ,fetchIslogin ,fetchImagesIfNeeded , exitLogin , fetchImages} from '../actions'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

// components
import Header from '../components/Header'
import Images from '../components/Images'
import Upload from '../components/Upload'

// data
// import imageList from '../mock/imageList';

class Home extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchIslogin());
        dispatch(fetchImagesIfNeeded());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const { dispatch } = this.props;
            dispatch(fetchIslogin());
            dispatch(fetchImagesIfNeeded());
        }
    }
    render() {
        const {user ,images , token , uploadFuc , exitLogin} = this.props;
        return (
            <div>
                <Header user={user} exitLogin={exitLogin} />
                <div className="container">
                    <Upload user={user} imageList={images} uploadFuc={uploadFuc} />
                    <Images imageList={images} token={token}/>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    user : PropTypes.string.isRequired,
    images : PropTypes.arrayOf(PropTypes.shape({
        imgUrl : PropTypes.string.isRequired,
        name : PropTypes.string.isRequired
    })),
    token : PropTypes.string.isRequired,
    uploadFuc : PropTypes.func.isRequired,
    exitLogin : PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { user , images , token} = state;
    return { user , images , token};
}
const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        uploadFuc : () => {
            dispatch(fetchImages())
        },
        exitLogin : () => {
            dispatch(exitLogin())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)

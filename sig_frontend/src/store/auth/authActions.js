import { api_security } from '../../config/axios'

import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_REQUEST,
    AUTH_CLEAR_ERROR
} from '../constants';

import localStorageUtil from "../../utils/storage"

export const loginAction = (form) => async (dispatch)=>{
    try{
        dispatch({ type: AUTH_REQUEST})
        
        const {data} = await  api_security.post('/login',form);
        
        localStorageUtil.set(data,'user');
        localStorageUtil.setToken(data.token);

        dispatch({ 
            type: AUTH_SUCCESS,
            payload: data
        })

    }catch( error){
        console.log(error)
        dispatch({
            type:AUTH_FAILED,
            payload: error.response?error.response.data:""
        })
    }
} 

export const logoutAction = () => async (dispatch)=>{
        
        const {data} = await  api_security.post('/logout');

        localStorageUtil.clearToken();
        localStorageUtil.clear('user');

        dispatch({ 
            type: AUTH_CLEAR_ERROR,
            payload: null
        })

} 

export const clearErrors = () => async(dispatch)=>{
    dispatch({ type: AUTH_CLEAR_ERROR})
} 
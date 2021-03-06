import axios from 'axios';
import superagent from 'superagent';
import upload from 'superagent';
import {browserHistory} from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  FETCH_MESSAGE,
  FETCH_SAGAS,
  FETCH_All_SAGAS,
  FETCH_SELECTED_SAGA,
  RESET_GOT_DATA,
  SAGA_ERROR,
  CLEAN_SAGA_ERROR,
  FETCH_USER_ID,
  FETCH_USER_IMAGE
} from './types';

const ROOT_URL = 'https://intense-sierra-84065.herokuapp.com';

export function signinUser({email, password}){
  return function (dispatch){
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/user-home');
    })
    .catch(() => {
      dispatch (authError('Bad login info'));
    });
  }
}

export function signupUser({email, password}){
  return function (dispatch){
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response =>{
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/user-home');
    })
    .catch((response) => {
      dispatch(authError('Email is already in use'))
    });
  }
}

export function authError (error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {type: LOGOUT_USER};
}

export function sagaError (error){
  return {
    type: SAGA_ERROR,
    payload: error
  };
}
export function cleanSagaError (){
  return {
    type: CLEAN_SAGA_ERROR,
    payload: ""
  };
}

export function saveNewSaga({title, people, date, landmark, state, country, story, imageName}){
  const authHeaders = {headers: { authorization: localStorage.getItem('token')}}
  return function(dispatch){
    axios.post(`${ROOT_URL}/add-saga`,
       {title, people, date, landmark, state, country, story, imageName},
       authHeaders)
    .then(response =>{
      browserHistory.push('/user-home');
    })
    .catch(error =>
      dispatch(sagaError(' Something went wrong! Please fill in all fields and enter a valid landmark, state, and/or country'))
    )
  }
}

export function fetchUserSagas(){
  return function (dispatch){
    axios.get(`${ROOT_URL}/user-sagas`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_SAGAS,
        payload: response.data
      });
    });
  }
}

export function fetchAllSagas(){
  return function (dispatch){
    axios.get(`${ROOT_URL}/all-sagas`)
    .then(response => {
      dispatch({
        type: FETCH_All_SAGAS,
        payload: response.data
      });
    })
  }
}

export function fetchSelectedSaga(sagaId){
  return function (dispatch){
    axios.get(`${ROOT_URL}/saga/` + sagaId, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response =>{
      dispatch({
        type: FETCH_SELECTED_SAGA,
        payload: response.data
      })
    })
  }
}

export function deleteSaga(sagaId){
  return function (dispatch){
    axios.delete(`${ROOT_URL}/delete-saga/` + sagaId, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('this is the deleted saga', response)
    })
  }
}

export function editSaga(sagaId, {title, people, date, landmark, state, country, story, imageName}){
  const authHeaders = {headers: { authorization: localStorage.getItem('token')}}
  return function(dispatch){
    axios.put(`${ROOT_URL}/add-saga/` + sagaId,
       {title, people, date, landmark, state, country, story, imageName},
       authHeaders)
    .then(response =>{
      browserHistory.push('/user-home');
    })
    .catch(error =>
      dispatch(sagaError(' Something went wrong! Please fill in all fields and enter a valid landmark, state, and/or country'))
    )
  }
}

export function uploadPicture(files, name){
  return function (dispatch){
    superagent.post(`${ROOT_URL}/upload/` + name)
    .attach('fileUploaded', files[0])
    .end((err, res) =>{
      if (err) console.log(err);
      dispatch({
        type: FETCH_USER_IMAGE,
        payload: res.body.name
      })
    })
  }
}


export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  }
}

export function fetchUserId(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_USER_ID,
        payload: response.data.userId
      });
    });
  }
}

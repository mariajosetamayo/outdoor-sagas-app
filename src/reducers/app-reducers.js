import {
  FETCH_SAGAS,
  FETCH_SELECTED_SAGA,
  FETCH_All_SAGAS,
  SAGA_ERROR,
  CLEAN_SAGA_ERROR,
  FETCH_USER_ID,
  FETCH_USER_IMAGE
}from '../actions/types';

export default function(state =
  {
    userSagas:[],
    selectedSaga:{
      location:{lat:0, lng:0}
    },
    allSagas: []
  }, action)
  {
    switch(action.type){
      case FETCH_SAGAS:
      console.log('this are the sagas to be saved', action.payload)
      return {...state, userSagas: action.payload};
      case FETCH_SELECTED_SAGA:
      return {...state, selectedSaga: action.payload};
      case  FETCH_All_SAGAS:
      return {...state, allSagas: action.payload};
      case SAGA_ERROR:
      return { ...state, error: action.payload };
      case CLEAN_SAGA_ERROR:
      return { ...state, error: "" };
      case FETCH_USER_ID:
      return {...state, userId: action.payload};
      case FETCH_USER_IMAGE:
      return {...state, imageName: action.payload}
    }
    return state;
  };

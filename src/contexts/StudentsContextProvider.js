import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
  collection: [],
  loading: false,
  savingId: null,
  loadingError: null,
  savingError: null,
};

export const StudentsContext = createContext(INITIAL_STATE);

const studentsReducer = (state, action) => {
  console.log('dispatched action', action.type);
  switch (action.type) {
    case 'fechStart':
      return { ...state, loading: true };
    case 'fechSuccess':
      return { ...state, collection: action.payload, loading: false };
    case 'fechError':
      return { ...state, fetchError: action.payload, loading: false };
    case 'addStduent':
      return { ...state, collection: [...state.collection, action.payload] };
    case 'setCollection':
      return { ...state, collection: action.payload };
    default:
      return state;
  }
};

export default ({ children }) => {
  const [collection, dispatch] = useReducer(studentsReducer, INITIAL_STATE);

  const fetchCollection = () => {
    dispatch('fetchStart');
    axios
      .get('http://localhost:8080/students')
      .then((res) => dispatch('fetchSuccess', { payload: res.data }))
      .catch(() => {
        dispatch('fetchError', {
          payload:
            "Une erreur est survenue durant le chargement des élèves depuis l'API",
        });
      });
  };

  return (
    <StudentsContext.Provider
      value={{ ...collection, fetchCollection, dispatch }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import axios from 'axios';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers';
import { setUser } from './redux/actions/index'
import { PersistGate } from 'redux-persist/integration/react';
import store  from './redux/store'

// const ConnectedApp = connect(mapStateToProps, { setUser })(App);

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.request.use((config) => {
  const token = "Bearer " + window.localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
})

root.render(
  <Provider store={store}>
  
      <BrowserRouter>
        <App />
      </BrowserRouter>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

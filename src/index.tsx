import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import ErrorPage from './Components/Error/error.jsx';
import Login from './Components/Authentication/Login';
import Lobby from './Components/Lobby/Lobby';
import Register from './Components/Authentication/Register';
import LobbyRoom from './Components/Lobby/LobbyRoom';
import ErrorFullPage from './Components/Error/ErrorFullPage';

const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <ErrorFullPage return_route='/' return='home page' message="This page doesn't exist, don't come here again." />},
  { path: '/login', element: <Login />, errorElement: <ErrorPage />},
  { path: '/register', element: <Register />, errorElement: <ErrorPage />},
  { path: '/lobby', element: <Lobby />, errorElement: <ErrorPage />},
  //lobby/:id route to LobbyRoom component
  { path: '/lobby/:id', element: <LobbyRoom />, errorElement: <ErrorPage />},

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

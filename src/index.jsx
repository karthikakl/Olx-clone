import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css'
import {FirebaseContext} from './store/Context.jsx'
import Context from './store/Context.jsx'
import {app} from './firebase/Config.jsx'

createRoot(document.getElementById('root')).render(
   <FirebaseContext.Provider value={{app}}>
    <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>
)
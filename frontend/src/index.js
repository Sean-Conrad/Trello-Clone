import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListsContextProvider} from './context/ListsContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ListsContextProvider>
        <App />
     </ListsContextProvider>
);


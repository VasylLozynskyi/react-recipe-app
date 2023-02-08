import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./assets/Fonts/Poppins/Poppins-Bold.ttf";
import "./assets/Fonts/Poppins/Poppins-Regular.ttf";
import store from './Components/Redux/store/store';
import { Provider} from "react-redux" 


const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderDOM = (state) => {
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
}

rerenderDOM(store.getState());
store.subscribe(() => {
    let state = store.getState();
    rerenderDOM(state)
});


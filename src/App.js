import './App.css';
import Main from './Pages/Main';
import {BrowserRouter} from "react-router-dom";
import { dataSite } from "./data/data";

function App() {
  return (
      <BrowserRouter basename='/react-recipe-app'>
        <Main dataSite={dataSite}/>
      </BrowserRouter>
  );
}
export default App;

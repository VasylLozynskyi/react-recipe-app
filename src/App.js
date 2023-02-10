import './App.css';
import Main from './Pages/Main';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter basename='/react-recipe-app'>
        <Main/>
      </BrowserRouter>
  );
}
export default App;

import './App.css';
import Main from './Components/Main/Main';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    
      <BrowserRouter>
      <div className="container">
        <Main/>
      </div>
      </BrowserRouter>
    
    
  );
}

export default App;

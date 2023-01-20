import './App.css';
import Main from './Components/Main/Main';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Main/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;

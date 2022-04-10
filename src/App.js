import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import './App.css';
import Home from './views/Home';
import Documents from './views/Documents';

function App() {
  return (
   <>
     <Router>

       <Routes>
          <Route path="/Home" exact element={<Home/>}>
          </Route>
          <Route path="/Documents" exact element={<Documents/>}>
          </Route>
       </Routes>
     </Router>
    
   </>
  );
}

export default App;

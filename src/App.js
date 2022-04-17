import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import './App.css';
import Home from './views/Home';
import Documents from './views/Documents';
import Tasks from './views/Tasks';
import ChooseSupervisor from './views/ChooseSupervisor';
import CreateGroup from './views/CreateGroup';
import Profile from './views/Profile';
import ContactSupervisor from './views/ContactSupervisor';


function App() {
  return (
   <>
     <Router>

       <Routes>
          <Route path="/Home" exact element={<Home/>}>
          </Route>
          <Route path="/Documents" exact element={<Documents/>}>
          </Route>
          <Route path="/Tasks" exact element={<Tasks/>}>
          </Route>
          <Route path="/ChooseSupervisor" exact element={<ChooseSupervisor/>}>
          </Route>
          <Route path="/CreateGroup" exact element={<CreateGroup/>}>
          </Route>
          <Route path="/Profile" exact element={<Profile/>}>
          </Route>
          <Route path="/ContactSupervisor" exact element={<ContactSupervisor/>}>
          </Route>
       </Routes>
     </Router>
    
   </>
  );
}

export default App;

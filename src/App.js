import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import './App.css';
import Home from './views/Student/Home';
import Documents from './views/Student/Documents';
import Tasks from './views/Student/Tasks';
import ChooseSupervisor from './views/Student/ChooseSupervisor';
import CreateGroup from './views/Student/CreateGroup';
import Profile from './views/Student/Profile';
import ContactSupervisor from './views/Student/ContactSupervisor';
import SupervisorHome from './views/Supervisor/SupervisorHome';
import DocumentsSup from './views/Supervisor/DocumentsSup';
import ProfileSup from './views/Supervisor/ProfileSup';
import MakeAppointment from './views/Student/MakeAppointment';
import ContactAdmin from './views/Supervisor/ContactAdmin';
import AppointmentRequests from './views/Supervisor/AppointmentRequests';
import AvailableHours from './views/Supervisor/AvailableHours';
import DocumentsAdmin from './views/Admin/DocumentsAdmin';
import TaskSup from './views/Supervisor/TaskSup';
import Students from "./views/Supervisor/Students";
import UserAdmin from './views/Admin/UserAdmin';

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
          <Route path="/SupervisorHome" exact element={<SupervisorHome/>}>
          </Route>
          <Route path="/DocumentsSup" exact element={<DocumentsSup/>}>
          </Route>
          <Route path="/ProfileSup" exact element={<ProfileSup/>}>
            </Route>
          <Route path="/MakeAppointment" exact element={<MakeAppointment/>}>
          </Route>
          <Route path="/ContactAdmin" exact element={<ContactAdmin/>}>
          </Route>
          <Route path="/AppointmentRequests" exact element={<AppointmentRequests/>}>
          </Route>
          <Route path="/AvailableHours" exact element={<AvailableHours/>}>
          </Route>
          <Route path="/TaskSup" exact element={<TaskSup/>}>
          </Route>
          <Route path="/Students" exact element={<Students/>}>
          </Route>
          <Route path="/DocumentsAdmin" exact element={<DocumentsAdmin/>}>
          </Route>
          <Route path="/UserAdmin" exact element={<UserAdmin/>}>
          </Route>
       </Routes>
     </Router>
    
   </>
  );
}

export default App;

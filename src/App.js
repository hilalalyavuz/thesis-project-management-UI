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
import SignIn from './views/authorize/SignIn';
import ChooseRequests from './views/Supervisor/ChooseRequests';
import Register from './views/authorize/Register';
import Messages from './views/Supervisor/Messages';
import ContactStudent from './views/Supervisor/ContactStudent';
import AdminMessages from './views/Admin/AdminMessage';
import ForgotPassword from './views/authorize/ForgotPassword';
import ZoomSets from './views/Admin/ZoomSets';
import AddDept from './views/Admin/AddDept';
import NotFound from "./views/Warnings/NotFound";

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
          <Route path="/SignIn" exact element={<SignIn/>}>
          </Route>
          <Route path="/" exact element={<SignIn/>}>
          </Route>
          <Route path="/ChooseRequests" exact element={<ChooseRequests/>}>
          </Route>
          <Route path="/Register" exact element={<Register/>}>
          </Route>
          <Route path="/Messages" exact element={<Messages/>}>
          </Route>
          <Route path="/ContactStudent" exact element={<ContactStudent/>}>
          </Route>
          <Route path="/AdminMessages" exact element={<AdminMessages/>}>
          </Route>
          <Route path="/ForgotPassword" exact element={<ForgotPassword/>}>
          </Route>
          <Route path="/ZoomSets" exact element={<ZoomSets/>}>
          </Route>
          <Route path="/AddDept" exact element={<AddDept/>}>
          </Route>
          <Route path='/*' element={<NotFound />}>
          </Route>
       </Routes>
     </Router>
    
   </>
  );
}

export default App;

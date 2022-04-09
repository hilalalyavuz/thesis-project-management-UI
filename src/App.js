import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar'

function App() {
  return (
   <div style={{display:'flex',flexDirection:'row'}}>
    <Sidebar />
    <div>Hilal</div>
   </div>
  );
}

export default App;

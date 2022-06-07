import Sidebar from "../../components/Sidebar";
import "../../css/Common.css";
import '../../css/Home.css';
import { Knob } from "primereact/knob";
import { useState, useEffect, useRef } from "react";
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import React from 'react';
import {Calendar} from 'primereact/calendar';
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import '../../css/Message.css';

const Home = () => {
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  const displayValueTemplate = (value) => {
    return (
        <React.Fragment>
            {value}/<b>100</b>
        </React.Fragment>
    );
}
  const [value, setValue] = useState(60);
  const [date, setDate] = useState();
  const [rows, setRows] = useState(['']);
  const toast = useRef(null);
  const [data,setData] = useState([]);
  const [remain, setRemain] = useState();
  const [user, setUser] = useState();
  let userEmail = sessionStorage.getItem("email");
    let role = sessionStorage.getItem("role");
    let tok = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `bearer ${tok}` }
    };

  useEffect(() =>{
    const getMeetings = async () => {
      await axios.get(`https://localhost:7084/api/Student/StudentProfileMeeting/${userEmail}`,config).then(response => {
                  setRows(response.data);
              }).catch(error => {
  
            });;  
    }
    getMeetings();
       axios.get(`https://localhost:7084/api/User/GetDocumentType/${userEmail}`,config).then((result)=>{
          setData(result.data.sort((a, b) => (a.color > b.color) ? -1 : 1));
          setRemain(result.data.sort((a, b) => (a.color > b.color) ? -1 : 1)[0].deadline);
      });
      axios.get(`https://localhost:7084/api/Student/GetStudentByEmail/${userEmail}`,config).then((result)=>{
        setUser(result.data);
      });
  },[]);
  const dateTemplate = (dat) =>{
        for(let i = 0; i < rows.length; i++){
          let dt = new Date(rows[i].date);
          dt = {"month":dt.getMonth(),"year":dt.getFullYear(),"day":dt.getDate()};
          if(dt.day == dat.day && dt.month == dat.month && dt.year == dat.year){
            return (
              <div style={{color: "#4338CA",
                background: "#EEF2FF", width: '2.5rem',
                className:'busy',
                height: '2.5rem',
                borderRadius: '50%',
                transition: 'box-shadow 0.2s',
                border: '1px solid transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative'}}>{dat.day}</div> );
  
          }else{
            return dat.day;
          }
        }
        for(let i = 0; i < data.length; i++){
          let dt = new Date(data[i].deadline);
          dt = {"month":dt.getMonth(),"year":dt.getFullYear(),"day":dt.getDate()};
          if(dt.day == dat.day && dt.month == dat.month && dt.year == dat.year){
            return (
              <div style={{color: "#4338CA",
                background: "#F12637", width: '2.5rem',
                className:'busy',
                height: '2.5rem',
                borderRadius: '50%',
                transition: 'box-shadow 0.2s',
                border: '1px solid #FFE0E3',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative'}}>{dat.day}</div> );
  
          }else{
            return dat.day;
          }
      }
   
  }

  const change = (dtt) =>{
    for(let i = 0; i < rows.length; i++){
      let dt = new Date(rows[i].date);
      dt = {"month":dt.getMonth(),"year":dt.getFullYear(),"day":dt.getDate()};
      if(dt.day == dtt.value.getDate() && dt.month == dtt.value.getMonth() && dt.year == dtt.value.getFullYear()){
        toast.current.show({severity:'info', summary: 'Meeting with Supervisor',detail:`Time: ${rows[i].date.split('T')[0]}` +` / ${rows[i].date.split('T')[1]}`+'\n'+`${rows[i].link}`,lifetime:1000000});
      }
    }
  }
   return (
     <>
     { pageRole=="student" ? 
    <div className="Page">
      <Helmet>
        <title>Thesis Tracker | Home</title>
      </Helmet>
      <Toast ref={toast} />
      <div className="Sidebar">
        <Sidebar dname='Home' />
      </div>

      <div className="Main" style={{flexDirection:'column'}}>
          <div className="title">
              <h3>DASHBOARD</h3> 
          </div>
     
      
<div className="prog">
    <Card className="card" style={{marginTop:'0rem'}}>
      <h4>Status: 
        <span className={`customer-badge status-general`} style={{marginLeft:'1rem'}}>{user ? user.last_status: null}</span>
      </h4>
          <Knob value={value} size={200} />
          <h3 className="mt-3">Completed</h3>
    </Card>  
    <div>

<Card className="card" style={{width:'-webkit-fill-available',marginTop:'0rem'}}>
     <h3>Last Deadline: {remain ? remain.split('T')[0]: null}</h3>
      <ProgressBar value={40} displayValueTemplate={displayValueTemplate} size={80} className="progressbar"/>
          </Card>

          <Card className="card" style={{marginTop:'0rem',padding:'0rem 0rem'}}>
            <h3>Meeting Calendar</h3>
          <Calendar value={date} onChange={change} inline showButtonBar
          dateTemplate={dateTemplate}
          />

          </Card>
    </div>
     
         
        </div>

        
      </div>
    </div> : <Unauthorized></Unauthorized>}
    </>
  );
};

export default Home;

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
            {countDown} day
        </React.Fragment>
    );
}
  const [value, setValue] = useState(0);
  const [date, setDate] = useState();
  const [rows, setRows] = useState(['']);
  const [countDown, setCounDown] = useState(0);
  const [countDown2, setCounDown2] = useState(0);
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
    const getDocumentType = async () => {
      await axios.get(`https://localhost:7084/api/User/GetDocumentType/${userEmail}`,config).then((result)=>{
          setData(result.data.sort((a, b) => (a.deadline > b.deadline) ? -1 : 1));
          setRemain(result.data.sort((a, b) => (a.deadline > b.deadline) ? -1 : 1)[0].deadline);
          let today = new Date();
          let r = result.data.sort((a, b) => (a.deadline > b.deadline) ? -1 : 1)[0].deadline;
          let r2 = new Date(r);
          var diffDays2 = parseInt((r2 - today) / (1000 * 60 * 60 * 24), 10);
          setCounDown(Math.abs(diffDays2));
          //const diffTime = Math.abs(r2 - today);
          //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          //console.log(diffDays + " days");
          axios.get(`https://localhost:7084/api/Student/GetStudentByEmail/${userEmail}`,config).then((res)=>{
        setUser(res.data);
        let docRes = result.data.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1)
        let count = 0;
        docRes.map((x,index) => {
          if(x.name == res.data.last_status){
            setValue(parseInt(Number(Number(count+1) / Number(docRes.length))*100));
            if(index+1 <= docRes.length){
              setCounDown2(docRes[index+1])
            }
          }else{
            count++;
          }
        })
      });
      });
    }
    getDocumentType();

    // const getStudentByEmail = async () => {
    //   await axios.get(`https://localhost:7084/api/Student/GetStudentByEmail/${userEmail}`,config).then((result)=>{
    //     setUser(result.data);
    //     calculateProgress();
    //   });
    // }
    // getStudentByEmail();

      
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
  
          }
        }
        for(let i = 0; i < data.length; i++){
          let dt = new Date(data[i].deadline);
          dt = {"month":dt.getMonth(),"year":dt.getFullYear(),"day":dt.getDate()};
          if(dt.day == dat.day && dt.month == dat.month && dt.year == dat.year){
            return (
              <div style={{color: "#4338CA",
                background: "#FFE0E3", width: '2.5rem',
                className:'busy',
                height: '2.5rem',
                borderRadius: '50%',
                transition: 'box-shadow 0.2s',
                border: '1px solid #F12637',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative'}}>{dat.day}</div> );
          }
      }
      return dat.day;
  }

  const change = (dtt) =>{
    for(let i = 0; i < rows.length; i++){
      let dt = new Date(rows[i].date);
      dt = {"month":dt.getMonth(),"year":dt.getFullYear(),"day":dt.getDate()};
      if(dt.day == dtt.value.getDate() && dt.month == dtt.value.getMonth() && dt.year == dtt.value.getFullYear()){
        toast.current.show({severity:'info', summary: 'Meeting with Supervisor',detail:`Time: ${rows[i].date.split('T')[0]}` +` / ${rows[i].date.split('T')[1]}`+'\n'+`${rows[i].link}`,lifetime:1000000});
      }
    }
    for(let i = 0; i < data.length; i++){
      let dt = new Date(data[i].deadline);
      dt = {"month":dt.getMonth(),"year":dt.getFullYear(),"day":dt.getDate()};
      if(dt.day == dtt.value.getDate() && dt.month == dtt.value.getMonth() && dt.year == dtt.value.getFullYear()){
        toast.current.show({severity:'warn', summary: 'Deadline',detail:`Time: ${data[i].deadline.split('T')[0]}` +` / ${data[i].deadline.split('T')[1]}`+'\n'+`${data[i].name}`,lifetime:1000000});
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
     <div className="Sides">
     <div className="leftSide">
      <Card className="card2" style={{marginTop:'0rem',width:'-webkit-fill-available'}}>
      <h4>Status: 
        <span className={`customer-badge status-general`} style={{marginLeft:'1rem'}}>{user ? user.last_status: null}</span>
      </h4>
          <Knob value={value} size={200} />
          <h3 className="mt-3">Completed</h3>
    </Card>  
    <div>

<Card className="card2" style={{width:'-webkit-fill-available',marginTop:'0rem'}}>
     <h3>Next Document: {countDown2 ? countDown2.name : ""}</h3>
     <h3>Deadline: {countDown2 ? countDown2.deadline.split('T')[0]+' / '+countDown2.deadline.split('T')[1] : ""}</h3>
          </Card>
      </div>
    <div>

<Card className="card2" style={{width:'-webkit-fill-available',marginTop:'0rem'}}>
     <h3>Total Remain Day</h3>
      <ProgressBar value={100-countDown} displayValueTemplate={displayValueTemplate} size={80} className="progressbar"/>
          </Card>
      </div>
      
      </div>

<div className="RightSide">
          <Card className="card2" style={{marginTop:'0rem',padding:'0rem 0rem',width:'-webkit-fill-available'}}>
            <h3>Calendar</h3>
          <Calendar style={{width:'85%'}} value={date} onChange={change} inline showButtonBar
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

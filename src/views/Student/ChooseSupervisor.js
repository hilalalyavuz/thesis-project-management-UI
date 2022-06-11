import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {DataGrid} from "@mui/x-data-grid";
import Sidebar from "../../components/Sidebar";
import '../../css/Common.css'
import '../../css/Documents.css'
import '../../css/ChooseSupervisor.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import Button from "@mui/material/Button";
import { Card } from '@mui/material';
import axios from 'axios';
import { createBrowserHistory } from 'history';   
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';
import { Toast } from 'primereact/toast';
import WrongPage from '../Warnings/WrongPage';

export default function Documents() {

  const [data,setData] = useState([]);
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  let userEmail = sessionStorage.getItem("email");
  const toast = useRef(null);
  let tok = sessionStorage.getItem("token");
  let choosed = sessionStorage.getItem("choosed");
  let created = sessionStorage.getItem("created");
  let requested = sessionStorage.getItem("requested");
  const [selectionModel, setSelectionModel] = useState([]);
  const [flag, setFlag] = useState();

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

  const submitSelection =(rowData)=>{
    let rem_cap = data.map(x => {if(x.id == selectionModel[0]){
      return x.remain_capacity;
    }});
    if(rem_cap[0] == 0){
      toast.current.show({severity:'warn', detail:"There is no remain capacity for selected supervisor", life: 3000});
    }else{
      axios.post(`https://localhost:7084/api/Student/Supervisor/${userEmail}`,{'supervisor_id':selectionModel[0]},config).then((result)=>{
            toast.current.show({severity:'success', detail:"Submitted", life: 3000});
            createBrowserHistory().push('/ChooseSupervisor');
            sessionStorage.setItem("requested",true);
            window.location.reload();

          }).catch(error =>{
            toast.current.show({severity:'error', detail:`${error}`, life: 3000});
        });
    }
    
  }

  useEffect(()=>{
    async function getData(){
        await axios.get(`https://localhost:7084/api/Student/Supervisor/${userEmail}`,config).then((result)=>{
            setData(result.data);
        });
    }
    getData();
    if(sessionStorage.getItem("requested")=="true"){
      setFlag(true);
    }else{
      setFlag(false);
    }
    setPageRole(sessionStorage.getItem("role"));

},[]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First Name", width: 130 },
    { field: "surname", headerName: "Last Name", width: 130 },
    { field: "remain_capacity", headerName: "Remain Capacity", width: 130 },
    { field: "capacity", headerName: "Capacity", width: 130 }
  ];

  return (
    <>
    <Toast ref={toast} />
    { pageRole=="student" ?
    <div className="Page">
    <Helmet>
      <title>Thesis Tracker | Choose Supervisor</title>
    </Helmet>
    <div className="Sidebar">
      <Sidebar dname='ChooseSup' />
    </div>

    <div className="Main" style={{display:'flex',flexDirection:'column'}}>
    { choosed=="false" ? (flag==false ? (created=="true" ? <div className="Main2">
          <Card className="card" style={{width:'80%',marginTop:'6rem'}}>
        <div className="table" style={{height:'30rem',width:'100%'}}>
        <h3 style={{paddingBottom:'2rem'}}>Choose Supervisor</h3>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            checkboxSelection
            selectionModel={selectionModel}
            hideFooterSelectedRowCount
            onSelectionModelChange={(selection) => {
              if (selection.length > 1) {
                const selectionSet = new Set(selectionModel);
                const result = selection.filter((s) => !selectionSet.has(s));

                setSelectionModel(result);
              } else {
                setSelectionModel(selection);
              }
            }}
          />
        </div>
        <div className="buttonArea">
        <Button variant="contained" style={{marginTop:'6rem',marginBottom:'1rem'}} onClick={submitSelection}>
                            SUBMIT
                          </Button>
        </div>
        </Card>
      </div> : <WrongPage data={"You should create a group before choosing supervisor"}/>) : <WrongPage data={"You already made your request"}/>) 
       : <WrongPage data={"You already have a supervisor"}/>}
    </div>
          
  </div> : <Unauthorized/>}
    </>
    
  );
}

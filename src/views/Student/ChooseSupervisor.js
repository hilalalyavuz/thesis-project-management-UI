import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGrid
} from "@mui/x-data-grid";
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

export default function Documents() {

  const [data,setData] = useState([]);

  useEffect(()=>{
    async function getData(){
        await axios.get('https://localhost:7084/api/User/supervisor').then((result)=>{
            setData(result.data);
        });
    }
    getData();

},[]);

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First Name", width: 130 },
    { field: "surname", headerName: "Last Name", width: 130 },
    { field: "remain_capacity", headerName: "Remain Capacity", width: 130 },
    { field: "capacity", headerName: "Capacity", width: 130 }
  ];

  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <div className="Page">
      <div className="Sidebar">
        <Sidebar />
      </div>

      <div className="Main" style={{display:'flex',flexDirection:'column'}}>
        <div className="Main2">
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
          <Button variant="contained" style={{marginTop:'6rem',marginBottom:'1rem'}}>
                              SUBMIT
                            </Button>
          </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

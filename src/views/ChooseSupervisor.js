import * as React from "react";
import { useState, useRef } from "react";
import {
  DataGrid
} from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import '../css/Common.css'
import '../css/Documents.css'
import '../css/ChooseSupervisor.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import Button from "@mui/material/Button";
import { Card } from '@mui/material';

export default function Documents() {
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
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <div className="Page">
      <div className="Sidebar">
        <Sidebar />
      </div>

      <div className="Main" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div className="Main2">
            <Card className="card">
          <div className="table">
          <h3>Choose Supervisor</h3>
            <DataGrid
              rows={rows}
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
          <div>
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

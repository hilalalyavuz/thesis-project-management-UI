import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import "../../css/Common.css";
import "../../css/Tasks.css";
import Sup_Sidebar from "../../components/Sup_Sidebar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';


export default function TransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [middle, setMiddle] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [dialog, setDialog] = useState(false);
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const [groups, setGroups] = useState([]);
  const [groupsNames, setGroupsNames] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState(null);
  const [id,setID] = useState();
  const [names,setNames] = useState(["All Groups"]);
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState("");
  const [selectedName, setSelectedName] = useState(null);
  const toast = useRef(null);

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };

  useEffect(()=>{
    async function getData(){
        await axios.get(`https://localhost:7084/api/Supervisor/Group/${userEmail}`,config).then((result)=>{
            for(var i = 0; i < result.data.length; i++){
              setGroups(oldArray => [...oldArray, result.data[i].id]);
              setGroupsNames(oldArray => [...oldArray, `Group ${result.data[i].id}`]);
            }
        });
    }
    getData();

},[]);


  const onGroupChange = (e) => {
    setSelectedGroups(e.value);
    setID(e.value.split("Group ")[1]);
  } 
  const onNameChange = (e) => {
    setSelectedName(e.value);
  } 

  const filter = ()=>{
    setLeft([]);
    setMiddle([]);
    setRight([]);
    setNames(["All Groups"]);
    axios.get(`https://localhost:7084/api/Supervisor/Group/Tasks/${id}`,config).then((result)=>{
            for(var i = 0; i < result.data.length; i++){
              if(result.data[i].status_id=="1"){
                setLeft(oldArray => [...oldArray, result.data[i]]);
              }else if(result.data[i].status_id=="2"){
                setMiddle(oldArray => [...oldArray, result.data[i]]);
              }else if(result.data[i].status_id=="3"){
                setRight(oldArray => [...oldArray, result.data[i]]);
              }
            }
        });
    axios.get(`https://localhost:7084/api/Supervisor/Group/Names/${userEmail}/${id}`,config).then((result)=>{
          setNames(oldArray => [...oldArray,selectedGroups]);
          result.data.map((x)=>{
            setNames(oldArray => [...oldArray,x]);
          });
    });

  }

  const handleToggle = (value) => () => {
    console.log(value)
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

    const actionDialog = () => {
        setDialog(true);
    }

    const saveAccordings = ()=>{
      if(selectedName != null && value2 != ""){
        axios.post(`https://localhost:7084/api/Supervisor/Group/Tasks/${userEmail}`,{'detail':value2,'assignTo':selectedName},config).then((result)=>{
          toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});

          }).catch(error => {
            toast.current.show({severity:'error', detail:`Error occured: ${error} `, life: 3000});
          });
          setDialog(false);
      }else{
        toast.current.show({severity:'warn', detail:`You must fill all fields in the form before Save.`, life: 3000});
      }
    }

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDialog(false)}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAccordings}/>
        </React.Fragment>
    );

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.detail}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <div className="Page">
      <Toast ref={toast} />
      <div className="Sidebar">
        <Sup_Sidebar />
      </div>
      <div className="Main">
          <div>
          <div style={{marginTop:'1rem',display:'flex',justifyContent:'center'}}>
                <Dropdown value={selectedGroups} options={groupsNames} onChange={onGroupChange} placeholder="Select a Group" />
                <Button label="Filter" aria-label="Submit" onClick={filter} />
                </div>
          </div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center',marginTop:'2rem'}}>
              <Button label="Create Task" className="p-button-raised p-button-success" icon="pi pi-plus" onClick={actionDialog}/>
          </div>
        <div> 
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item> <fieldset style={{border:'2px solid orange', borderRadius:'1rem'}}>
          <legend> <b>To Do</b> </legend>
          {customList(left)}
        </fieldset></Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              
            </Grid>
          </Grid>
          <Grid item> <fieldset style={{border:'2px solid green', borderRadius:'1rem'}}>
          <legend><b> In Progress</b> </legend>
          {customList(middle)}
        </fieldset></Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              
            </Grid>
          </Grid>
          <Grid item> <fieldset style={{border:'2px solid gray', borderRadius:'1rem'}}>
          <legend> <b>Done</b> </legend>
          {customList(right)}
        </fieldset></Grid>
        </Grid>
        </div> 
        <Dialog visible={dialog} style={{ width: '450px' }} header="Task Details" modal className="p-fluid" footer={docDialogFooter} onHide={()=>{setDialog(false)}}>
                <div className="field" style={{marginTop:"1rem"}}>
                    <label htmlFor="detail">Detail:</label>
                    <InputTextarea id="detail" onChange={(e) => setValue2(e.target.value)} required rows={3} cols={20} />
                </div>
                <div className="field" style={{marginTop:"1rem"}}>
                  <label htmlFor="assing">Assign To:</label>
                  <Dropdown value={selectedName} options={names} onChange={onNameChange} placeholder="Select to Assign" />
                </div>
                </Dialog> 
      </div>
    </div>
  );
}

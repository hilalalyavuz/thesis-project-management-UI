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
import { InputText } from "primereact/inputtext"


export default function TransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [middle, setMiddle] = React.useState([4, 5, 6, 7]);
  const [right, setRight] = React.useState([8, 9, 10, 11]);
  const [dialog, setDialog] = useState(false);
  const [value1,setValue1] = useState();
  const [value2,setValue2] = useState();


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

  const [selectedCity1, setSelectedCity1] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

    const actionDialog = () => {
        setDialog(true);
    }

    const docDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={()=>{setDialog(false)}} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=>{console.log("saved")}}/>
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
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <div className="Page">
      <div className="Sidebar">
        <Sup_Sidebar />
      </div>
      <div className="Main">
          <div>
          <div style={{marginTop:'1rem',display:'flex',justifyContent:'center'}}>
                <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a Group" />
                <Button label="Filter" aria-label="Submit"  />
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
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText id="title" onChange={(e) => setValue1(e.value)}></InputText>
                </div>
                <div className="field" style={{marginTop:"1rem"}}>
                    <label htmlFor="detail">Detail</label>
                    <InputTextarea id="detail" onChange={(e) => setValue2(e.value)} required rows={3} cols={20} />
                </div>
                </Dialog> 
      </div>
    </div>
  );
}

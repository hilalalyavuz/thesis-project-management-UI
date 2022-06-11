import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import "../../css/Common.css";
import "../../css/Tasks.css";
import Sidebar from "../../components/Sidebar";
import {useEffect , useState} from "react";
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [middle, setMiddle] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const [leftID, setLeftID] = React.useState([]);
  const [middleID, setMiddleID] = React.useState([]);
  const [rightID, setRightID] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const middleChecked = intersection(checked, middle);
  const rightChecked = intersection(checked, right);
  let id = "";
  let status_id = "";
  let detail = "";

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(currentIndex);
    if (newChecked.length == 0) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(newChecked);
  };

  const handleCheckedRight1 = () => {
    setMiddle(middle.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    id = leftChecked[0].id;
    status_id = "inprogress";
    detail = leftChecked[0].detail;
    axios.patch(`https://localhost:7084/api/Student/Tasks/Update/${userEmail}`,{'id':id,'detail':detail,'status_id':status_id},config).then((result)=>{
      console.log(result.data);
    })
  };

  const handleCheckedRight2 = () => {
    setRight(right.concat(middleChecked));
    setMiddle(not(middle, middleChecked));
    setChecked(not(checked, middleChecked));
    id = middleChecked[0].id;
    status_id = "done";
    detail = middleChecked[0].detail;
    axios.patch(`https://localhost:7084/api/Student/Tasks/Update/${userEmail}`,{'id':id,'detail':detail,'status_id':status_id},config).then((result)=>{
      console.log(result.data);
    })
  };
  

  const handleCheckedLeft1 = () => {
    setLeft(left.concat(middleChecked));
    setMiddle(not(middle, middleChecked));
    setChecked(not(checked, middleChecked));
    id = middleChecked[0].id;
    status_id = "todo";
    detail = middleChecked[0].detail;
    axios.patch(`https://localhost:7084/api/Student/Tasks/Update/${userEmail}`,{'id':id,'detail':detail,'status_id':status_id},config).then((result)=>{
      console.log(result.data);
    })
  };

  const handleCheckedLeft2 = () => {
    setMiddle(middle.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    id = rightChecked[0].id;
    status_id = "inprogress";
    detail = rightChecked[0].detail;
    axios.patch(`https://localhost:7084/api/Student/Tasks/Update/${userEmail}`,{'id':id,'detail':detail,'status_id':status_id},config).then((result)=>{
      console.log(result.data);
    })
  };

  useEffect(()=>{
    async function getData(){
        await axios.get(`https://localhost:7084/api/Student/Tasks/${userEmail}`,config).then((result)=>{
            for(var i = 0; i < result.data.length; i++){
              console.log(result.data);
              if(result.data[i].status_id=="todo"){
                setLeft(oldArray => [...oldArray, result.data[i]]);
              }else if(result.data[i].status_id=="in progress"){
                setMiddle(oldArray => [...oldArray, result.data[i]]);
              }else if(result.data[i].status_id=="done"){
                setRight(oldArray => [...oldArray, result.data[i]]);
              }
            }
        });
    }
    getData();
    setPageRole(sessionStorage.getItem("role"));

},[]);

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
    <>
    { pageRole=="student" ? 
    <div className="Page">
      <Helmet>
        <title>Thesis Tracker | Tasks</title>
      </Helmet>
      <div className="Sidebar">
        <Sidebar dname='Tasks' />
      </div>
      <div className="Main">
        <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop="0.5rem">
        
            <Grid item >
            <fieldset style={{border:'2px solid orange', borderRadius:'1rem'}}>
          <legend> To Do </legend>
          {customList(left)}
        </fieldset>
         </Grid>
          
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight1}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft1}
                disabled={middleChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <fieldset style={{border:'2px solid green', borderRadius:'1rem'}}>
          <legend> In Progress </legend>
          {customList(middle)}
        </fieldset>
         </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight2}
                disabled={middleChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft2}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item> <fieldset style={{border:'2px solid gray', borderRadius:'1rem'}}>
          <legend> Done </legend>
          {customList(right)}
        </fieldset> </Grid>
        </Grid>
      </div>
    </div> : <Unauthorized></Unauthorized>}
    </>
  );
}

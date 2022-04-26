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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [middle, setMiddle] = React.useState([4, 5, 6, 7]);
  const [right, setRight] = React.useState([8, 9, 10, 11]);

  const leftChecked = intersection(checked, left);
  const middleChecked = intersection(checked, middle);
  const rightChecked = intersection(checked, right);

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

  const handleCheckedRight1 = () => {
    setMiddle(middle.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedRight2 = () => {
    setRight(right.concat(middleChecked));
    setMiddle(not(middle, middleChecked));
    setChecked(not(checked, middleChecked));
  };
  

  const handleCheckedLeft1 = () => {
    setLeft(left.concat(middleChecked));
    setMiddle(not(middle, middleChecked));
    setChecked(not(checked, middleChecked));
  };

  const handleCheckedLeft2 = () => {
    setMiddle(middle.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };



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
        <Sidebar />
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
    </div>
  );
}

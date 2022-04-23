import * as React from 'react';
import {useState, useRef} from 'react'
import Sidebar from '../../components/Sidebar';
import '../../css/Common.css'
import '../../css/CreateGroup.css'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

export default function CreateGroup() {

    const toast = useRef(null);

    const [size, setSize] = useState();

    const [state2, setState2] = useState([]);
    const handleChange3 = (event) => {
        state2[(event.target.name)-1] = event.target.value;
        toast.current.show({ severity: 'info', summary: `${event.target.name}. Id Entered`, detail: `Id: ${event.target.value}`, life: 3000 });
      }
    
        const handleChange = (event) => {
        setSize(event.target.value);
        toast.current.show({ severity: 'info', summary: 'Group Size Selected', detail: `size: ${event.target.value}`, life: 3000 });
      }

      const handleChange2 = (event) => {
          console.log(state2)
        alert('Gönderilen değer: ' + state2);
        event.preventDefault();
      }
    

      const runCallback = (cb) => {
        return cb();
      };



    return(
        <>
        <div className='Page'>

<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
    
  <Toast ref={toast} />
  <Card className="card">
    <h3>Create Group</h3>
    <form onSubmit={handleChange2} style={{display:'flex', flexDirection:'column'}}>
    <Box sx={{ minWidth: 240 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
        </Select>
      </FormControl>
    </Box>

        {
        runCallback(() => {
          const row = [];
          for (var i = 1; i <= size; i++) {
            row.push(<TextField id="outlined-basic" label={`${i}. Id`} variant="outlined" name={i} key={i} inputProps={{ inputMode: 'numeric'}} onChange={handleChange3}/>);
          }
          return row;
        })
      }
      <Button type="submit" value="Submit" variant="contained">Submit</Button>
</form>
            
        
          
        
      </Card>  
    
  </div>
  
    


</div>

</div>

        





      </>
    )
}
import Sidebar from "../../components/Sidebar";
import "../../css/Common.css";
import '../../css/Home.css';
import { Knob } from "primereact/knob";
import { useState } from "react";
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import React from 'react';
import {Calendar} from 'primereact/calendar';
import { Helmet } from 'react-helmet';

const Home = () => {

  const displayValueTemplate = (value) => {
    return (
        <React.Fragment>
            {value}/<b>100</b>
        </React.Fragment>
    );
}
  const [value, setValue] = useState(60);
   return (
    <div className="Page">
      <Helmet>
        <title>Thesis Tracker | Home</title>
      </Helmet>
      <div className="Sidebar">
        <Sidebar dname='Home' />
      </div>

      <div className="Main" style={{flexDirection:'column'}}>
          <div className="title">
              <h3>DASHBOARD</h3> 
          </div>
     
      
<div className="prog">
    <Card className="card">
          <Knob value={value} size={200} />
          <h3 className="mt-3">Completed</h3>
    </Card>  
    <div>

<Card className="card" style={{width:'-webkit-fill-available'}}>
     <h3>Remain Day: 60 </h3>
      <ProgressBar value={40} displayValueTemplate={displayValueTemplate} size={80} className="progressbar"/>
          </Card>

          <Card className="card">
          <Calendar value={"Mon Apr 18 2022 00:00:00 GMT+0300 (GMT+03:00)"} onChange={(e) => console.log(e)} inline showWeek />

          </Card>
    </div>
     
         
        </div>

        
      </div>
    </div>
  );
};

export default Home;

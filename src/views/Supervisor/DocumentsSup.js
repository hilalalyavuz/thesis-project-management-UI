import React, { useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import Sup_Sidebar from '../../components/Sup_Sidebar';
import { Button } from 'primereact/button';
import { Table } from 'reactstrap';
import { Card } from '@mui/material';
import { InputText } from 'primereact/inputtext';

export default function DocumentSup(){
    
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [value1, setValue1] = useState('');
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
    
    return(
        <div className='Page'>
            <div className='Sidebar'>
                <Sup_Sidebar />
            </div>
            <div className='Main'>
                <div className='Main3'>
                <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a Group" />
                <Button label="Filter" aria-label="Submit"  />
                </div>
                <div>
                    <Card>
                    <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>View</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Save</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>View</td>
                        <td><Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a Group" /></td>
                        <td><InputText value={value1} onChange={(e) => setValue1(e.target.value)} /></td>
                        <td><Button label="Save" aria-label="Submit"  /></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    </tbody>
                </Table>

                    </Card>
                </div>
            </div>
        </div>
    );
}
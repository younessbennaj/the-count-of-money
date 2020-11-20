import React, { useState, useEffect } from 'react';
import axios from "axios";

//Devextreme table
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import ColorCell from '../components/devextreme/ColorCell';
//import ChangeCell from '../components/devextreme/ChangeCell';
import "../index.css";


const Dashboard = () => {

    
    const [data, setData] = useState([]);

    useEffect(() => {
        //with the real API
        // axios.get('http://localhost:5000/api')
        //   .then(response => {
        //     console.log(response.data);
        //     setMessage(response.data.message)
        //   })

        //With MSWJS actived
        axios.get('/crypto')
        .then(response => {
            setData(response.data.data);
        })
    }, []);
      

    return (
        <div>
            <DataGrid
                    id="gridContainer"
                    dataSource={data}
                    showBorders={true}
                    repaintChangesOnly={true}
                    highlightChanges={true}
            >
                <Column dataField="name" width={100}/>
                <Column dataField="last_updated" dataType="date" width={115} format="longTime" />
                <Column dataField="symbol" />
                <Column dataField="quote.USD.price" caption="Price" format="#0.####" dataType="number" />
                {/* <Column dataField="quote.USD.price" caption="µChange" dataType="number" width={140} format="#0.####" cellRender={ChangeCell} /> */}
                <Column dataField="quote.USD.percent_change_1h" caption="1h %" dataType="number" cellRender={ColorCell}/>
                <Column dataField="quote.USD.percent_change_24h" caption="24h %" dataType="number" cellRender={ColorCell}/>
                <Column dataField="quote.USD.percent_change_7d" caption="7 Days %" dataType="number" cellRender={ColorCell}/>
            </DataGrid>
        </div>
    );
}

export default Dashboard;
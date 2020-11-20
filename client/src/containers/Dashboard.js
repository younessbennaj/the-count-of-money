import React, { useState, useEffect } from 'react';
//import axios from "axios";

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
        // axios.get('/crypto')
        // .then(response => {
        //     setData({      
        //         data: response.data 
        //     });
        // })
        setData([
            {
                "id": 1,
                "name": "Bitcoin",
                "symbol": "BTC",
                "slug": "bitcoin",
                "cmc_rank": 1,
                "num_market_pairs": 500,
                "circulating_supply": 17200062,
                "total_supply": 17200062,
                "max_supply": 21000000,
                "last_updated": "2018-06-02T22:51:28.209Z",
                "date_added": "2013-04-28T00:00:00.000Z",
                "tags": [
                    "mineable"
                ],
                "platform": null,
                "quote": {
                    "USD": {
                        "price": 1818.1818,
                        "volume_24h": 7155680000,
                        "percent_change_1h": -0.152774,
                        "percent_change_24h": 0.518894,
                        "percent_change_7d": 0.986573,
                        "market_cap": 158055024432,
                        "last_updated": "2018-08-09T22:53:32.000Z"
                    },
                    "BTC": {
                        "price": 1,
                        "volume_24h": 772012,
                        "percent_change_1h": 0,
                        "percent_change_24h": 0,
                        "percent_change_7d": 0,
                        "market_cap": 17024600,
                        "last_updated": "2018-08-09T22:53:32.000Z"
                    }
                }
            }
        ])
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
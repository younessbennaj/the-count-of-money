import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//Devextreme table
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import ColorCell from '../components/devextreme/ColorCell';
import ImageCell from '../components/devextreme/ImageCell';

//CSS
import "../index.css";

const Dashboard = () => {

    const history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/cryptos')
            .then(response => {
                setData(response.data);
            })
    }, []);

    function rowClick(e) {
        if (e.rowType === "data") {
            history.push({
                pathname: '/cryptocurrency',
                state: { cryptoId: e.component.getKeyByRowIndex(e.rowIndex).id } //this.props.location.state.detail
            })
        }
    }


    return (
        <div>
            <DataGrid
                id="gridContainer"
                dataSource={data}
                showBorders={true}
                repaintChangesOnly={true}
                highlightChanges={true}
                onRowClick={rowClick}
            >
                <Column dataField="id" width={0} />
                <Column dataField="image" caption="" width={40} allowSorting={false} cellRender={ImageCell} />
                <Column dataField="name" width={100} />
                <Column dataField="current_price" caption="Price" format="#0.####" dataType="number" />
                {/* <Column dataField="quote.USD.price" caption="µChange" dataType="number" width={140} format="#0.####" cellRender={ChangeCell} /> */}
                <Column dataField="high_24h" caption="High 24h" dataType="number" cellRender={ColorCell} />
                <Column dataField="low_24h" caption="Low 24h" dataType="number" cellRender={ColorCell} />
            </DataGrid>
        </div>
    );
}

export default Dashboard;
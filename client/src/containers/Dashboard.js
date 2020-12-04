import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//Auth hook
import { useAuthContext } from "../hooks/use-auth"

//Devextreme table
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import ColorCell from '../components/devextreme/ColorCell';
import ImageCell from '../components/devextreme/ImageCell';

//CSS
import "../index.css";

const Dashboard = () => {

    //Get user auth state
    const auth = useAuthContext();

    const isAuth = auth.isAuth();


    const history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/cryptos')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [isAuth]); //If the user auth state change, then re fetch cryptos information

    function rowClick(e) {
        if (e.rowType === "data") {
            history.push({
                pathname: '/cryptocurrency',
                state: { cryptoId: e.component.getKeyByRowIndex(e.rowIndex).id } //this.props.location.state.detail
            })
        }
    }

    //Si l'utilisateur n'est pas connecté
    const filterValue = ['allowed', '=', true];
    //Si l'utilisateur est connecté
    //const filterValue = [['allowed', '=', true], ['myCrypto', '=', true]];

    return (
        <div>
            <DataGrid
                id="gridContainer"
                dataSource={data}
                defaultFilterValue={filterValue}
                showBorders={true}
                repaintChangesOnly={true}
                highlightChanges={true}
                onRowClick={rowClick}
            >
                <Column dataField="id" dataType="number" width={0} />
                <Column dataField="allowed" dataType="boolean" width={0} />
                <Column dataField="myCrypto" dataType="boolean" width={0} />
                <Column dataField="image" dataType="string" caption="" width={40} allowSorting={false} cellRender={ImageCell} />
                <Column dataField="name" dataType="string" width={100} />
                <Column dataField="current_price" dataType="number" caption="Price" format="#0.####"/>
                {/* <Column dataField="quote.USD.price" caption="µChange" dataType="number" width={140} format="#0.####" cellRender={ChangeCell} /> */}
                <Column dataField="high_24h" caption="High 24h" dataType="number" cellRender={ColorCell} />
                <Column dataField="low_24h" caption="Low 24h" dataType="number" cellRender={ColorCell} />
            </DataGrid>
        </div>
    );
}

export default Dashboard;
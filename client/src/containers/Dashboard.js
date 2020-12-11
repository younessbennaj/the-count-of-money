import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//Auth hook
import { useAuthContext } from "../hooks/use-auth"

//Devextreme table
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, { Column, Summary, TotalItem, Paging, Pager } from 'devextreme-react/data-grid';
import ColorCell from '../components/devextreme/ColorCell';
import ImageCell from '../components/devextreme/ImageCell';

//CSS
import "../index.css";

//Loading
import Loading from "../components/Loading";

const Dashboard = () => {

    //Get user auth state
    const auth = useAuthContext();
    const isAuth = auth.isAuth();

    //Get router history
    const history = useHistory();

    const [data, setData] = useState([]);

    //Filters
    var filters = [];

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

    if (isAuth)
        filters = [['allowed', '=', true], ['myCrypto', '=', false]];
    else
        filters = ['allowed', '=', true];

    if (data.length > 0) {
        return (
            <div>
                <DataGrid
                    id="gridContainer"
                    dataSource={data}
                    filterSyncEnabled={true}
                    defaultFilterValue={filters}
                    showBorders={true}
                    repaintChangesOnly={true}
                    highlightChanges={true}
                    onRowClick={rowClick}
                    selection={{ mode: 'none' }}
                >
                    <Column dataField="id" dataType="number" visible={false} />
                    <Column dataField="allowed" dataType="boolean" visible={false} />
                    <Column dataField="myCrypto" dataType="boolean" visible={false} />
                    <Column dataField="image" dataType="string" caption="" width={40} allowSorting={false} cellRender={ImageCell} />
                    <Column dataField="name" dataType="string" width={100} />
                    <Column dataField="current_price" dataType="number" caption="Price" format="#0.####" />
                    {/* <Column dataField="quote.USD.price" caption="µChange" dataType="number" width={140} format="#0.####" cellRender={ChangeCell} /> */}
                    <Column dataField="low_24h" caption="Low 24h" dataType="number" cellRender={ColorCell} />
                    <Column dataField="high_24h" caption="High 24h" dataType="number" cellRender={ColorCell} />
                    <Summary>
                        <TotalItem
                            displayFormat="Total : {0}"
                            showInColumn="name" />
                    </Summary>
                    <Paging defaultPageSize={8} />
                    <Pager
                        showPageSizeSelector={true}
                        allowedPageSizes={[8, 16, 32]}
                        showInfo={true} />
                </DataGrid>
            </div>
        );
    } else {
        return (
            <Loading />
        )
    }
}

export default Dashboard;
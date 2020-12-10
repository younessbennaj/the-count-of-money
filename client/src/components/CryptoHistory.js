import React, { useState, useEffect } from 'react';
import axios from "axios";

//Chart.js
import Chart from "chart.js";

//CSS
import "../index.css";

const CryptoHistory = (cryptoSymbol) => {

    const [symbol] = useState(cryptoSymbol.cryptoSymbol)
    const [period, setPeriod] = useState("daily");
    var myChart = null;

    var chartRef = React.createRef();

    useEffect(() => {
        
        axios.get('/cryptos/'+symbol+'/history/'+period)
        .then(response => {
            createGraph(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period]);

    function handleChange(e){
        myChart.destroy();
        setPeriod(e.target.value); 
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const createGraph = (datas) => {
        console.log(datas);
        const labels = datas.map(data => {
            let a = new Date(data.time * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = formatAMPM(a);
            if (period === "daily") {
                return date+' '+month;
            } else {
                return hour;
            }
        });
        const values = datas.map(data => {
            return data.open;
        });
        const ctx = chartRef.current.getContext("2d");
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    data: values,
                    borderWidth: 1,
                    lineTension: 0.3,
                    borderColor: 'rgba(59, 130, 246, 0.5);',
                    pointBackgroundColor: 'rgba(59, 130, 246, 0.5);',
                    backgroundColor: '#6366f1',
                    options: {
                        title: {
                            text: symbol,
                            display: true
                        }
                    }
                }]
            }
        });
    }

    return (
        <div style={{width: "100%", height: 600}}>
            <div className="w-24">
                <label className="block">
                    <span className="text-gray-700">Period</span>
                    <select value={period} onChange={handleChange} className="form-select block w-full mt-1">
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                        <option value="minute">Minute</option>
                    </select>
                </label>
            </div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default CryptoHistory;
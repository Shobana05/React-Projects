import 'bootstrap/dist/css/bootstrap.css';
import "../../App.css";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import CMRL from "../CMRL.json";
export default function CMRLDashboard() {
    // line graph
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [

                {
                    label: 'Forecasted',
                    data: CMRL.forecast.map((item) => item.value),
                    fill: false,
                    borderDash: [1, 3],

                    tension: 0.4,

                    borderColor: documentStyle.getPropertyValue('--gray-100')
                },
                {
                    label: 'Actual',
                    data: CMRL.actual.map((item) =>
                        item.value),
                    fill: true,
                    borderColor: "grey",
                    tension: 0.4,
                    backgroundColor: 'lightgray'

                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,

            plugins: {
                legend: {
                    labels: {
                        color: textColor,

                    }
                }
            },
            interaction: {
                mode: "index",
                intersect: true,
            },
            tooltips: {
                mode: "index",
                intersect: true,
            },


            hover: {
                mode: "nearest",
                intersect: false,
            },
            scales: {
                x: {
                    ticks: {
                        pointStyle: textColorSecondary

                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value) {
                            return '$' + value;
                        },
                        //  stepSize: 5000,
                        // min: 0,
                        // max: 40000,
                        color: textColorSecondary
                    },
                    grid: {
                        color: 'lightgray'
                    }
                },

            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    // bar graph
    const [chartData2, setChartData2] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [

                {
                    type: 'bar',
                    label: 'Vendor Bill',
                    backgroundColor: 'gray',
                    data: CMRL.vendor.map(item => item.value),
                    borderColor: 'gray',
                    borderWidth: 1
                },
                {
                    type: 'bar',
                    label: 'Revenue',
                    backgroundColor: 'black',

                    // borderColor: 'black',
                    data: CMRL.revenue.map(item => item.value),
                    borderColor: 'gray',
                }, {
                    type: 'line',
                    label: 'Profit',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),

                    borderDash: [1, 3],
                    fill: false,
                    tension: 0.4,
                    data: CMRL.profit.map(item => item.value),
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            interaction: {
                mode: "index",
                intersect: true,
            },
            tooltips: {
                mode: "index",
                intersect: true,
            },


            hover: {
                mode: "nearest",
                intersect: false,
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        callback: function (value) {
                            return '$' + value;
                        },
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData2(data);
        setChartOptions2(options);
    }, []);
    //FOR PIE CHART

    const [pieData, setPieData] = useState({});
    const [pieOptions, setPieOptions] = useState({});
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Ford', 'Agency', 'Purchase'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        'grey',
                        'black',
                        'lightslategray'
                    ],
                    hoverBackgroundColor: [
                        'wheat',
                        'wheat',
                        'wheat'
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            },
            interaction: {
                mode: "index",
                intersect: true,
            },
            tooltips: {
                mode: "index",
                intersect: true,
            },


            hover: {
                mode: "nearest",
                intersect: false,
            }
        };

        setPieData(data);
        setPieOptions(options);
    }, []);

    //FOR SECTOR DROPDOWN IN TABLE
    const [selectedSector, setSelectedSector] = useState("");

    const handleSelect = (event) => {
        setSelectedSector(event.target.value);

    };
    const filteredData = selectedSector ? CMRL.countDetails.filter((item) => item.sector === selectedSector) : CMRL.countDetails;

    return (
        <div className="cmrl">
            <div className="row">
                <div className="col-12 topic"> Team overview</div>

            </div>
            <div className='innercontent'>
                <div className='firstrow'>
                    <div className="row">

                        <div className="col-5  ">
                            <div className='headcount'>
                                {/* <div className='row header-cls'> */}
                                <div className="col-4">
                                    <p className='count'>
                                        {CMRL.totalHeadCount}
                                    </p>
                                    <p className='totalcount'>Total Head Count</p>
                                    <p>
                                        <a href="#" className='view'>View details</a>
                                    </p>

                                </div>
                                <div className="col-8">
                                    <div className="row ">
                                        {CMRL?.sourceResponseMap.map((data) => {
                                            return <>
                                                <div className="col-4">
                                                    <p className='ford'>{data.sourceType}</p>
                                                    <div className="progress">
                                                        <div class="progress-bar" style={{ width: data.percentage + '%' }} role="progressbar" ></div>
                                                    </div>
                                                    <div className='data'>
                                                        <p className='counts'>{data.count}</p>
                                                        <p className='percentage'>{data.percentage}%</p>
                                                    </div>
                                                </div>
                                            </>
                                        })}


                                    </div>
                                    <p className='line'></p>
                                    <div className="row ">
                                        {CMRL?.genderCount.map((data) => {
                                            return <>
                                                <div className="col-4">
                                                    <p className='ford'>{data.gender}</p>
                                                    <div className="progress">
                                                        <div class="progress-bar" style={{ width: data.percentage + '%' }} role="progressbar" ></div>
                                                    </div>
                                                    <div className='data'>
                                                        <p className='counts'>{data.count}</p>
                                                        <p className='percentage'>{data.percentage} %</p>
                                                    </div>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}



                        </div>
                        <div className="col-3">
                            <div className='budget'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='budgetdetail'>
                                            <p className='totalbudget'>Total Budget For Team</p>
                                            <p>
                                                <a href="#" className='view'>View details</a>
                                            </p>
                                        </div>
                                        < p className='budgetcount'>{CMRL.totalBudget}</p>

                                    </div>

                                </div>
                                <div className='row'>
                                    {CMRL?.budget.map((data) => {
                                        return (<div className='col-6'>
                                            <p className='spent'>{data.type}</p>
                                            {/* <div className="progress">
                                                <div className="progress-bar" style={{ width: data.percentage + '%' }} role="progressbar" ></div>

                                            </div> */}

                                            <div className='value'>
                                                <p className='counts'>{data.amount}</p>
                                                <p className='percentage'>({data.percentage}%)</p>
                                            </div>
                                        </div>

                                        )


                                    })}
                                    <div className='col'>


                                        <div className="progress">
                                            <div className="progress-bar bg-danger" style={{ width: CMRL.budgetPercent.spentPercent + '%' }} role="progressbar" ></div>
                                            <div className="progress-bar bg-success" style={{ width: CMRL.budgetPercent.remainPercent + '%' }} variant="success" role="progressbar" ></div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>

                      
                        <div className='col-4'>
                            <div className='resource'>
                                <div className='row1'>
                                    <div className='resourceDetail'>
                                        <p className='average'>Average Resource cost per hour </p>
                                        <p>
                                            <a href="#" className='view'>View details</a>
                                        </p>
                                    </div>
                                    <p className='amount'>${CMRL.averageResource}</p>

                                </div>
                                <div className='row'>

                                    {CMRL?.resource.map((data) => {
                                        return <>

                                            <div className="col-4">
                                                <ul>
                                                    <li>
                                                        <p className='ford'>{data.sourceType}</p>

                                                        <p className='count'>${data.cost}</p>
                                                    </li>
                                                </ul>

                                            </div>

                                        </>
                                    })}


                                </div>

                             



                            </div>

                        </div>

                    </div>
                </div>

                <div className='row 2 second'>
                    <div className='col-5 '>
                        <div className='fulltable'>
                            <div className='tableinfo'>

                                <p className='counts'>Head count Details</p>
                                <select onChange={handleSelect}>
                                    <option className='options' value="">
                                        All</option>
                                    <option className='options' value="IT">
                                        IT</option>
                                    <option className='options' value="Non-IT">
                                        Non-IT</option>
                                </select>
                                <select>
                                    <option className='options' >List view</option>
                                    <option className='options'>Graph view</option>
                                </select>
                            </div>

                            <div className='table-responsive'>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Team Details</th>
                                            <th scope="col">Direct </th>
                                            <th scope="col">Agency</th>
                                            <th scope="col">Purchase</th>
                                            <th scope="col">Total</th>
                                            <th scope="col" className='total'>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody className='tbody'>

                                        {filteredData.map((data) => {
                                            return (

                                                <tr>
                                                    <th scope="row"
                                                        className='role'>{data.role}</th>
                                                    <td>{data.ford}</td>
                                                    <td>{data.agency}</td>
                                                    <td>{data.purcharse}</td>
                                                    <td>{data.total}</td>
                                                    <td className='total'>{data.percentage}</td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>



                                    {/* <tr>
                                        <th scope="row" className='role'>PM</th>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>6%</td>
                                        <td className='total'>6</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Front end</th>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>6</td>
                                        <td>10%</td>
                                        <td className='total'>10</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Back end</th>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>9</td>
                                        <td>16%</td>
                                        <td>16</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Android</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30%</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Ios</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30%</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Testing</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30%</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Admin</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30%</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Sales</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30%</td>
                                        <td>50</td>
                                    </tr>
                                    <tr className='lastrow'>
                                        <th scope="row" className='role'>AMC Tech</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30%</td>
                                        <td>50</td>
                                    </tr> */}

                                </table>
                            </div>
                            {/* <Chart type="pie" data={pieData} options={pieOptions} /> */}

                        </div>
                    </div>



                    <div className='col-7 '>
                        <div className='row'>
                            <div className='col-12 '>
                                <div className='graph'>
                                    <p className='counts'>Cost Plan and Execution </p>

                                    <div className='chart'>
                                        <Chart type="line"
                                            data={chartData}
                                            options={chartOptions} />
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className='row'>
                            {/* REMOVING THE RESOURCE COST TABLE */}
                            {/* <div className='col-6'>
                                <div className='resource'>
                                    <p className='counts'>Resource cost </p>
                                    <table class="table table-bordered cost">
                                        <thead>
                                            <tr>
                                                <th scope="col">Price & details</th>
                                                <th scope="col">Month</th>
                                                <th scope="col">Day</th>
                                                <th scope="col">Hour</th>

                                            </tr>
                                        </thead>
                                        {CMRL?.resource.map((data) => {
                                            return (

                                                <tbody>

                                                    <tr>
                                                        <th scope="row"
                                                            className='role'>{data['Price & details']}</th>
                                                        <td>{data.Month}</td>
                                                        <td>{data.Day}</td>
                                                        <td>{data.Hour}</td>

                                                    </tr>

                                                </tbody>
                                            )
                                        })}

                                    </table>


                                    {/* <tr>
                                        <th scope="row" className='role'>Agency</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>

                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Purchase</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>

                                    </tr>
                                    <tr>
                                        <th scope="row" className='role'>Average</th>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>

                                    </tr> */}





                            {/* </div>

                            </div> */}
                            <div className='col-12'>
                                <div className='vendor'>
                                    <p >Vendor-Operations</p>


                                    <div className="chart">
                                        <Chart type="line" data={chartData2} options={chartOptions2} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >



    )
}
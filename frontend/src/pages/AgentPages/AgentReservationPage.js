/* React */
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/* Components */
import Navbar from "../MainPages/Navbar";
import Calendar from 'react-calendar';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

/* Utilities */
import moment from "moment";

/* Styles */
import 'react-calendar/dist/Calendar.css';
import '../../styles/styles.css'

function AgentReservationPage()
    {
    const { state: destination } = useLocation()
    const [ reservationsArray, setReservationsArray ] = useState([] )
    const [ reservationsMap, setReservationsMap ] = useState( [] )

    const emptyMap = new Map([ [  0, 0 ],
        [  1, 0 ],  [  2, 0 ], [  3, 0 ], [  4, 0 ],  [  5, 0 ], [  6, 0 ],
        [  7, 0 ],  [  8, 0 ], [  9, 0 ], [ 10, 0 ],  [ 11, 0 ] ] );

    /* For the plot to show */
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const mapToObjArr = ( _map ) =>
        {
        return Array.from( _map, ([key, value]) => ( value ));
        }

    useEffect( () =>
        {
        getReservations();
        }, [] );

    /* HTTP Requests */
    const getReservations = () =>
        {
        const requestOptions
            =  {
            method: 'GET',
        };

        let fetch_str = `https://localhost:8000/api/v1/reservations?location=${ destination.pk }`;
        fetch( fetch_str, requestOptions )
            .then( ( res ) => {
            if( !res.ok )
                {
                return( res.text().then( text => { throw new Error( text ? text : "Error" ) } ) );
                }
            return( res.json() );
            })
            .then( ( res ) => {
                setReservationsArray( res );
                let tmp_map = emptyMap
                for( let i = 0; i < res.length; i++ )
                    {
                    tmp_map.set( moment( res[ i ].fields.date_start ).month(), tmp_map.get( moment( res[ i ].fields.date_start ).month() ) + 1 )
                    }
                setReservationsMap( mapToObjArr( tmp_map ) )
            })
            .catch( ( err ) => {
                setReservationsArray( [] );
                alert( err )
            })
        }

    const tileContent = ({ date, view }) =>
        {
        for ( let i = 0; i < reservationsArray.length; i++)
            {
            if( moment( date ).isBetween( reservationsArray[ i ].fields.date_start, reservationsArray[ i ].fields.date_end, null, '[)' ) )
                {
                return <div className = { "scheduled" }>*</div>;
                }
            }
        }

    return(
        <div className={"reservation-page"} >
            <Navbar></Navbar>
            <div className = { "reservation-container" } >
                <div className="table-container">
                    <div className={ "table-title" } > Reservations for { destination.fields.name } </div>
                    <table>
                        <thead>
                        <tr>
                            <th className="left-align">Date created</th>
                            <th className="left-align">Start date</th>
                            <th className="left-align">End date</th>
                            <th className="left-align">Client</th>
                            <th className="left-align">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            reservationsArray &&
                            reservationsArray.map( item => (
                                <tr key={ item.pk }>
                                    <td>{ item.fields.date_made }</td>
                                    <td>{ item.fields.date_start }</td>
                                    <td>{ item.fields.date_end }</td>
                                    <td>{ item.fields.person }</td>
                                    <td>{ item.fields.price }</td>
                                </tr>
                            ) )
                        }
                        </tbody>
                    </table>
                </div>
                <div className={ "reservation-right-col" }>
                    <div className="line-chart">
                        <Line
                            data={
                                {
                                    labels: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                                    datasets:
                                        [
                                            {
                                                data: Object.values( reservationsMap ),
                                                backgroundColor: "rgb(255, 99, 132)",
                                                pointBackgroundColor: "black",
                                                borderColor: 'black',
                                                responsive: false
                                            },
                                        ],
                                }
                            }
                            options={
                                {
                                    maintainAspectRatio: false,
                                    plugins:
                                        {
                                            legend: { display: false },
                                            title: { display: true, text: 'Monthly reservations', color: 'black' }
                                        },
                                    scales: {
                                        x: {
                                            ticks: {
                                                color: 'black'
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                color: 'black'
                                            }
                                        }
                                    }
                                }
                            }
                        />
                    </div>
                    <div className={ "calendar-container" }>
                        <Calendar
                            value={ new Date() }
                            tileContent={ tileContent }
                        >
                        </Calendar>
                    </div>
                </div>

            </div>
        </div>
    )
    }

export default AgentReservationPage
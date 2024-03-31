import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

import 'react-calendar/dist/Calendar.css';
import '../../styles/styles.css'
import moment from "moment";
import Navbar from "../MainPages/Navbar";

function AgentReservationPage()
    {
    const { state: destination } = useLocation()
    const [ reservationsArray, setReservationsArray ] = useState([])
    const emptyMap = new Map([ [  0, 0 ],
        [  1, 0 ],  [  2, 0 ], [  3, 0 ], [  4, 0 ],  [  5, 0 ], [  6, 0 ],
        [  7, 0 ],  [  8, 0 ], [  9, 0 ], [ 10, 0 ],  [ 11, 0 ] ] );
    const [ reservationsMap, setReservationsMap ] = useState( [] )

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const _idxToMonth = ( _idx ) =>
        {
        switch (_idx)
            {
            case  0: return "January";
            case  1: return "February";
            case  2: return "March";
            case  3: return "April";
            case  4: return "May";
            case  5: return "June";
            case  6: return "July";
            case  7: return "August";
            case  8: return "September";
            case  9: return "October";
            case 10: return "November";
            case 11: return "December";
            default: return ""
            }
        }

    const mapToObjArr = ( _map ) =>
        {
        let map_tmp = new Map()
        _map.forEach( ( value, key ) => map_tmp.set( _idxToMonth( key ), value ) )
        console.log( map_tmp )
        return Array.from( map_tmp, ([key, value]) => ( value ));
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

        let fetch_str = `http://localhost:8000/api/v1/reservations?location=${ destination.pk }`;
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
            <div className="table-container">
                <div> View reservations for { destination.fields.name } </div>
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
                <div>
                    <Calendar
                        value={ new Date() }
                        tileContent={ tileContent }
                    >
                    </Calendar>
                </div>

                <div className="line-chart">
                    <Line
                        data={
                            {
                                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
                                        title: { display: true, text: 'Monthly reservations' }
                                    }
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
    }

export default AgentReservationPage
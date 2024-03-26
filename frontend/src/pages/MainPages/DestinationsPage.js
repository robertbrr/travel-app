/* React */
import { useEffect, useState } from "react";

/* Components */
import MainSidebar from "./MainSidebar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { dateFromDateTime, getTomorrowDate } from "../../utilities/utilities";
import dayjs from 'dayjs';
import mockDest from "../../images/destinations/liberty.jpg"

/* Styles */
import "../../styles/background.css"
import { isAgentLoggedIn } from "../../utilities/UserSession";
import { useLocation } from "react-router-dom";


function DestinationsPage()
    {
    /* constants */
    const [ from, setFrom ] = useState( dateFromDateTime( new Date() ) );
    const [ to, setTo ] = useState( dateFromDateTime( new Date() ) );
    const { state: locationName } = useLocation();
    const [ destinationsArray, setDestinationsArray ] = useState( [] );

    useEffect( () =>
        {
        getLocations()
        }, [] );

    /* HTTP Requests */
    const getLocations = () =>
        {
        const requestOptions
            =  {
            method: 'GET',
        };

        let fetch_str = `http://localhost:8000/api/v1/destinations`;
        if( locationName !== null && locationName !== '' )
            {
            fetch_str = fetch_str + `?location=${locationName}`
            }

        fetch( fetch_str, requestOptions )
            .then( ( res ) => {
                if( !res.ok )
                    {
                    return( res.text().then( text => { throw new Error( text ? text : "Error" ) } ) );
                    }
                return( res.json() );
            })
            .then( ( res ) => {
                setDestinationsArray( res );
            })
            .catch( ( err ) => {
                setDestinationsArray( [] );
            })
        }

    const buildDestinationDiv = ( _destination ) =>
        {
        return(
            <div className = { "destination-item" }>
                <img src = { _destination.url } alt = "dest-pic" className = { "destination-item-pic" } />
                <div className = "destination-item-name">{ _destination.name }</div>
                <div className = "destination-item-loc">{ _destination.location }</div>
                {
                isAgentLoggedIn() &&
                 <div> PPEI </div>
                }
            </div>
            )
        }


    /* Date handlers */
    const setFromHandler = ( _date ) =>
        {
        setFrom( dateFromDateTime( _date ) );
        }

    const setToHandler = ( _date ) =>
        {
        setTo( dateFromDateTime( _date ) );
        }

    const disableDatesBeforePresent = ( _date ) =>
        {
        return( dayjs( _date ).isBefore( dateFromDateTime( new Date() ) ) );
        }

    const disableDatesBeforeFrom = ( _date ) =>
        {
        return( dayjs( dateFromDateTime( _date ) ).isBefore( from ) );
        }

    /* JSX */
    return(
        <div className = "destinations-page">
            <MainSidebar></MainSidebar>
            <div className = "dates-container" >
                <div className = "date-container">
                    <label>Start Date</label>
                    <LocalizationProvider dateAdapter = { AdapterDayjs } >
                        <DemoContainer components = { [ 'DatePicker' ] }>
                            <DatePicker
                                defaultValue = { dayjs( dateFromDateTime( new Date() ) ) }
                                shouldDisableDate = { ( e ) => disableDatesBeforePresent( e.$d ) }
                                onChange = { ( e ) => setFromHandler( e.$d ) }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className = "date-container" >
                    <label>End Date</label>
                    <LocalizationProvider dateAdapter = { AdapterDayjs } >
                        <DemoContainer components = { [ 'DatePicker' ] }>
                            <DatePicker
                                defaultValue = { dayjs( dateFromDateTime( getTomorrowDate() ) ) }
                                shouldDisableDate = { ( e ) => disableDatesBeforeFrom( e.$d ) }
                                onChange = { ( e ) => setToHandler( e.$d ) }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            <div className = "destinations-container" >
                {
                destinationsArray.map( ( dest ) =>
                    {
                    return( buildDestinationDiv( dest.fields ) )
                    })
                }
            </div>
        </div>
    );
    }

export default DestinationsPage;
/* React */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Components */
import Navbar from "./Navbar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { dateFromDateTime, getTomorrowDate } from "../../utilities/utilities";
import dayjs from 'dayjs';

/* Utilities */
import { isAgentLoggedIn, isClientLoggedIn } from "../../utilities/UserSession";

/* Styles */
import "../../styles/background.css"
import "../../styles/styles.css"


function DestinationsPage( { offer_filter } )
    {
    /* constants */
    const navigate = useNavigate()
    const [ from, setFrom ] = useState( dateFromDateTime( new Date() ) );
    const [ to, setTo ] = useState( dateFromDateTime( getTomorrowDate() ) );
    const { state: locationName } = useLocation();
    const [ destinationsArray, setDestinationsArray ] = useState( [] );

    useEffect( () =>
        {
        getLocations()
        }, [] );

    useEffect( () =>
        {
        getLocations()
        }, [ to, from ] );

    /* HTTP Requests */
    const getLocations = () =>
        {
        const requestOptions
            =  {
            method: 'GET',
            };

        let fetch_str = `http://localhost:8000/api/v1/destinations?start=${from}&end=${to}`;
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
                if( offer_filter === true )
                    {
                    res = res.filter( e => e.fields.percentage_offer != 0 )
                    }
                setDestinationsArray( res );
            })
            .catch( ( err ) => {
                setDestinationsArray( [] );
                alert( err )
            })
        }

    const deleteById = ( _id ) =>
        {
        const requestOptions
            =  {
            method: 'DELETE',
            };

        fetch( `http://localhost:8000/api/v1/destinations?id=${ _id }`, requestOptions )
            .then( ( res ) => {
            if( !res.ok )
                {
                return( res.text().then( text => { throw new Error( text ? text : "Error" ) } ) );
                }
            })
            .then( () => {
                alert( "Successfully deleted." );
                getLocations();
            })
            .catch( ( err ) => {
                alert( "Failed to delete destination" );
            })
        }

    /* Button handlers */
    const deleteDestinationHandler = ( _id ) =>
        {
        if( window.confirm( "Are you sure you want to delete the selected destination?" ) )
            {
            deleteById( _id )
            }
        }

    const scheduleHandler = ( _destination ) =>
        {
        const requestOptions
            =  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    destination_id: _destination.pk,
                    date_start: from,
                    date_end: to,
                    price: ( 1.0 - parseFloat( _destination.fields.percentage_offer ) / 100.0 ) * dayjs( to ).diff( from, 'day' ) * parseFloat( _destination.fields.price_nightly )
                })
        };

        fetch( `http://localhost:8000/api/v1/reservations`, requestOptions )
            .then( ( res ) => {
                if( !res.ok )
                    {
                    return( res.text().then( text => { throw new Error( text ? text : "Error" ) } ) );
                    }
            })
            .then( () => {
                alert( "Successfully scheduled." );
                getLocations();
            })
            .catch( ( err ) => {
                alert( "Failed to schedule." );
            })
        }

    /* Div helper */
    const buildDestinationDiv = ( _destination ) =>
        {
        return(
            <div className = { "destination-item" }>
                <img src = { _destination.fields.path_img } alt = "dest-pic" className = { "destination-item-pic" } />
                <div className = "destination-item-name">{ _destination.fields.name }, { _destination.fields.location }</div>
                <div className = "destination-item-loc">Price: { _destination.fields.price_nightly }$ </div>
                <div className = "destination-item-loc">Spots left: { _destination.fields.spots_available } </div>
                {
                _destination.fields.percentage_offer != 0 &&
                <div className="destination-item-loc">{ _destination.fields.percentage_offer }% off </div>
                }
                {
                _destination.fields.percentage_offer == 0 &&
                <div className="destination-item-loc">Full price </div>
                }
                <div className={ "crud-bttn-ctnr" } >
                    {
                    isAgentLoggedIn() &&
                    <button type = "crud" onClick = { () => { navigate( "/destinations/edit", { state: _destination } ) } }> Edit </button>
                    }
                    {
                    isAgentLoggedIn() &&
                    <button type = "crud" onClick = { () => deleteDestinationHandler( _destination.pk ) } > Delete </button>
                    }
                    {
                    isClientLoggedIn() &&
                    <button type = "crud" onClick = { () => scheduleHandler( _destination ) } > Schedule </button>
                    }
                 </div>


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
            <Navbar></Navbar>
            <div className = "dates-container" >
                <div className = "date-container">
                    <label>Start Date</label>
                    <LocalizationProvider dateAdapter = { AdapterDayjs } >
                        <DemoContainer components = { [ 'DatePicker' ] }>
                            <DatePicker
                                 value={ dayjs( from ) }
                                // defaultValue = { dayjs( dateFromDateTime( new Date() ) ) }
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
                                 value = { dayjs( to ) }
                                // defaultValue = { dayjs( dateFromDateTime( getTomorrowDate() ) ) }
                                shouldDisableDate = { ( e ) => disableDatesBeforeFrom( e.$d ) }
                                onChange = { ( e ) => setToHandler( e.$d ) }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                {
                isAgentLoggedIn() &&
                    <button  type = "create-dest"  onClick = { () => { navigate( "/destinations/add" ) } }>Create</button>
                }

            </div>
            <div className = "destinations-container" >
                {
                destinationsArray.map( ( dest ) =>
                    {
                    return( buildDestinationDiv( dest ) )
                    })
                }
            </div>
        </div>
    );
    }

export default DestinationsPage;
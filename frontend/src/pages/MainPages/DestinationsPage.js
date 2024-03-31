/* React */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Components */
import Navbar from "./Navbar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

/* Utilities */
import { getCurrentUserData, isAgentLoggedIn, isClientLoggedIn } from "../../utilities/UserSession";

/* Styles */
import { getTomorrowDate } from "../../utilities/utilities";
import "../../styles/background.css"
import "../../styles/styles.css"


function DestinationsPage( { offer_filter } )
    {
    /* constants */
    const navigate = useNavigate()
    const [ from, setFrom ] = useState( dayjs( new Date() ) );
    const [ to, setTo ] = useState( dayjs( getTomorrowDate() ) );
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

        let fetch_str = `http://localhost:8000/api/v1/destinations`;

        /* Filter only for clients ( logged in or not )*/
        if( !isAgentLoggedIn() )
            {
            fetch_str = fetch_str + `?start=${from}&end=${to}`
            }

        /* Filter by location only if specified */
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
                /* Filter by offers only if specified */
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
    const viewReservationsHandler = ( _location ) =>
        {
        navigate( "/reservations", { state: _location } )
        }

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
                    person_id: getCurrentUserData().id,
                    date_start: from.format("YYYY-MM-DD"),
                    date_end: to.format("YYYY-MM-DD"),
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
                    isAgentLoggedIn() &&
                    <button type = "crud" onClick = { () => viewReservationsHandler( _destination ) } > Reservations </button>
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
        setFrom( dayjs( _date ));
        }

    const setToHandler = ( _date ) =>
        {
        setTo( dayjs( _date ) );
        }

    const disableDatesBeforePresent = ( _date ) =>
        {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        return( dayjs( _date ).isBefore( dayjs( today ) ) );
        }

    const disableDatesBeforeFrom = ( _date ) =>
        {
        return( dayjs( _date ) ).isBefore( dayjs( from ) );
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
                                value={ from  }
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
                                value = { to }
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
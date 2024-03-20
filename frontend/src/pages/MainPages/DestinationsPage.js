/* React */
import { useState } from "react";

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


function DestinationsPage()
    {
    /* constants */
    const [ from, setFrom ] = useState( dateFromDateTime( new Date() ) );
    const [ to, setTo ] = useState( dateFromDateTime( new Date() ) );

    const mockDestinations =
        [
        { name: "Destination0", location: "Location0", url: mockDest },
        { name: "Destination1", location: "Location1", url: mockDest },
        { name: "Destination2", location: "Location2", url: mockDest },
        { name: "Destination3", location: "Location3", url: mockDest },
        { name: "Destination4", location: "Location4", url: mockDest },
        { name: "Destination5", location: "Location5", url: mockDest },
        { name: "Destination6", location: "Location6", url: mockDest }
        ]

    const buildDestinationDiv = ( _destination ) =>
        {
        return(
            <div className = { "destination-item" }>
                <img src = { _destination.url } alt = "dest-pic" className = { "destination-item-pic" } />
                <div className = "destination-item-name">{ _destination.name }</div>
                <div className = "destination-item-loc">{ _destination.location }</div>
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
                mockDestinations.map( (dest) =>
                    {
                    return( buildDestinationDiv( dest ) )
                    })
                }
            </div>
        </div>
    );
    }

export default DestinationsPage;
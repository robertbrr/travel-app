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

/* Styles */
import "../../styles/background.css"


function DestinationsPage()
    {
    /* constants */
    const [ from, setFrom ] = useState( dateFromDateTime( new Date() ) );
    const [ to, setTo ] = useState( dateFromDateTime( new Date() ) );

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
        </div>
    );
    }

export default DestinationsPage;
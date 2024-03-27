/* Components */
import Navbar from "./Navbar";

/* Styles */
import "../../styles/background.css"
import { useEffect, useState } from "react";


function MainPage()
    {

    const [geoLoc, setGeoLoc ] = useState( {} )

    useEffect( () =>
        {
        requestGeoLocation();
        }, [] );

    useEffect( () =>
        {
        localStorage.setItem( "GPS location", JSON.stringify( { lat: geoLoc.latitude, lon: geoLoc.longitude } ) )
        }, [ geoLoc ] );

    const requestGeoLocation = () =>
        {
        if( navigator.geolocation )
            {
            navigator.geolocation.getCurrentPosition(
                ( _location) =>
                    {
                    setGeoLoc( _location.coords )
                    },
                ( _ ) =>
                    {
                    alert( "Failed to get your geolocation" );
                    }
                )
            }
        }

    /* JSX */
    return(
        <div className = "main-page">
            <Navbar></Navbar>
            <div style = { { paddingTop: "250px" } } ></div>
            <div className = { "intro-text" }> Wander. Explore. Discover </div>
            <div className = { "intro-text" }> Welcome to Globert Travel - Your passport to adventure! </div>
            <div className = { "copyright" }>Image by <a href="https://www.freepik.com/free-photo/composition-toy-airplane-passport-plant-leaves_4636248.htm#query=travel%20background&position=37&from_view=keyword&track=ais&uuid=62a6b086-5409-4903-96d2-1f1e0b1101c4">Freepik</a></div>
        </div>
        );
    }

export default MainPage;
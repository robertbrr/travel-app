/* This module is used for storing and retrieving the current user data */

/* Setters */
export function setCurrentUserData( user )
    {
    sessionStorage.setItem( "userID", JSON.stringify( user ) )
    }

/* Getters */
export function getCurrentUserData()
    {
    return( JSON.parse( sessionStorage.getItem( "userID" ) ) );
    }


/* Clear Data */
export function clearUserData()
    {
    sessionStorage.clear()
    }

/* Status */
export function isClientLoggedIn()
    {
    let currentUser = getCurrentUserData();
    return( !( ( currentUser === null ) || ( String( currentUser.role )!== "CL" ) ) )
    }

export function isAgentLoggedIn()
    {
    let currentUser = getCurrentUserData();
    return( !( ( currentUser === null ) || ( String( currentUser.role ) !== "AG" ) ) )
    }


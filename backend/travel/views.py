from django.http import HttpResponse, HttpResponseBadRequest
from .model_handlers import DestinationHandler, UserHandler, ReservationHandler

import json

#-----------------------------------------------------------------------------------------------------------------------
#                                           DESTINATIONS ENDPOINTS
#-----------------------------------------------------------------------------------------------------------------------
def crud_destination( _request ):
    if _request.method == "GET":
        try:
            # Filter by location if specified
            _location = _request.GET.get( 'location', '' )
            if _location == '':
                # Filter by availability if specified
                _date_start = _request.GET.get('start', '')
                _date_end = _request.GET.get('end', '')
                if _date_end != '' and _date_start != '':
                    return HttpResponse( DestinationHandler.ToJSONArray( DestinationHandler.getAvailable( _date_start,
                                                                                                          _date_end) ),
                                         content_type="application/json" )
                else:
                    return HttpResponse( DestinationHandler.AllToJSON(), content_type = "application/json" )
            else:
                    return HttpResponse( DestinationHandler.ToJSONArray( DestinationHandler.GetByLocation( _location )),
                                         content_type = "application/json" )
        except Exception as exc:
            return HttpResponseBadRequest( "Failed to get destinations. {}".format( str( exc ) ) )
    elif _request.method == "POST":
        try:
            destination = DestinationHandler.LoadJSON( json.loads( _request.body ) )
            DestinationHandler.Save( destination )
            return HttpResponse( "Successfully saved!" )
        except Exception as exc:
            return HttpResponseBadRequest( "Failed to save destination. {}".format( str( exc ) ) )
    elif _request.method == "PUT":
        try:
            DestinationHandler.Save( DestinationHandler.LoadJSON( json.loads( _request.body ) ) )
            return HttpResponse( "Successfully updated!" )
        except Exception as exc:
            return HttpResponseBadRequest( "Failed to update destination. {}".format( str( exc ) ) )
    elif _request.method == "DELETE":
        try:
            DestinationHandler.DeleteById( _request.GET.get( 'id', '' ) )
            return HttpResponse( "Successfully deleted!" )
        except Exception as exc:
            return HttpResponseBadRequest( "Failed to delete destination. {}".format( str( exc ) ) )
    elif _request.method == "OPTIONS":
        return HttpResponse( status = 200 )
    return HttpResponseBadRequest( "Bad request." )


#-----------------------------------------------------------------------------------------------------------------------
#                                           LOGIN AND REGISTER ENDPOINTS
#-----------------------------------------------------------------------------------------------------------------------
def login( _request ):
    if _request.method == "POST":
        try:
            return HttpResponse( UserHandler.LoginValidate( json.loads( _request.body )  ),
                                 content_type = "application/json" )
        except Exception as exc:
            return HttpResponseBadRequest( "Error logging in. {}".format( str( exc ) ) )
    elif _request.method == "OPTIONS":
        return HttpResponse( status = 200 )
    return HttpResponseBadRequest( "Bad request." )

def register( _request ):
    if _request.method == "POST":
        try:
            return HttpResponse( UserHandler.Register( json.loads( _request.body ) ),
                                 content_type = "application/json" )
        except Exception as exc:
            return HttpResponseBadRequest( "Error creating account. {}".format( str( exc ) ) )
    elif _request.method == "OPTIONS":
        return HttpResponse( status = 200 )
    return HttpResponseBadRequest( "Bad request." )


#-----------------------------------------------------------------------------------------------------------------------
#                                           RESERVATIONS ENDPOINTS
#-----------------------------------------------------------------------------------------------------------------------
def crud_reservation( _request ):
    if _request.method == "POST":
        try:
            json_dict = json.loads( _request.body )
            destinationToUpdate = DestinationHandler.LoadExisting( json_dict[ "destination_id" ] )
            destinationToUpdate.spots_available = destinationToUpdate.spots_available - 1
            ReservationHandler.Save( ReservationHandler.LoadJSON( json_dict ) )
            DestinationHandler.Save( destinationToUpdate )
            return HttpResponse( "Successfully created appointment!" )
        except Exception as exc:
            return HttpResponseBadRequest( "Failed to create appointment. {}".format(str(exc)))
    elif _request.method == "OPTIONS":
        return HttpResponse( status = 200 )
    return HttpResponseBadRequest( "Bad request." )
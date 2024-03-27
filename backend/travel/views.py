from django.http import HttpResponse, HttpResponseBadRequest
from .model_handlers import DestinationHandler, UserHandler

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
                return HttpResponse( DestinationHandler.AllToJSON(), content_type = "application/json" )
            else:
                return HttpResponse( DestinationHandler.ToJSONArray( DestinationHandler.GetByLocation( _location )),
                                     content_type = "application/json" )
        except Exception as exc:
            return HttpResponseBadRequest( "Failed to get destination. {}".format( str( exc ) ) )
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

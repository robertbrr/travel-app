import datetime
import json

from .models import Destination, User, Reservation
from django.core import serializers


#-----------------------------------------------------------
#                 DESTINATIONS HANDLER
#-----------------------------------------------------------
class DestinationHandler:
    @staticmethod
    def LoadJSON( _dictionary ):
        destination = Destination()
        for key in _dictionary.keys():
            destination.__setattr__( key, _dictionary[ key ] )
        return destination

    @staticmethod
    def LoadExisting( _id ):
        return Destination.objects.get( pk = _id )

    @staticmethod
    def ToJSON( _destination ):
        return serializers.serialize( "json", [ _destination ] )

    @staticmethod
    def Save( _destination ):
        _destination.save()

    @staticmethod
    def DeleteById( _id ):
        Destination.objects.filter( id = _id ).delete()

    @staticmethod
    def AllToJSON():
        return serializers.serialize( "json", Destination.objects.all() )

    @staticmethod
    def GetByLocation( _location ):
        return Destination.objects.filter( location__icontains = _location )

    @staticmethod
    def ToJSONArray( _destinations ):
        return serializers.serialize( "json", _destinations )

    @staticmethod
    def getAvailable( _date_start, _date_end ):
        destinationsAll = Destination.objects.all()
        destinationsAvailable = []
        for destination in destinationsAll:
            if destination.spots_available <= 0:
                continue
            if destination.spots_available >= 1:
                destinationsAvailable.append(destination)
                continue
            if ReservationHandler.OverlapExists( datetime.datetime.strptime( _date_start, "%Y-%m-%d" ).date(),
                                                 datetime.datetime.strptime( _date_end, "%Y-%m-%d" ).date(),
                                                 destination.pk ):
                continue
            destinationsAvailable.append( destination )

        return destinationsAvailable




#-----------------------------------------------------------
#                      USERS HANDLER
#-----------------------------------------------------------
class UserHandler:
    @staticmethod
    def ToJSON( _user ):
        return( serializers.serialize( "json", [ _user ] ) )

    @staticmethod
    def LoginValidate( _credentials ):
        user = User.objects.get( username = _credentials[ 'username' ] )
        if user.password == _credentials[ 'password' ]:
            return UserHandler.ToJSON( user )
        else:
            raise Exception( "Invalid credentials!" )

    @staticmethod
    def Register( _dictionary ):
        user = User()
        for key in _dictionary.keys():
            user.__setattr__(key, _dictionary[key])
        try:
            userExisting = User.objects.get( username = user.username )
        except User.DoesNotExist:
            userExisting = None

        if userExisting is not None:
            raise Exception( "Username already exists." )
        else:
            user.UserType = User.UserType.CLIENT
            user.save()


#-----------------------------------------------------------
#                      RESERVATIONS HANDLER
#-----------------------------------------------------------
class ReservationHandler:
    @staticmethod
    def LoadJSON( _dictionary ):
        reservation = Reservation()
        reservation.destination = Destination()
        reservation.person = User()
        for key in _dictionary.keys():
            if key == "destination_id":
                reservation.destination.pk = _dictionary[ key ]
            elif key == "client_id":
                reservation.person.pk = _dictionary[ key ]
            else:
                reservation.__setattr__( key, _dictionary[ key ] )
        return reservation

    @staticmethod
    def Save( _reservation ):
        _reservation.save()

    @staticmethod
    def OverlapExists( _date_start, _date_end, _location_id ):
        reservationsAll = Reservation.objects.all().filter( pk = _location_id )
        for reservation in reservationsAll:
            if  ( _date_start <= reservation.date_end < _date_end   ) or \
                ( _date_start <= reservation.date_start < _date_end ) or \
                ( reservation.date_start < _date_start and reservation.date_end > _date_end ):
                return True
        return False

    @staticmethod
    def GetByLocation( _location_id ):
        return Reservation.objects.filter( destination__pk = _location_id )

    @staticmethod
    def ToJSONArray( _reservations ):
        res_dict = eval( serializers.serialize( "json",  _reservations  ) )
        for res_json, res_model in zip( res_dict, _reservations ):
            res_json[ "fields" ][ "person" ] = res_model.person.name
        return json.dumps( res_dict )

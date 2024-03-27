from .models import Destination, User
from django.core import serializers

#-----------------------------------------------------------
#                 DESTINATIONS HANDLER
#-----------------------------------------------------------
class DestinationHandler:

    # Class methods

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



#-----------------------------------------------------------
#                      USERS HANDLER
#-----------------------------------------------------------
class UserHandler:
    # Class methods
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



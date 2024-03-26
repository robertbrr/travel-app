from .models import Destination, User
from django.core import serializers

#-----------------------------------------------------------
#                 DESTINATIONS HANDLER
#-----------------------------------------------------------
class DestinationHandler:

    # Class methods
    @staticmethod
    def LoadJSON( dictionary ):
        destination = Destination()
        for key in dictionary.keys():
            destination.__setattr__( key, dictionary[ key ] )
        return( destination )

    @staticmethod
    def LoadExisting( id ):
        return( Destination.objects.get( pk = id ) )

    @staticmethod
    def ToJSON( destination ):
        return( serializers.serialize( "json", [ destination ] ) )

    @staticmethod
    def Save( destination ):
        destination.save()

    @staticmethod
    def DeleteById( _id ):
        Destination.objects.filter( id = _id ).delete()

    @staticmethod
    def AllToJSON():
        return( serializers.serialize("json", Destination.objects.all() ) )

    @staticmethod
    def GetByLocation( _location ):
        return Destination.objects.filter( location__icontains = _location )

    @staticmethod
    def ToJSONArray( _destinations ):
        return (serializers.serialize("json", _destinations ) )



#-----------------------------------------------------------
#                      USERS HANDLER
#-----------------------------------------------------------
class UserHandler:
    # Class methods
    @staticmethod
    def ToJSON( user ):
        return( serializers.serialize( "json", [ user ] ) )

    @staticmethod
    def LoginValidate( _credentials ):
        user = User.objects.get( username = _credentials[ 'username' ] )
        if user.password == _credentials[ 'password' ]:
            return UserHandler.ToJSON( user )
        else:
            raise Exception( "Invalid credentials!" )

    @staticmethod
    def Register( dictionary ):
        user = User()
        for key in dictionary.keys():
            user.__setattr__(key, dictionary[key])
        try:
            userExisting = User.objects.get( username = user.username )
        except User.DoesNotExist:
            userExisting = None

        if userExisting is not None:
            raise Exception( "Username already exists." )
        else:
            user.UserType = User.UserType.CLIENT
            user.save()



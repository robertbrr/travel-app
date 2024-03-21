from django.db import models

#-----------------------------------------------------------
#                 DESTINATIONS MODEL
#-----------------------------------------------------------
class Destination( models.Model ):
    name             = models.CharField( max_length= 100 )
    location         = models.CharField( max_length = 100 )
    price_nightly    = models.DecimalField( default = 0.0, decimal_places = 2, max_digits = 10 )
    percentage_offer = models.DecimalField( default = 0.0, decimal_places = 2, max_digits = 10 )
    spots_available  = models.IntegerField( default = 0.0 )

    def __str__(self):
        return self.name


#-----------------------------------------------------------
#                     USERS MODEL
#-----------------------------------------------------------
class User( models.Model ):

    class UserType( models.TextChoices ):
        AGENT  = "AG"
        CLIENT = "CL"

    name     = models.CharField( max_length = 100 )
    username = models.CharField( max_length = 100 )
    password = models.CharField( max_length = 100 )
    role     = models.CharField( max_length = 2, choices = UserType.choices, default = UserType.CLIENT  )


from django.http import HttpResponse
from .models import Destination

#-----------------------------------------------------------
#                   DESTINATIONS ENDPOINTS
#-----------------------------------------------------------
def get_all_destinations( _request ):
    return HttpResponse( Destination.objects.all() )

def crud_destination( _request ):
    if _request.method == "POST":
        Destination.save()

#-----------------------------------------------------------
#                      USER ENDPOINTS
#-----------------------------------------------------------

from django.urls import path
from . import views

urlpatterns = \
    [
    path( "destinations/all", views.get_all_destinations, name = "get_all_destinations" ),
    path( "destinations", views.crud_destination, name = "crud_destination" ),
    ]
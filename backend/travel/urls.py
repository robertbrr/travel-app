from django.urls import path
from . import views

urlpatterns = \
    [
    path( "destinations", views.crud_destination, name = "crud_destination" ),
    path( "login",        views.login,            name = "login"            ),
    path( "register",     views.register,         name = "register"         ),
    path( "reservations", views.crud_reservation, name = "register"         ),
    ]
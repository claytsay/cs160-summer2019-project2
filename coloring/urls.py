from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', views.colour_palette, name='colour_palette')
]
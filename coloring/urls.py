from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('paint_palette', views.paint_palette, name='paint_palette')
]
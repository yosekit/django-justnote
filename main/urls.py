from django.urls import path

from . import views

urlpatterns = [
    path("", views.index),
    path("editor/", views.editor),
    path("login/", views.login),
]